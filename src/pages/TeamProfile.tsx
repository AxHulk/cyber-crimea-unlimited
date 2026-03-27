import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Swords, Users, TrendingUp, TrendingDown } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function TeamProfile() {
  const { teamId } = useParams<{ teamId: string }>();

  const { data: team, isLoading: teamLoading } = useQuery({
    queryKey: ["team", teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("id", teamId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!teamId,
  });

  const { data: members } = useQuery({
    queryKey: ["team-members", teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*, players(*)")
        .eq("team_id", teamId!)
        .is("left_at", null);
      if (error) throw error;
      return data;
    },
    enabled: !!teamId,
  });

  const { data: recentMatches } = useQuery({
    queryKey: ["team-matches", teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("matches")
        .select("*, tournaments(name, discipline)")
        .or(`player1_id.in.(${(members || []).map(m => m.player_id).join(",")}),player2_id.in.(${(members || []).map(m => m.player_id).join(",")})`)
        .order("played_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: !!members && members.length > 0,
  });

  const totalGames = team ? team.wins + team.losses + team.draws : 0;
  const winrate = totalGames > 0 ? Math.round((team!.wins / totalGames) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="relative pt-28 pb-8 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/ratings" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" /> НАЗАД К РЕЙТИНГАМ
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        {teamLoading ? (
          <div className="text-center py-20">
            <div className="font-mono text-xs text-muted-foreground animate-pulse">ЗАГРУЗКА ДАННЫХ КОМАНДЫ...</div>
          </div>
        ) : !team ? (
          <div className="text-center py-20">
            <div className="font-display text-2xl text-foreground mb-2">Команда не найдена</div>
            <div className="font-mono text-xs text-muted-foreground">Возможно, команда ещё не зарегистрирована в системе</div>
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-12 gap-4">

            {/* Team Header */}
            <motion.div variants={item} className="col-span-12 bento-card hud-corner p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 border border-border bg-muted/30 flex items-center justify-center flex-shrink-0">
                  {team.logo_url ? (
                    <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain" />
                  ) : (
                    <Users className="w-10 h-10 text-primary/50" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-[10px] px-2 py-0.5 border border-primary/30 bg-primary/10 text-primary">[{team.tag}]</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{team.discipline}</span>
                  </div>
                  <h1 className="font-display text-3xl md:text-5xl font-black text-foreground">{team.name}</h1>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-muted-foreground">РЕЙТИНГ</div>
                  <div className="font-display text-4xl font-black text-primary">{team.rating}</div>
                </div>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <Swords className="w-6 h-6 mx-auto text-neon-cyan mb-2" />
              <div className="font-display text-2xl font-black text-foreground">{totalGames}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">ВСЕГО ИГР</div>
            </motion.div>

            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto text-neon-green mb-2" />
              <div className="font-display text-2xl font-black text-foreground">{team.wins}/{team.draws}/{team.losses}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">В / Н / П</div>
            </motion.div>

            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <TrendingDown className="w-6 h-6 mx-auto text-neon-purple mb-2" />
              <div className="font-display text-2xl font-black text-neon-cyan">{winrate}%</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">ВИНРЕЙТ</div>
            </motion.div>

            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto text-neon-magenta mb-2" />
              <div className="font-display text-2xl font-black text-foreground">₽{Number(team.prize_total).toLocaleString("ru")}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">ПРИЗОВЫЕ</div>
            </motion.div>

            {/* Roster */}
            <motion.div variants={item} className="col-span-12 lg:col-span-5 bento-card hud-corner p-6">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// СОСТАВ</div>
              {!members || members.length === 0 ? (
                <div className="text-center py-8">
                  <div className="font-mono text-xs text-muted-foreground">Состав пока не сформирован</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {members.map((m: any) => (
                    <Link
                      key={m.id}
                      to={`/ratings/player/${m.player_id}`}
                      className="border border-border bg-muted/20 p-3 flex items-center gap-3 hover:border-primary/50 transition-colors group block"
                    >
                      <div className="w-10 h-10 border border-border bg-muted/30 flex items-center justify-center text-primary font-display text-sm font-bold">
                        {m.players?.nickname?.[0] || "?"}
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {m.players?.nickname || "Unknown"}
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {m.role === "captain" ? "КАПИТАН" : "ИГРОК"} • ELO {m.players?.elo || 1000}
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        KDA {Number(m.players?.kda || 1).toFixed(2)}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Recent Matches */}
            <motion.div variants={item} className="col-span-12 lg:col-span-7 bento-card hud-corner p-6">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// ПОСЛЕДНИЕ МАТЧИ</div>
              {!recentMatches || recentMatches.length === 0 ? (
                <div className="text-center py-8">
                  <div className="font-mono text-xs text-muted-foreground">Матчи пока не сыграны</div>
                </div>
              ) : (
                <div className="space-y-2 overflow-x-auto">
                  <table className="w-full min-w-[500px] border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        {["Турнир", "Противник", "Счёт", "Дата"].map((h) => (
                          <th key={h} className="text-left py-2 font-mono text-[10px] tracking-wider text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentMatches.map((match: any) => (
                        <tr key={match.id} className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                          <td className="py-2 font-mono text-xs text-foreground">{match.tournaments?.name || "—"}</td>
                          <td className="py-2 font-mono text-xs text-foreground">—</td>
                          <td className="py-2 font-mono text-xs text-neon-cyan">{match.score || "—"}</td>
                          <td className="py-2 font-mono text-[10px] text-muted-foreground">
                            {match.played_at ? new Date(match.played_at).toLocaleDateString("ru") : "TBD"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
