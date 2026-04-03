import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import ArenaDisciplineFilter, { type ArenaDiscipline } from "@/components/arena/ArenaDisciplineFilter";
import ArenaFormatFilter, { type ArenaFormat } from "@/components/arena/ArenaFormatFilter";
import ArenaMatchList from "@/components/arena/ArenaMatchList";
import ArenaLeaderboard from "@/components/arena/ArenaLeaderboard";
import ArenaStats from "@/components/arena/ArenaStats";

type MatchTab = "active" | "completed";

export default function Arena() {
  const [discipline, setDiscipline] = useState<ArenaDiscipline>("cs2");
  const [format, setFormat] = useState<ArenaFormat>("all");
  const [matchTab, setMatchTab] = useState<MatchTab>("active");

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-12 overflow-hidden scanline">
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
              Матчи, трансляции, рейтинги — всё в одном месте.
              Выбирай дисциплину, формат и вперёд.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </section>

      {/* Controls */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <ArenaDisciplineFilter selected={discipline} onChange={setDiscipline} />
          <ArenaFormatFilter selected={format} onChange={setFormat} />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-12 gap-5">
          {/* Matches — 8 col */}
          <div className="col-span-12 lg:col-span-8 space-y-5">
            {/* Tabs: Active / Completed */}
            <div className="flex gap-2 border-b border-border pb-3">
              {([
                { key: "active" as MatchTab, label: "АКТИВНЫЕ" },
                { key: "completed" as MatchTab, label: "ИСТОРИЯ" },
              ]).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMatchTab(tab.key)}
                  className={`px-4 py-2 font-mono text-xs tracking-widest transition-all border-b-2 -mb-[13px] ${
                    matchTab === tab.key
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <ArenaMatchList discipline={discipline} format={format} statusFilter={matchTab} />
          </div>

          {/* Sidebar — 4 col */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* Stats */}
            <div className="border border-border p-5 bg-muted/20 hud-corner">
              <div className="font-mono text-[10px] tracking-widest text-neon-cyan mb-4">// STATS</div>
              <ArenaStats />
            </div>

            {/* Leaderboard */}
            <ArenaLeaderboard discipline={discipline} />

            {/* CTA */}
            <div className="border border-border p-6 bg-muted/20 hud-corner text-center">
              <div className="font-display text-lg font-black text-foreground mb-2">СТАНЬ УЧАСТНИКОМ</div>
              <p className="font-mono text-[10px] text-muted-foreground mb-4">
                Зарегистрируйся и прими участие в матчах
              </p>
              <Link
                to="/auth"
                className="inline-block border-2 border-primary bg-primary/10 px-6 py-3 font-display text-sm tracking-wider text-primary hover:bg-primary/20 transition-colors"
              >
                РЕГИСТРАЦИЯ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
