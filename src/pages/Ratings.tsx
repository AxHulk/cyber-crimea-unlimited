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
type Disc = "all" | "cs2" | "dota2";

const ladderData = {
  teams: [
    { pos: 1, name: "Crimea Wolves", game: "CS2", elo: 2548, wl: "34/9", winrate: "79%", prize: "₽780K", delta: 5 },
    { pos: 2, name: "Sevastopol Prime", game: "Dota 2", elo: 2480, wl: "31/11", winrate: "74%", prize: "₽620K", delta: 2 },
    { pos: 3, name: "Kerch Squad", game: "CS2", elo: 2412, wl: "29/13", winrate: "69%", prize: "₽540K", delta: -1 },
    { pos: 4, name: "Tavrida Five", game: "Dota 2", elo: 2336, wl: "26/15", winrate: "63%", prize: "₽390K", delta: 3 },
    { pos: 5, name: "Yalta Nexus", game: "CS2", elo: 2289, wl: "25/16", winrate: "61%", prize: "₽330K", delta: -2 },
  ],
  players: [
    { pos: 1, name: "NEXA", game: "CS2", elo: 2618, wl: "52/18", winrate: "74%", prize: "₽420K", delta: 5 },
    { pos: 2, name: "RIFT", game: "Dota 2", elo: 2582, wl: "49/20", winrate: "71%", prize: "₽360K", delta: 3 },
    { pos: 3, name: "VIXEN", game: "CS2", elo: 2527, wl: "46/19", winrate: "70%", prize: "₽340K", delta: -1 },
    { pos: 4, name: "CR0WN", game: "Dota 2", elo: 2451, wl: "43/21", winrate: "67%", prize: "₽290K", delta: 2 },
    { pos: 5, name: "ORBIT", game: "CS2", elo: 2397, wl: "39/24", winrate: "62%", prize: "₽250K", delta: -2 },
  ],
};

const discIcons = {
  all: statElo,
  cs2: discCs2,
  dota2: discDota2,
};

const medals = [medalGold, medalSilver, medalBronze];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Ratings() {
  const [mode, setMode] = useState<Mode>("teams");
  const [discipline, setDiscipline] = useState<Disc>("all");

  const rows = useMemo(() => {
    const data = ladderData[mode];
    if (discipline === "all") return data;
    const filterMap: Record<Exclude<Disc, "all">, string> = { cs2: "CS2", dota2: "Dota 2" };
    return data.filter((r) => r.game === filterMap[discipline]);
  }, [mode, discipline]);

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
            Глобальный ладдер, иерархия тиров и Зал Славы киберспорта Республики Крым.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-12 gap-4">
          <motion.div variants={item} className="col-span-12 bento-card hud-corner p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
              <div className="flex items-center gap-2 border border-border bg-muted/20 p-1">
                <button onClick={() => setMode("teams")} className={`px-4 py-2 font-mono text-[10px] tracking-wider transition-colors ${mode === "teams" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>КОМАНДЫ</button>
                <button onClick={() => setMode("players")} className={`px-4 py-2 font-mono text-[10px] tracking-wider transition-colors ${mode === "players" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>ИГРОКИ</button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(["all", "cs2", "dota2"] as Disc[]).map((d) => (
                  <button key={d} onClick={() => setDiscipline(d)} className={`border px-3 py-2 flex items-center gap-2 transition-colors ${discipline === d ? "border-primary bg-primary/10" : "border-border bg-muted/20 hover:border-primary/50"}`}>
                    <img src={discIcons[d]} alt={d} className="w-5 h-5 object-contain" loading="lazy" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground">{d}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-4 bento-card hud-corner p-6">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// TOP_3</div>
            <div className="space-y-3">
              {podium.map((p, i) => (
                <div key={p.name} className="border border-border bg-muted/20 p-3 flex items-center gap-3 hover-scale">
                  <img src={medals[i]} alt={`Медаль ${i + 1} места`} className="w-10 h-10 object-contain" loading="lazy" />
                  <div className="flex-1">
                    <div className="font-display text-sm font-bold text-foreground">{p.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{p.game} • ELO {p.elo}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-8 bento-card hud-corner p-6 overflow-x-auto">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// GLOBAL_LADDER</div>
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {["#", "Имя", "Рейтинг (ELO)", "В/П", "Winrate", "Призовые"].map((h) => (
                    <th key={h} className="text-left py-2 font-mono text-[10px] tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                    <td className="py-3 font-display text-sm text-foreground">{String(r.pos).padStart(2, "0")}</td>
                    <td className="py-3">
                      <div className="font-display text-sm font-bold text-foreground">{r.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{r.game}</div>
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
                { icon: statElo, label: "СРЕДНИЙ ELO", value: "2316" },
                { icon: statKda, label: "TOP KDA", value: "2.41" },
                { icon: statWinrate, label: "WINRATE", value: "78%" },
                { icon: statPrize, label: "ПРИЗОВЫЕ", value: "₽2.4M" },
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
