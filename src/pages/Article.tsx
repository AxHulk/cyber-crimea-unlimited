import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { feed } from "@/data/mediaFeed";

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const article = feed.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <HudNavbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-black text-foreground mb-4">Материал не найден</h1>
          <Link to="/media-hub" className="font-mono text-xs text-primary hover:underline">← Вернуться в Медиа-хаб</Link>
        </div>
        <Footer />
      </div>
    );
  }

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

          <div className="flex items-center gap-3 mb-4">
            <span className={`font-mono text-[10px] tracking-widest px-2 py-1 border border-primary/30 bg-primary/10 ${article.accent}`}>
              {article.type.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {article.date || article.stat}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-black text-foreground leading-tight max-w-4xl"
          >
            {article.title}
          </motion.h1>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-12 gap-6"
        >
          {/* Main content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bento-card hud-corner p-6 md:p-8">
              <p className="font-body text-sm md:text-base text-foreground/90 leading-relaxed">
                {article.excerpt}
              </p>

              {article.details && (
                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="font-mono text-[10px] tracking-widest text-primary mb-3">// РЕЗУЛЬТАТЫ</div>
                  {article.details.map((d, i) => (
                    <div key={i} className="font-mono text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-primary/30">
                      {d}
                    </div>
                  ))}
                </div>
              )}

              {article.videoUrl && (
                <div className="mt-6 border-t border-border pt-6">
                  <div className="font-mono text-[10px] tracking-widest text-primary mb-3">// ВИДЕО</div>
                  <a
                    href={article.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-5 py-3 font-mono text-xs tracking-wider text-primary hover:bg-primary/15 transition-colors"
                  >
                    ▶ СМОТРЕТЬ ВИДЕО
                  </a>
                </div>
              )}

              {article.externalLink && (
                <div className="mt-6 border-t border-border pt-6">
                  <a
                    href={article.externalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-primary bg-primary/10 px-5 py-3 font-mono text-xs tracking-wider text-primary hover:bg-primary/20 transition-colors"
                  >
                    {article.externalLink.label}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div className="bento-card hud-corner p-5">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3">// ДРУГИЕ МАТЕРИАЛЫ</div>
              <div className="space-y-3">
                {feed
                  .filter((item) => item.id !== article.id)
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/media-hub/${item.id}`}
                      className="block border border-border bg-muted/20 p-3 hover:border-primary/50 transition-colors"
                    >
                      <div className={`font-mono text-[9px] tracking-widest mb-1 ${item.accent}`}>
                        {item.type.toUpperCase()}
                      </div>
                      <div className="font-display text-sm font-bold text-foreground leading-tight">
                        {item.title}
                      </div>
                      <div className="font-mono text-[9px] text-muted-foreground mt-1">
                        {item.date || item.stat}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
