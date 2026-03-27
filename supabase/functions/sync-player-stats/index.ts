import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const OPENDOTA_API = "https://api.opendota.com/api";

async function fetchFaceitStats(nickname: string, apiKey: string) {
  try {
    const res = await fetch(
      `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(nickname)}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    if (!res.ok) {
      console.error(`Faceit API error for ${nickname}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    const cs2 = data.games?.cs2 || data.games?.csgo;
    if (!cs2) return null;

    // Fetch detailed stats
    const statsRes = await fetch(
      `https://open.faceit.com/data/v4/players/${data.player_id}/stats/cs2`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    let kd = 0;
    let winrate = 0;
    let matches = 0;
    if (statsRes.ok) {
      const statsData = await statsRes.json();
      const lifetime = statsData.lifetime;
      if (lifetime) {
        kd = parseFloat(lifetime["Average K/D Ratio"] || "0");
        winrate = parseFloat(lifetime["Win Rate %"] || "0");
        matches = parseInt(lifetime["Matches"] || "0", 10);
      }
    }

    return {
      elo: cs2.faceit_elo || 0,
      level: cs2.skill_level || 0,
      kda: kd,
      winrate,
      matches,
      raw: { player_id: data.player_id, nickname: data.nickname, country: data.country },
    };
  } catch (e) {
    console.error(`Faceit fetch error for ${nickname}:`, e);
    return null;
  }
}

async function fetchOpenDotaStats(steamId: string) {
  try {
    // Convert Steam ID to Steam32 if needed (Steam64 format)
    let steam32: number;
    if (steamId.length > 10) {
      steam32 = Number(BigInt(steamId) - BigInt("76561197960265728"));
    } else {
      steam32 = parseInt(steamId, 10);
    }

    const [profileRes, wlRes] = await Promise.all([
      fetch(`${OPENDOTA_API}/players/${steam32}`),
      fetch(`${OPENDOTA_API}/players/${steam32}/wl`),
    ]);

    if (!profileRes.ok) {
      console.error(`OpenDota API error for ${steamId}: ${profileRes.status}`);
      return null;
    }

    const profile = await profileRes.json();
    const wl = wlRes.ok ? await wlRes.json() : { win: 0, lose: 0 };

    const totalMatches = (wl.win || 0) + (wl.lose || 0);
    const winrate = totalMatches > 0 ? Math.round(((wl.win || 0) / totalMatches) * 100) : 0;

    // Fetch recent matches for KDA
    const recentRes = await fetch(`${OPENDOTA_API}/players/${steam32}/recentMatches`);
    let avgKda = 0;
    if (recentRes.ok) {
      const recent = await recentRes.json();
      if (recent.length > 0) {
        const totalKda = recent.reduce((sum: number, m: any) => {
          const deaths = Math.max(m.deaths || 1, 1);
          return sum + (m.kills + m.assists) / deaths;
        }, 0);
        avgKda = Math.round((totalKda / recent.length) * 100) / 100;
      }
    }

    return {
      elo: profile.mmr_estimate?.estimate || 0,
      level: 0,
      kda: avgKda,
      winrate,
      matches: totalMatches,
      raw: {
        personaname: profile.profile?.personaname,
        avatar: profile.profile?.avatarfull,
        rank_tier: profile.rank_tier,
      },
    };
  } catch (e) {
    console.error(`OpenDota fetch error for ${steamId}:`, e);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const faceitApiKey = Deno.env.get("FACEIT_API_KEY");

    if (!faceitApiKey) {
      throw new Error("FACEIT_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch all players with steam_id or faceit_nickname
    const { data: players, error } = await supabase
      .from("players")
      .select("id, discipline, steam_id, faceit_nickname, steam_verified, faceit_verified")
      .or("steam_id.neq.,faceit_nickname.neq.");

    if (error) throw error;
    if (!players || players.length === 0) {
      return new Response(JSON.stringify({ message: "No players to sync", synced: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let synced = 0;
    const errors: string[] = [];

    for (const player of players) {
      try {
        let stats: any = null;

        if (player.discipline === "CS2" && player.faceit_nickname) {
          stats = await fetchFaceitStats(player.faceit_nickname, faceitApiKey);
        } else if (player.discipline === "Dota 2" && player.steam_id) {
          stats = await fetchOpenDotaStats(player.steam_id);
        } else if (player.steam_id) {
          // Fallback: try OpenDota for any discipline with steam_id
          stats = await fetchOpenDotaStats(player.steam_id);
        }

        if (stats) {
          const { error: updateError } = await supabase
            .from("players")
            .update({
              external_elo: stats.elo,
              external_kda: stats.kda,
              external_winrate: stats.winrate,
              external_level: stats.level,
              external_matches: stats.matches,
              external_data: stats.raw,
              stats_synced_at: new Date().toISOString(),
            })
            .eq("id", player.id);

          if (updateError) {
            errors.push(`Update failed for ${player.id}: ${updateError.message}`);
          } else {
            synced++;
          }
        }

        // Rate limit: small delay between requests
        await new Promise((r) => setTimeout(r, 300));
      } catch (e) {
        errors.push(`Player ${player.id}: ${e instanceof Error ? e.message : "Unknown error"}`);
      }
    }

    return new Response(
      JSON.stringify({ message: "Sync complete", synced, total: players.length, errors }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Sync error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
