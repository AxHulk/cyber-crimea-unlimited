import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import ArenaMatchCard, { type ArenaMatch } from "./ArenaMatchCard";
import type { ArenaDiscipline } from "./ArenaDisciplineFilter";
import type { ArenaFormat } from "./ArenaFormatFilter";

const discDbMap: Record<ArenaDiscipline, string> = {
  cs2: "CS2",
  dota2: "Dota 2",
};

interface Props {
  discipline: ArenaDiscipline;
  format: ArenaFormat;
  statusFilter: "active" | "completed";
}

export default function ArenaMatchList({ discipline, format, statusFilter }: Props) {
  const dbDisc = discDbMap[discipline];

  const { data: matches, refetch } = useQuery({
    queryKey: ["arena-matches", dbDisc, format, statusFilter],
    queryFn: async () => {
      let q = supabase
        .from("arena_matches")
        .select(`
          id, discipline, format, status, score, map, stream_url,
          scheduled_at, started_at, finished_at,
          team1:team1_id(id, name, tag, logo_url),
          team2:team2_id(id, name, tag, logo_url),
          player1:player1_id(id, nickname),
          player2:player2_id(id, nickname)
        `)
        .eq("discipline", dbDisc)
        .order("created_at", { ascending: false });

      if (format !== "all") {
        q = q.eq("format", format);
      }

      if (statusFilter === "active") {
        q = q.in("status", ["waiting", "ready", "live"]);
      } else {
        q = q.in("status", ["completed", "cancelled"]);
      }

      const { data, error } = await q.limit(20);
      if (error) throw error;
      return (data ?? []) as unknown as ArenaMatch[];
    },
  });

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("arena-matches-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "arena_matches" }, () => {
        refetch();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [refetch]);

  if (!matches || matches.length === 0) {
    return (
      <div className="border border-border p-10 bg-muted/10 text-center">
        <div className="font-mono text-sm text-muted-foreground">
          {statusFilter === "active" ? "НЕТ АКТИВНЫХ МАТЧЕЙ" : "НЕТ ЗАВЕРШЁННЫХ МАТЧЕЙ"}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground/60 mt-2">
          {statusFilter === "active" ? "Создайте новый матч или ожидайте вызов" : "История пока пуста"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((m) => (
        <ArenaMatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
