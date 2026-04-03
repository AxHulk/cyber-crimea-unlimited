import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import type { ArenaDiscipline } from "./ArenaDisciplineFilter";

const discDbMap: Record<ArenaDiscipline, string> = { cs2: "CS2", dota2: "Dota 2" };

export default function ArenaLeaderboard({ discipline }: { discipline: ArenaDiscipline }) {
  const dbDisc = discDbMap[discipline];

  const { data: teams } = useQuery({
    queryKey: ["arena-leaderboard", dbDisc],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("id, name, tag, logo_url, wins, losses, rating")
        .eq("discipline", dbDisc)
        .order("rating", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data ?? [];
    },
  });

  if (!teams || teams.length === 0) return null;

  return (
    <div className="border border-border p-5 bg-muted/20 hud-corner">
      <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// TOP_TEAMS</div>
      <div className="space-y-2">
        {teams.map((t, i) => {
          const total = t.wins + t.losses;
          const wr = total > 0 ? Math.round((t.wins / total) * 100) : 0;
          return (
            <Link
              key={t.id}
              to={`/ratings/team/${t.id}`}
              className="flex items-center gap-3 p-2.5 border border-border bg-muted/10 hover:border-primary/30 transition-colors"
            >
              <span className="font-mono text-[10px] text-muted-foreground w-5 text-center">{i + 1}</span>
              {t.logo_url ? (
                <img src={t.logo_url} alt={t.tag} className="w-7 h-7 rounded object-cover border border-border" />
              ) : (
                <div className="w-7 h-7 rounded border border-border bg-muted/40 flex items-center justify-center font-mono text-[9px] text-muted-foreground">
                  {t.tag.slice(0, 2)}
                </div>
              )}
              <div className="flex-1">
                <div className="font-display text-xs font-bold text-foreground">{t.name}</div>
                <div className="font-mono text-[9px] text-muted-foreground">{t.wins}W {t.losses}L · {wr}%</div>
              </div>
              <div className="font-mono text-xs text-primary font-bold">{t.rating}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
