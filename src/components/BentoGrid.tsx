import { motion } from "framer-motion";
import { Clock, Trophy, Users, Gamepad2, TrendingUp, Calendar, Swords, Target } from "lucide-react";
import { useEffect, useState } from "react";

// Countdown timer component
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
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BentoGrid() {
  const nextTournament = new Date();
  nextTournament.setDate(nextTournament.getDate() + 14);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="text-center">
            <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-2">// DASHBOARD</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide">COMMAND_CENTER</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-12 gap-3 md:gap-4"
        >
          {/* Large card: Next Tournament */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 row-span-2 bento-card hud-corner group"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-neon-green" />
              <span className="font-mono text-[10px] tracking-wider text-neon-green">NEXT_EVENT</span>
              <span className="ml-auto font-mono text-[9px] text-muted-foreground animate-pulse">● LIVE</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              Crimea Cyber Cup 2026
            </h3>
            <p className="font-mono text-xs text-muted-foreground mb-1">
              LAN-ФИНАЛ // СИМФЕРОПОЛЬ
            </p>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">
                {nextTournament.toLocaleDateString('ru-RU')}
              </span>
            </div>
            <Countdown targetDate={nextTournament} />
            <div className="mt-6 grid grid-cols-3 gap-2">
              {["CS2", "Dota 2", "Valorant"].map((game) => (
                <div key={game} className="text-center py-2 border border-border bg-muted/30 font-mono text-[10px] tracking-wider text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-default">
                  {game}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Medium: Bracket preview */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 sm:col-span-6 md:col-span-3 row-span-2 bento-card group"
          >
            <div className="flex items-center gap-2 mb-4">
              <Swords className="w-4 h-4 text-neon-purple" />
              <span className="font-mono text-[10px] tracking-wider text-neon-purple">BRACKET</span>
            </div>
            <div className="space-y-2">
              {[
                { t1: "CrimeaStorm", t2: "BlackSeaGG", s1: 2, s2: 1, live: true },
                { t1: "YaltaRise", t2: "SevaStar", s1: 0, s2: 0, live: false },
                { t1: "KerchForce", t2: "SimfPower", s1: 1, s2: 2, live: false },
              ].map((match, i) => (
                <div key={i} className={`p-2 border transition-all ${match.live ? 'border-neon-green/30 bg-neon-green/5' : 'border-border'}`}>
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <span className={match.s1 > match.s2 ? 'text-foreground' : 'text-muted-foreground'}>{match.t1}</span>
                    <span className="text-primary font-bold">{match.s1}</span>
                  </div>
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <span className={match.s2 > match.s1 ? 'text-foreground' : 'text-muted-foreground'}>{match.t2}</span>
                    <span className="text-primary font-bold">{match.s2}</span>
                  </div>
                  {match.live && (
                    <div className="mt-1 font-mono text-[8px] text-neon-green tracking-wider">● LIVE NOW</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Small: Player stats */}
          <motion.div
            variants={itemVariants}
            className="col-span-6 md:col-span-3 bento-card group"
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-[10px] tracking-wider text-neon-cyan">PLAYERS</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground group-hover:text-neon-cyan transition-colors">
              1,247
            </div>
            <div className="font-mono text-[9px] text-muted-foreground mt-1">REGISTERED_ATHLETES</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-neon-green" />
              <span className="font-mono text-[10px] text-neon-green">+12.4%</span>
            </div>
          </motion.div>

          {/* Small: Active tournaments */}
          <motion.div
            variants={itemVariants}
            className="col-span-6 md:col-span-3 bento-card group"
          >
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-4 h-4 text-neon-magenta" />
              <span className="font-mono text-[10px] tracking-wider text-neon-magenta">ACTIVE</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground group-hover:text-neon-magenta transition-colors">
              8
            </div>
            <div className="font-mono text-[9px] text-muted-foreground mt-1">RUNNING_TOURNAMENTS</div>
            <div className="mt-2 flex gap-1">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="w-2 h-2 bg-neon-magenta/60 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </motion.div>

          {/* Wide: Regional ranking */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 bento-card group"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-primary" />
              <span className="font-mono text-[10px] tracking-wider text-primary">REGIONAL_RANKING</span>
            </div>
            <div className="space-y-2">
              {[
                { rank: 1, name: "CrimeaStorm", points: 2840, change: "+3" },
                { rank: 2, name: "BlackSeaGG", points: 2650, change: "+1" },
                { rank: 3, name: "YaltaRise", points: 2410, change: "-1" },
                { rank: 4, name: "SevaStar", points: 2280, change: "0" },
                { rank: 5, name: "KerchForce", points: 2100, change: "+2" },
              ].map((team) => (
                <div key={team.rank} className="flex items-center gap-3 py-1.5 px-2 hover:bg-muted/30 transition-colors border border-transparent hover:border-border">
                  <span className={`font-display text-sm font-bold w-6 text-center ${team.rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                    {String(team.rank).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs flex-1 text-foreground">{team.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{team.points} PTS</span>
                  <span className={`font-mono text-[10px] ${team.change.startsWith('+') ? 'text-neon-green' : team.change === '0' ? 'text-muted-foreground' : 'text-destructive'}`}>
                    {team.change !== '0' ? team.change : '—'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Disciplines grid */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 bento-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-4 h-4 text-neon-green" />
              <span className="font-mono text-[10px] tracking-wider text-neon-green">DISCIPLINES</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: "CS2", players: 342 },
                { name: "Dota 2", players: 287 },
                { name: "Valorant", players: 198 },
                { name: "LoL", players: 156 },
                { name: "Mobile Legends", players: 134 },
                { name: "FIFA 26", players: 130 },
              ].map((d) => (
                <div key={d.name} className="p-3 border border-border hover:border-neon-green/50 transition-all text-center group/d cursor-default">
                  <div className="font-display text-sm font-bold group-hover/d:text-neon-green transition-colors">{d.name}</div>
                  <div className="font-mono text-[9px] text-muted-foreground mt-1">{d.players} PLAYERS</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
