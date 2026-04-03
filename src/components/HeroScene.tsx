import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroScene() {
  return (
    <div className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt="Esports arena"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanline opacity-30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-4 opacity-70"
        >
          ▸ ФЕДЕРАЦИЯ КОМПЬЮТЕРНОГО СПОРТА РЕСПУБЛИКИ КРЫМ
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-center leading-tight"
        >
          <span className="bg-gradient-to-r from-neon-purple via-foreground to-neon-cyan bg-clip-text text-transparent">
            CYBER
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.2em] text-foreground/80">
            CRIMEA
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 font-mono text-xs text-muted-foreground tracking-wider text-center max-w-md"
        >
          Официальная платформа киберспорта Крыма — турниры, рейтинги, арена
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex gap-4"
        >
          <Link
            to="/tournaments"
            className="px-6 py-3 font-display text-xs tracking-wider bg-primary text-primary-foreground border border-primary hover:bg-primary/80 transition-all neon-glow-purple"
          >
            ТУРНИРЫ →
          </Link>
          <Link
            to="/arena"
            className="px-6 py-3 font-display text-xs tracking-wider border border-border text-foreground hover:border-primary hover:text-primary transition-all"
          >
            АРЕНА
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-float">
          <div className="font-mono text-[9px] text-muted-foreground tracking-widest">SCROLL</div>
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* HUD corners */}
      <div className="absolute top-24 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/30 pointer-events-none" />
      <div className="absolute top-24 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/30 pointer-events-none" />
    </div>
  );
}
