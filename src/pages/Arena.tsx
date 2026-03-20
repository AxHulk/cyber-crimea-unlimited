import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";

import iconCs2 from "@/assets/arena/icon_cs2.png";
import iconDota2 from "@/assets/arena/icon_dota2.png";
import iconValorant from "@/assets/arena/icon_valorant.png";
import iconFifa from "@/assets/arena/icon_fifa.png";
import iconLive from "@/assets/arena/icon_live.png";
import iconBracket from "@/assets/arena/icon_bracket.png";
import iconStats from "@/assets/arena/icon_stats.png";
import iconPrediction from "@/assets/arena/icon_prediction.png";
import iconMap from "@/assets/arena/icon_map.png";
import iconHalloffame from "@/assets/arena/icon_halloffame.png";
import iconRegister from "@/assets/arena/icon_register.png";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const disciplines = [
  { name: "CS2", icon: iconCs2, players: "4,218", color: "neon-green" },
  { name: "Dota 2", icon: iconDota2, players: "3,651", color: "neon-cyan" },
  { name: "Valorant", icon: iconValorant, players: "2,890", color: "neon-magenta" },
  { name: "FIFA", icon: iconFifa, players: "1,643", color: "neon-purple" },
];

const liveMatches = [
  { game: "CS2", teams: "Crimea Wolves vs Storm", viewers: "1.2K" },
  { game: "Dota 2", teams: "Sevastopol GG vs Yalta", viewers: "840" },
];

const stats = [
  { label: "ИГРОКОВ", value: "12,402" },
  { label: "ТУРНИРОВ", value: "86" },
  { label: "МАТЧЕЙ", value: "4,217" },
  { label: "ПРИЗОВЫЕ ₽", value: "2.4M" },
];

const predictions = [
  { match: "Crimea Wolves vs Storm", game: "CS2", odds: ["1.8", "2.1"] },
  { match: "Sevastopol GG vs Yalta", game: "Dota 2", odds: ["1.5", "2.6"] },
];

const venues = [
  { city: "Симферополь", name: "CyberHub Crimea", status: "ACTIVE" },
  { city: "Севастополь", name: "GG Arena", status: "ACTIVE" },
  { city: "Ялта", name: "Pixel Zone", status: "PLANNED" },
];

const hallOfFame = [
  { name: "Phantom", game: "CS2", rank: "#1", wins: 47 },
  { name: "NexuS", game: "Dota 2", rank: "#2", wins: 39 },
  { name: "BladeX", game: "Valorant", rank: "#3", wins: 34 },
  { name: "Cr1mson", game: "FIFA", rank: "#4", wins: 28 },
];

export default function Arena() {
  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-[10px] tracking-[0.4em] text-primary mb-3">
              // MODULE_LOADED
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground mb-4">
              ARENA <span className="text-primary">//</span> CYBER_CRIMEA
            </h1>
            <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto">
              Центральный хаб киберспортивной активности ФКС Республики Крым.
              Дисциплины, турниры, live-трансляции, статистика.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </section>

      {/* Main Bento Grid */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          className="grid grid-cols-12 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* === ROW 1 === */}

          {/* Дисциплины — 6 col */}
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-6 bento-card hud-corner p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="font-mono text-[10px] tracking-widest text-primary">// DISCIPLINES</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {disciplines.map((d) => (
                <motion.div
                  key={d.name}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="relative border border-border bg-muted/30 p-4 flex flex-col items-center gap-3 group cursor-pointer transition-colors hover:border-primary/50"
                >
                  <img src={d.icon} alt={d.name} className="w-12 h-12 object-contain drop-shadow-lg" />
                  <div className="font-display font-bold text-sm tracking-wider text-foreground">{d.name}</div>
                  <div className={`font-mono text-[10px] text-${d.color}`}>
                    {d.players} PLAYERS
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* LIVE — 3 col */}
          <motion.div variants={fadeUp} className="col-span-12 sm:col-span-6 lg:col-span-3 bento-card hud-corner p-6">
            <div className="flex items-center gap-2 mb-5">
              <img src={iconLive} alt="Live" className="w-6 h-6" />
              <div className="font-mono text-[10px] tracking-widest text-neon-green">// LIVE</div>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-[pulse_1.5s_ease-in-out_infinite]" />
                <span className="font-mono text-[9px] text-neon-green">ON AIR</span>
              </span>
            </div>
            <div className="space-y-3">
              {liveMatches.map((m, i) => (
                <div key={i} className="border border-border p-3 bg-muted/20 hover:border-neon-green/40 transition-colors">
                  <div className="font-mono text-[9px] text-neon-green mb-1">{m.game}</div>
                  <div className="font-display text-xs text-foreground">{m.teams}</div>
                  <div className="font-mono text-[9px] text-muted-foreground mt-1">👁 {m.viewers} viewers</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Турнирная сетка — 3 col */}
          <motion.div variants={fadeUp} className="col-span-12 sm:col-span-6 lg:col-span-3 bento-card hud-corner p-6">
            <div className="flex items-center gap-2 mb-5">
              <img src={iconBracket} alt="Bracket" className="w-6 h-6" />
              <div className="font-mono text-[10px] tracking-widest text-primary">// BRACKET</div>
            </div>
            <div className="space-y-2">
              {/* Mini bracket visualization */}
              <div className="border border-border p-2 bg-muted/20">
                <div className="font-mono text-[9px] text-muted-foreground mb-2">CRIMEA CUP S3 — CS2</div>
                <div className="space-y-1">
                  {["Wolves ✓", "Storm", "GG ✓", "Pixel"].map((t, i) => (
                    <div
                      key={i}
                      className={`font-mono text-[10px] px-2 py-1 border-l-2 ${
                        t.includes("✓")
                          ? "border-primary text-foreground bg-primary/5"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-border p-2 bg-muted/20 text-center">
                <div className="font-mono text-[9px] text-primary">ФИНАЛ</div>
                <div className="font-display text-xs text-foreground mt-1">Wolves vs GG</div>
              </div>
            </div>
          </motion.div>

          {/* === ROW 2 === */}

          {/* Статистика — 4 col */}
          <motion.div variants={fadeUp} className="col-span-12 sm:col-span-6 lg:col-span-4 bento-card hud-corner p-6">
            <div className="flex items-center gap-2 mb-5">
              <img src={iconStats} alt="Stats" className="w-6 h-6" />
              <div className="font-mono text-[10px] tracking-widest text-neon-cyan">// STATS</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border border-border p-3 bg-muted/20 text-center">
                  <div className="font-display text-xl font-black text-foreground">{s.value}</div>
                  <div className="font-mono text-[9px] text-muted-foreground tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Прогнозы — 4 col */}
          <motion.div variants={fadeUp} className="col-span-12 sm:col-span-6 lg:col-span-4 bento-card hud-corner p-6">
            <div className="flex items-center gap-2 mb-5">
              <img src={iconPrediction} alt="Predictions" className="w-6 h-6" />
              <div className="font-mono text-[10px] tracking-widest text-neon-magenta">// PREDICTIONS</div>
            </div>
            <div className="space-y-3">
              {predictions.map((p, i) => (
                <div key={i} className="border border-border p-3 bg-muted/20">
                  <div className="font-mono text-[9px] text-neon-magenta mb-1">{p.game}</div>
                  <div className="font-display text-xs text-foreground mb-2">{p.match}</div>
                  <div className="flex gap-2">
                    {p.odds.map((o, j) => (
                      <button
                        key={j}
                        className="flex-1 border border-border py-1.5 font-mono text-xs text-foreground hover:border-primary hover:bg-primary/10 transition-all"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Карта площадок — 4 col */}
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 bento-card hud-corner p-6">
            <div className="flex items-center gap-2 mb-5">
              <img src={iconMap} alt="Map" className="w-6 h-6" />
              <div className="font-mono text-[10px] tracking-widest text-neon-cyan">// VENUES</div>
            </div>
            <div className="space-y-2">
              {venues.map((v) => (
                <div key={v.city} className="flex items-center justify-between border border-border p-3 bg-muted/20 hover:border-neon-cyan/40 transition-colors">
                  <div>
                    <div className="font-display text-xs text-foreground">{v.name}</div>
                    <div className="font-mono text-[9px] text-muted-foreground">{v.city}</div>
                  </div>
                  <span className={`font-mono text-[9px] ${v.status === "ACTIVE" ? "text-neon-green" : "text-muted-foreground"}`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* === ROW 3 === */}

          {/* Зал славы — 8 col */}
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-8 bento-card hud-corner p-6">
            <div className="flex items-center gap-2 mb-5">
              <img src={iconHalloffame} alt="Hall of Fame" className="w-6 h-6" />
              <div className="font-mono text-[10px] tracking-widest text-primary">// HALL_OF_FAME</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {hallOfFame.map((player) => (
                <motion.div
                  key={player.name}
                  whileHover={{ scale: 1.04 }}
                  className="border border-border p-4 bg-muted/20 text-center group hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mx-auto mb-3 flex items-center justify-center font-display text-lg font-bold text-primary">
                    {player.rank}
                  </div>
                  <div className="font-display text-sm font-bold text-foreground">{player.name}</div>
                  <div className="font-mono text-[9px] text-muted-foreground mt-1">{player.game}</div>
                  <div className="font-mono text-[10px] text-neon-green mt-2">{player.wins} WINS</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Регистрация — 4 col */}
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 bento-card hud-corner p-6 flex flex-col items-center justify-center text-center">
            <img src={iconRegister} alt="Register" className="w-16 h-16 mb-4" />
            <div className="font-display text-xl font-black text-foreground mb-2">СТАНЬ УЧАСТНИКОМ</div>
            <p className="font-mono text-[10px] text-muted-foreground mb-5 max-w-[200px]">
              Зарегистрируйся и прими участие в турнирах Крыма
            </p>
            <Link
              to="/auth"
              className="inline-block border-2 border-primary bg-primary/10 px-6 py-3 font-display text-sm tracking-wider text-primary hover:bg-primary/20 transition-colors neon-glow-purple"
            >
              РЕГИСТРАЦИЯ
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
