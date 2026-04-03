import { motion } from "framer-motion";
import { Trophy, Users, Gamepad2, TrendingUp, Target, Swords, Clock, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="font-display text-2xl md:text-3xl font-bold text-primary">{String(value).padStart(2, "0")}</div>
          <div className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">{label}</div>
        </div>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BentoGrid() {
  // Real stats from DB
  const { data: playerCount } = useQuery({
    queryKey: ["home-player-count"],
    queryFn: async () => {
      const { count } = await supabase.from("players").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: teamCount } = useQuery({
    queryKey: ["home-team-count"],
    queryFn: async () => {
      const { count } = await supabase.from("teams").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: topTeams } = useQuery({
    queryKey: ["home-top-teams"],
    queryFn: async () => {
      const { data } = await supabase
        .from("teams")
        .select("id, name, tag, logo_url, wins, losses, rating, discipline")
        .order("rating", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  const { data: liveMatches } = useQuery({
    queryKey: ["home-live-matches"],
    queryFn: async () => {
      const { data } = await supabase
        .from("arena_matches")
        .select(`id, discipline, format, status, score, map, stream_url,
          team1:team1_id(id, name, tag, logo_url),
          team2:team2_id(id, name, tag, logo_url)`)
        .in("status", ["live", "waiting", "ready"])
        .order("created_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });

  const { data: nextTournament } = useQuery({
    queryKey: ["home-next-tournament"],
    queryFn: async () => {
      const { data } = await supabase
        .from("tournaments")
        .select("*")
        .gte("start_at", new Date().toISOString())
        .order("start_at", { ascending: true })
        .limit(1);
      return data?.[0] ?? null;
    },
  });

  const tournamentDate = nextTournament?.start_at ? new Date(nextTournament.start_at) : null;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="text-center">
            <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-2">// DASHBOARD</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide">COMMAND_CENTER</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-12 gap-3 md:gap-4"
        >
          {/* Next Tournament or fallback */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 row-span-2 bento-card hud-corner group">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-neon-green" />
              <span className="font-mono text-[10px] tracking-wider text-neon-green">NEXT_EVENT</span>
            </div>
            {nextTournament ? (
              <>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {nextTournament.name}
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-primary/20 text-primary border border-primary/30">
                    {nextTournament.discipline}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{nextTournament.tier}</span>
                </div>
                {nextTournament.prize_pool > 0 && (
                  <p className="font-mono text-xs text-muted-foreground mb-1">
                    ПРИЗОВОЙ ФОНД: {Number(nextTournament.prize_pool).toLocaleString("ru-RU")} ₽
                  </p>
                )}
                {tournamentDate && (
                  <>
                    <div className="flex items-center gap-2 mb-6">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="font-mono text-xs text-muted-foreground">
                        {tournamentDate.toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                    <Countdown targetDate={tournamentDate} />
                  </>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="font-mono text-sm text-muted-foreground">ТУРНИРЫ СКОРО</div>
                <div className="font-mono text-[10px] text-muted-foreground/60 mt-2">Следите за обновлениями</div>
              </div>
            )}
          </motion.div>

          {/* Live/Active Matches */}
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 md:col-span-3 row-span-2 bento-card group">
            <div className="flex items-center gap-2 mb-4">
              <Swords className="w-4 h-4 text-neon-purple" />
              <span className="font-mono text-[10px] tracking-wider text-neon-purple">ARENA</span>
              {liveMatches && liveMatches.some((m: any) => m.status === "live") && (
                <span className="ml-auto font-mono text-[9px] text-neon-green animate-pulse">● LIVE</span>
              )}
            </div>
            {liveMatches && liveMatches.length > 0 ? (
              <div className="space-y-2">
                {liveMatches.map((match: any) => {
                  const t1 = match.team1 as any;
                  const t2 = match.team2 as any;
                  return (
                    <div key={match.id} className={`p-2 border transition-all ${match.status === "live" ? "border-neon-green/30 bg-neon-green/5" : "border-border"}`}>
                      <div className="flex justify-between items-center font-mono text-[10px]">
                        <span className="text-foreground">{t1?.tag ?? "TBD"}</span>
                        <span className="text-primary font-bold">{match.score?.split(":")?.[0] ?? "0"}</span>
                      </div>
                      <div className="flex justify-between items-center font-mono text-[10px]">
                        <span className="text-foreground">{t2?.tag ?? "TBD"}</span>
                        <span className="text-primary font-bold">{match.score?.split(":")?.[1] ?? "0"}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-[8px] text-muted-foreground">{match.discipline} · {match.format}</span>
                        {match.status === "live" && (
                          <span className="font-mono text-[8px] text-neon-green tracking-wider">● LIVE</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="font-mono text-xs text-muted-foreground">НЕТ АКТИВНЫХ МАТЧЕЙ</div>
              </div>
            )}
            <Link to="/arena" className="block mt-3 font-mono text-[10px] text-primary hover:text-primary/80 transition-colors text-center">
              ПЕРЕЙТИ В АРЕНУ →
            </Link>
          </motion.div>

          {/* Player count */}
          <motion.div variants={itemVariants} className="col-span-6 md:col-span-3 bento-card group">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-[10px] tracking-wider text-neon-cyan">PLAYERS</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground group-hover:text-neon-cyan transition-colors">
              {playerCount ?? 0}
            </div>
            <div className="font-mono text-[9px] text-muted-foreground mt-1">ЗАРЕГИСТРИРОВАННЫХ ИГРОКОВ</div>
          </motion.div>

          {/* Team count */}
          <motion.div variants={itemVariants} className="col-span-6 md:col-span-3 bento-card group">
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-4 h-4 text-neon-magenta" />
              <span className="font-mono text-[10px] tracking-wider text-neon-magenta">TEAMS</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground group-hover:text-neon-magenta transition-colors">
              {teamCount ?? 0}
            </div>
            <div className="font-mono text-[9px] text-muted-foreground mt-1">АКТИВНЫХ КОМАНД</div>
          </motion.div>

          {/* Top teams from DB */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 bento-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-mono text-[10px] tracking-wider text-primary">TOP_TEAMS</span>
              </div>
              <Link to="/ratings" className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors">
                ВСЕ →
              </Link>
            </div>
            <div className="space-y-2">
              {topTeams?.map((team, i) => {
                const total = team.wins + team.losses;
                const wr = total > 0 ? Math.round((team.wins / total) * 100) : 0;
                return (
                  <Link
                    key={team.id}
                    to={`/ratings/team/${team.id}`}
                    className="flex items-center gap-3 py-1.5 px-2 hover:bg-muted/30 transition-colors border border-transparent hover:border-border"
                  >
                    <span className={`font-display text-sm font-bold w-6 text-center ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {team.logo_url ? (
                      <img src={team.logo_url} alt={team.tag} className="w-6 h-6 rounded object-cover border border-border" />
                    ) : (
                      <div className="w-6 h-6 rounded border border-border bg-muted/40 flex items-center justify-center font-mono text-[8px] text-muted-foreground">
                        {team.tag.slice(0, 2)}
                      </div>
                    )}
                    <span className="font-mono text-xs flex-1 text-foreground">{team.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{team.discipline}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{wr}% WR</span>
                    <span className="font-mono text-xs text-primary font-bold">{team.rating}</span>
                  </Link>
                );
              })}
              {(!topTeams || topTeams.length === 0) && (
                <div className="font-mono text-xs text-muted-foreground text-center py-4">Нет данных</div>
              )}
            </div>
          </motion.div>

          {/* Disciplines */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 bento-card">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-4 h-4 text-neon-green" />
              <span className="font-mono text-[10px] tracking-wider text-neon-green">DISCIPLINES</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "CS2", href: "/ratings?tab=cs2", icon: "🎯" },
                { name: "Dota 2", href: "/ratings?tab=dota2", icon: "⚔️" },
              ].map((d) => (
                <Link
                  key={d.name}
                  to={d.href}
                  className="p-4 border border-border hover:border-neon-green/50 transition-all text-center group/d"
                >
                  <div className="text-2xl mb-2">{d.icon}</div>
                  <div className="font-display text-sm font-bold group-hover/d:text-neon-green transition-colors">{d.name}</div>
                  <div className="font-mono text-[9px] text-muted-foreground mt-1">РЕЙТИНГ →</div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
