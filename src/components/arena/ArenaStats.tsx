import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StatItem {
  label: string;
  value: string;
}

export default function ArenaStats() {
  const { data: stats } = useQuery({
    queryKey: ["arena-stats"],
    queryFn: async () => {
      const [playersRes, teamsRes, matchesRes] = await Promise.all([
        supabase.from("players").select("id", { count: "exact", head: true }),
        supabase.from("teams").select("id", { count: "exact", head: true }),
        supabase.from("arena_matches").select("id", { count: "exact", head: true }),
      ]);

      return {
        players: playersRes.count ?? 0,
        teams: teamsRes.count ?? 0,
        matches: matchesRes.count ?? 0,
      };
    },
  });

  const items: StatItem[] = [
    { label: "ИГРОКОВ", value: String(stats?.players ?? 0) },
    { label: "КОМАНД", value: String(stats?.teams ?? 0) },
    { label: "МАТЧЕЙ", value: String(stats?.matches ?? 0) },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((s) => (
        <div key={s.label} className="border border-border p-4 bg-muted/20 text-center">
          <div className="font-display text-2xl font-black text-foreground">{s.value}</div>
          <div className="font-mono text-[9px] text-muted-foreground tracking-wider mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
