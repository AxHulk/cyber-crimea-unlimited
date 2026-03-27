import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";

import arrowUp from "@/assets/ratings/arrow_up.png";
import arrowDown from "@/assets/ratings/arrow_down.png";
import discCs2 from "@/assets/ratings/disc_cs2.png";
import discDota2 from "@/assets/ratings/disc_dota2.png";
import medalGold from "@/assets/ratings/medal_gold.png";
import medalSilver from "@/assets/ratings/medal_silver.png";
import medalBronze from "@/assets/ratings/medal_bronze.png";
import statElo from "@/assets/ratings/stat_elo.png";
import statKda from "@/assets/ratings/stat_kda.png";
import statPrize from "@/assets/ratings/stat_prize.png";
import statWinrate from "@/assets/ratings/stat_winrate.png";
import tierS from "@/assets/ratings/tier_s.png";
import tierA from "@/assets/ratings/tier_a.png";
import tierB from "@/assets/ratings/tier_b.png";
import tierC from "@/assets/ratings/tier_c.png";
import trophyHallOfFame from "@/assets/ratings/trophy_hall_of_fame.png";

type Mode = "teams" | "players";
type Disc = "cs2" | "dota2";

const discMeta: Record<Disc, { label: string; dbValue: string; icon: string; ratingName: string }> = {
  cs2: { label: "CS2", dbValue: "CS2", icon: discCs2, ratingName: "ELO" },
  dota2: { label: "DOTA 2", dbValue: "Dota 2", icon: discDota2, ratingName: "MMR" },
};

const medals = [medalGold, medalSilver, medalBronze];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Ratings() {
  const [mode, setMode] = useState<Mode>("teams");
  const [discipline, setDiscipline] = useState<Disc>("cs2");

  const dbFilter = discMeta[discipline].dbValue;
  // Dota 2 teams use ELO on platform, Dota 2 players use MMR; CS2 always ELO
  const ratingLabel = discipline === "dota2" && mode === "players" ? "MMR" : "ELO";

  // Fetch teams filtered by discipline
  const { data: dbTeams } = useQuery({
    queryKey: ["ratings-teams", dbFilter],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("discipline", dbFilter)
        .order("rating", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  // Fetch players filtered by discipline, with their team membership for prizes
  const { data: dbPlayers } = useQuery({
    queryKey: ["ratings-players", dbFilter],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*, team_members(team_id, teams(prize_total, name))")
        .eq("discipline", dbFilter)
        .order("elo", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  const rows = useMemo(() => {
    if (mode === "teams" && dbTeams) {
      const sorted = [...dbTeams];
      if (discipline === "cs2") {
        sorted.sort((a, b) => {
          const wrA = a.wins + a.losses > 0 ? a.wins / (a.wins + a.losses) : 0;
          const wrB = b.wins + b.losses > 0 ? b.wins / (b.wins + b.losses) : 0;
          if (wrB !== wrA) return wrB - wrA;
          return b.rating - a.rating;
        });
      }
      return sorted.map((t, i) => ({
        pos: i + 1,
        id: t.id,
        name: t.name,
        game: t.discipline,
        elo: t.rating,
        wl: `${t.wins}/${t.losses}`,
        winrate: t.wins + t.losses > 0 ? `${Math.round((t.wins / (t.wins + t.losses)) * 100)}%` : "0%",
        prize: `₽${Number(t.prize_total).toLocaleString("ru")}`,
        delta: 0,
        linkTo: `/ratings/team/${t.id}`,
      }));
    }
    if (mode === "players" && dbPlayers) {
      const sorted = [...dbPlayers];
      if (discipline === "cs2") {
        sorted.sort((a, b) => {
          const wrA = a.wins + a.losses > 0 ? a.wins / (a.wins + a.losses) : 0;
          const wrB = b.wins + b.losses > 0 ? b.wins / (b.wins + b.losses) : 0;
          if (wrB !== wrA) return wrB - wrA;
          return b.elo - a.elo;
        });
      }
      return sorted.map((p: any, i) => {
        // Calculate player prize from team membership
        let playerPrize = 0;
        if (p.team_members && p.team_members.length > 0) {
          for (const tm of p.team_members) {
            if (tm.teams && tm.teams.prize_total > 0) {
              // Count members in same team to split evenly
              const teamPrize = Number(tm.teams.prize_total);
              // We'll estimate 5 members per team for equal split
              playerPrize += Math.round(teamPrize / 5);
            }
          }
        }
        return {
          pos: i + 1,
          id: p.id,
          name: p.nickname,
          game: p.discipline,
          elo: p.elo,
          wl: `${p.wins}/${p.losses}`,
          winrate: p.wins + p.losses > 0 ? `${Math.round((p.wins / (p.wins + p.losses)) * 100)}%` : "0%",
          prize: playerPrize > 0 ? `₽${playerPrize.toLocaleString("ru")}` : "—",
          delta: 0,
          linkTo: `/ratings/player/${p.id}`,
        };
      });
    }
    return [];
  }, [mode, discipline, dbTeams, dbPlayers]);

  const podium = rows.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="relative pt-28 pb-12 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.35em] text-primary mb-3">// LEADERBOARDS</p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-foreground">РЕЙТИНГИ</h1>
          <p className="font-mono text-xs md:text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            Раздельные ладдеры по дисциплинам. {discipline === "cs2" ? "CS2 — рейтинг ELO (Faceit)." : "Dota 2 — рейтинг MMR."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-12 gap-4">
          <motion.div variants={item} className="col-span-12 bento-card hud-corner p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
              {/* Discipline tabs */}
              <div className="flex items-center gap-2 border border-border bg-muted/20 p-1">
                {(["cs2", "dota2"] as Disc[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiscipline(d)}
                    className={`px-4 py-2 flex items-center gap-2 font-mono text-[10px] tracking-wider transition-colors ${discipline === d ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <img src={discMeta[d].icon} alt={discMeta[d].label} className="w-5 h-5 object-contain" />
                    <span>{discMeta[d].label}</span>
                  </button>
                ))}
              </div>

              {/* Mode tabs */}
              <div className="flex items-center gap-2 border border-border bg-muted/20 p-1">
                <button onClick={() => setMode("teams")} className={`px-4 py-2 font-mono text-[10px] tracking-wider transition-colors ${mode === "teams" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>КОМАНДЫ</button>
                <button onClick={() => setMode("players")} className={`px-4 py-2 font-mono text-[10px] tracking-wider transition-colors ${mode === "players" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>ИГРОКИ</button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-4 bento-card hud-corner p-6">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// TOP_3</div>
            <div className="space-y-3">
              {podium.length === 0 && (
                <div className="font-mono text-xs text-muted-foreground text-center py-6">Нет данных</div>
              )}
              {podium.map((p: any, i) => {
                const Wrapper = p.linkTo ? Link : "div";
                const wrapperProps = p.linkTo ? { to: p.linkTo } : {};
                return (
                  <Wrapper key={p.name} {...wrapperProps as any} className="border border-border bg-muted/20 p-3 flex items-center gap-3 hover-scale hover:border-primary/50 transition-colors block">
                    <img src={medals[i]} alt={`Медаль ${i + 1} места`} className="w-10 h-10 object-contain" loading="lazy" />
                    <div className="flex-1">
                      <div className="font-display text-sm font-bold text-foreground">{p.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{p.game} • {ratingLabel} {p.elo}</div>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-8 bento-card hud-corner p-6 overflow-x-auto">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// {discMeta[discipline].label}_LADDER</div>
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {["#", "Имя", `Рейтинг (${ratingLabel})`, "В/П", "Winrate", "Призовые"].map((h) => (
                    <th key={h} className="text-left py-2 font-mono text-[10px] tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center font-mono text-xs text-muted-foreground">Нет данных</td></tr>
                )}
                {rows.map((r: any) => (
                  <tr key={r.id || r.name} className="border-b border-border/70 hover:bg-muted/20 transition-colors cursor-pointer">
                    <td className="py-3 font-display text-sm text-foreground">{String(r.pos).padStart(2, "0")}</td>
                    <td className="py-3">
                      {r.linkTo ? (
                        <Link to={r.linkTo} className="hover:text-primary transition-colors">
                          <div className="font-display text-sm font-bold">{r.name}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">{r.game}</div>
                        </Link>
                      ) : (
                        <>
                          <div className="font-display text-sm font-bold text-foreground">{r.name}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">{r.game}</div>
                        </>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-foreground">{r.elo}</span>
                        <img src={r.delta >= 0 ? arrowUp : arrowDown} alt={r.delta >= 0 ? "Рост рейтинга" : "Падение рейтинга"} className="w-4 h-4 object-contain" loading="lazy" />
                        <span className={`font-mono text-[10px] ${r.delta >= 0 ? "text-neon-green" : "text-destructive"}`}>{r.delta >= 0 ? `+${r.delta}` : r.delta}</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs text-foreground">{r.wl}</td>
                    <td className="py-3 font-mono text-xs text-neon-cyan">{r.winrate}</td>
                    <td className="py-3 font-mono text-xs text-neon-purple">{r.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-6 bento-card hud-corner p-6">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// META_STATS</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: statElo, label: `СРЕДНИЙ ${ratingLabel}`, value: rows.length > 0 ? Math.round(rows.reduce((s, r: any) => s + r.elo, 0) / rows.length).toLocaleString("ru") : "—" },
                { icon: statKda, label: "TOP KDA", value: "—" },
                { icon: statWinrate, label: "WINRATE", value: rows.length > 0 ? (() => { const wr = rows.filter((r: any) => r.winrate !== "0%"); return wr.length > 0 ? wr[0].winrate : "—"; })() : "—" },
                { icon: statPrize, label: "ПРИЗОВЫЕ", value: "—" },
              ].map((s) => (
                <div key={s.label} className="border border-border bg-muted/20 p-3 text-center">
                  <img src={s.icon} alt={s.label} className="w-10 h-10 mx-auto object-contain" loading="lazy" />
                  <div className="font-display text-xl font-black text-foreground mt-2">{s.value}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-6 bento-card hud-corner p-6">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// TIER_SYSTEM</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: tierS, name: "S-TIER", k: "K=40" },
                { icon: tierA, name: "A-TIER", k: "K=30" },
                { icon: tierB, name: "B-TIER", k: "K=20" },
                { icon: tierC, name: "C-TIER", k: "K=10" },
              ].map((t) => (
                <div key={t.name} className="border border-border bg-muted/20 p-3 flex items-center gap-3 hover-scale">
                  <img src={t.icon} alt={t.name} className="w-12 h-12 object-contain" loading="lazy" />
                  <div>
                    <div className="font-display text-sm font-bold text-foreground">{t.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">Вес турнира {t.k}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 bento-card hud-corner p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <img src={trophyHallOfFame} alt="Кубок Зала Славы" className="w-16 h-16 object-contain" loading="lazy" />
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-primary">// HALL_OF_FAME</div>
                  <h2 className="font-display text-2xl font-black text-foreground">Чемпионы сезона 2026</h2>
                </div>
              </div>
              <Link to="/arena" className="border border-primary bg-primary/10 px-5 py-2 font-mono text-[11px] tracking-wider text-primary hover:bg-primary/20 transition-colors">
                К ПРОГНОЗАМ В АРЕНЕ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
