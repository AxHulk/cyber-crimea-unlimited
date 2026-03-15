import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin, Users, Filter, Gamepad2 } from "lucide-react";
import { useState } from "react";

const tournamentsData = [
  {
    id: 1,
    title: "Crimea Cyber Cup 2026",
    discipline: "CS2",
    status: "registration",
    date: "29 марта 2026",
    location: "Симферополь, КиберАрена",
    teams: 32,
    prize: "500,000₽",
  },
  {
    id: 2,
    title: "Black Sea Dota League",
    discipline: "Dota 2",
    status: "active",
    date: "20–25 марта 2026",
    location: "Онлайн",
    teams: 16,
    prize: "200,000₽",
  },
  {
    id: 3,
    title: "Valorant Spring Open",
    discipline: "Valorant",
    status: "active",
    date: "15–22 марта 2026",
    location: "Онлайн",
    teams: 24,
    prize: "150,000₽",
  },
  {
    id: 4,
    title: "FIFA 26 Crimea Championship",
    discipline: "FIFA 26",
    status: "upcoming",
    date: "5 апреля 2026",
    location: "Ялта, eSports Lounge",
    teams: 64,
    prize: "100,000₽",
  },
  {
    id: 5,
    title: "LoL Regional Qualifier",
    discipline: "LoL",
    status: "completed",
    date: "1–8 марта 2026",
    location: "Онлайн",
    teams: 8,
    prize: "80,000₽",
  },
  {
    id: 6,
    title: "Mobile Legends Winter Cup",
    discipline: "Mobile Legends",
    status: "completed",
    date: "15–20 февраля 2026",
    location: "Севастополь",
    teams: 16,
    prize: "50,000₽",
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  registration: { label: "РЕГИСТРАЦИЯ", color: "text-neon-green" },
  active: { label: "ИДЁТ", color: "text-neon-cyan" },
  upcoming: { label: "СКОРО", color: "text-primary" },
  completed: { label: "ЗАВЕРШЁН", color: "text-muted-foreground" },
};

const disciplines = ["Все", "CS2", "Dota 2", "Valorant", "LoL", "FIFA 26", "Mobile Legends"];

const Tournaments = () => {
  const [filter, setFilter] = useState("Все");
  const filtered = filter === "Все" ? tournamentsData : tournamentsData.filter(t => t.discipline === filter);

  return (
    <div className="min-h-screen bg-background scanline">
      <HudNavbar />
      <main className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-2">// TOURNAMENTS_DB</div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-wide mb-4">ТУРНИРЫ</h1>
            <p className="font-body text-sm text-muted-foreground max-w-xl">
              Все киберспортивные турниры Республики Крым. Регистрируйтесь, следите за результатами и поднимайтесь в рейтинге.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {disciplines.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-wider border transition-all
                  ${filter === d
                    ? "border-primary text-primary bg-primary/10 neon-glow-purple"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tournament cards */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-12 gap-4"
          >
            {filtered.map((t, i) => {
              const status = statusLabels[t.status];
              return (
                <motion.div
                  key={t.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className={`bento-card hud-corner group cursor-pointer ${
                    i === 0 ? "col-span-12 md:col-span-8" : "col-span-12 sm:col-span-6 md:col-span-4"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-[9px] tracking-wider ${status.color}`}>
                      ● {status.label}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground">{t.discipline}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                    {t.title}
                  </h3>
                  <div className="space-y-1.5 font-mono text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> {t.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" /> {t.teams} команд
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[8px] text-muted-foreground">PRIZE_POOL</div>
                      <div className="font-display text-lg font-bold text-primary">{t.prize}</div>
                    </div>
                    {t.status === "registration" && (
                      <button className="px-4 py-2 font-mono text-[10px] tracking-wider bg-primary text-primary-foreground hover:bg-primary/80 transition-all tactile-shadow">
                        REGISTER →
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
