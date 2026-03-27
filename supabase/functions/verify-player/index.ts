import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const faceitApiKey = Deno.env.get("FACEIT_API_KEY");

    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claims.claims.sub;

    const { action } = await req.json();
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // === ACTION: GENERATE CODE ===
    // Generates a unique verification code for the player to place in their Steam/Faceit profile
    if (action === "generate_code") {
      const code = `CRYM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

      const { error } = await adminClient
        .from("players")
        .update({ verification_code: code })
        .eq("profile_id", userId);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          code,
          instructions: {
            steam: `Добавьте код "${code}" в описание профиля Steam, затем нажмите "Подтвердить Steam".`,
            faceit: `Добавьте код "${code}" в поле "About" вашего Faceit профиля, затем нажмите "Подтвердить Faceit".`,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // === ACTION: VERIFY STEAM ===
    if (action === "verify_steam") {
      const { data: player, error: pErr } = await adminClient
        .from("players")
        .select("steam_id, verification_code")
        .eq("profile_id", userId)
        .single();

      if (pErr || !player?.steam_id || !player?.verification_code) {
        return new Response(
          JSON.stringify({ error: "Steam ID или код верификации не найдены" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Convert to Steam32
      let steam32: number;
      if (player.steam_id.length > 10) {
        steam32 = Number(BigInt(player.steam_id) - BigInt("76561197960265728"));
      } else {
        steam32 = parseInt(player.steam_id, 10);
      }

      // Check Steam profile for verification code
      const res = await fetch(`https://api.opendota.com/api/players/${steam32}`);
      if (!res.ok) {
        return new Response(
          JSON.stringify({ error: "Не удалось получить данные Steam профиля" }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const profile = await res.json();
      const profileText = JSON.stringify(profile.profile || {}).toLowerCase();
      const codeFound = profileText.includes(player.verification_code.toLowerCase());

      if (!codeFound) {
        return new Response(
          JSON.stringify({
            verified: false,
            message: `Код "${player.verification_code}" не найден в вашем Steam профиле. Убедитесь, что он добавлен в описание.`,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      await adminClient
        .from("players")
        .update({ steam_verified: true })
        .eq("profile_id", userId);

      return new Response(
        JSON.stringify({ verified: true, message: "Steam аккаунт успешно подтверждён!" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // === ACTION: VERIFY FACEIT ===
    if (action === "verify_faceit") {
      if (!faceitApiKey) {
        throw new Error("FACEIT_API_KEY is not configured");
      }

      const { data: player, error: pErr } = await adminClient
        .from("players")
        .select("faceit_nickname, verification_code")
        .eq("profile_id", userId)
        .single();

      if (pErr || !player?.faceit_nickname || !player?.verification_code) {
        return new Response(
          JSON.stringify({ error: "Faceit nickname или код верификации не найдены" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const res = await fetch(
        `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(player.faceit_nickname)}`,
        { headers: { Authorization: `Bearer ${faceitApiKey}` } }
      );

      if (!res.ok) {
        return new Response(
          JSON.stringify({ error: "Не удалось получить данные Faceit профиля" }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const data = await res.json();
      const aboutText = (data.about || data.settings?.about || "").toLowerCase();
      const codeFound = aboutText.includes(player.verification_code.toLowerCase());

      if (!codeFound) {
        return new Response(
          JSON.stringify({
            verified: false,
            message: `Код "${player.verification_code}" не найден в вашем Faceit профиле. Добавьте его в раздел "About".`,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      await adminClient
        .from("players")
        .update({ faceit_verified: true })
        .eq("profile_id", userId);

      return new Response(
        JSON.stringify({ verified: true, message: "Faceit аккаунт успешно подтверждён!" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // === ACTION: ADMIN VERIFY ===
    // Admin manually confirms a player for tournament participation
    if (action === "admin_verify") {
      const { player_id } = await req.json().catch(() => ({}));

      // TODO: Check admin role via user_roles table when implemented
      // For now, just update the flag
      if (!player_id) {
        return new Response(
          JSON.stringify({ error: "player_id is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      await adminClient
        .from("players")
        .update({ admin_verified: true })
        .eq("id", player_id);

      return new Response(
        JSON.stringify({ message: "Игрок подтверждён администратором" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action. Use: generate_code, verify_steam, verify_faceit, admin_verify" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Verification error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
