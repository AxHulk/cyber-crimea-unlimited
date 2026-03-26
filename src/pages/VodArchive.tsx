import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { vodArchive } from "@/data/vodArchive";

const box = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

export default function VodArchive() {
  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="relative pt-28 pb-12 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/media-hub"
            className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" /> МЕДИА-ХАБ
          </Link>
          <p className="font-mono text-[10px] tracking-[0.35em] text-primary mb-3">// VOD_ARCHIVE</p>
          <h1 className="font-display text-4xl md:text-6xl font-black text-foreground">АРХИВ ТРАНСЛЯЦИЙ</h1>
          <p className="font-mono text-xs text-muted-foreground mt-3 max-w-2xl">
            Записи матчей и трансляций турниров Крыма.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          {vodArchive.map((vod) => (
            <motion.div key={vod.id} variants={box} className="bento-card hud-corner p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-primary mb-1">// VOD</div>
                  <h2 className="font-display text-lg md:text-xl font-black text-foreground">{vod.title}</h2>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{vod.date}</span>
              </div>
              <div className="relative w-full aspect-video border border-border bg-black/50">
                <iframe
                  src={vod.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  frameBorder="0"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
