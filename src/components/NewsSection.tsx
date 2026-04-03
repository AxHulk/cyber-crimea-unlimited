import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { feed } from "@/data/mediaFeed";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function NewsSection() {
  // Use real data from mediaFeed, sorted by date
  const sortedFeed = [...feed].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date.split(" ").reverse().join("-")).getTime() - new Date(a.date.split(" ").reverse().join("-")).getTime();
  });

  const featured = sortedFeed[0];
  const rest = sortedFeed.slice(1, 4);

  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-2">// NEWS_FEED</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide">ПОСЛЕДНИЕ НОВОСТИ</h2>
          </div>
          <Link
            to="/news"
            className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ВСЕ НОВОСТИ <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4"
        >
          {featured && (
            <motion.article
              variants={itemVariants}
              className="col-span-12 md:col-span-7 bento-card group relative min-h-[300px] flex flex-col justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-primary/10 rounded-[var(--radius)]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[9px] tracking-wider px-2 py-1 bg-primary/20 text-primary border border-primary/30">
                    {featured.type}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featured.date ?? featured.stat}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                  {featured.excerpt}
                </p>
                <Link
                  to={`/news/${featured.id}`}
                  className="inline-flex items-center gap-2 font-mono text-xs text-primary group-hover:gap-3 transition-all"
                >
                  ПОДРОБНЕЕ <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.article>
          )}

          <div className="col-span-12 md:col-span-5 space-y-4 md:-mt-4">
            {rest.map((news) => (
              <motion.article
                key={news.id}
                variants={itemVariants}
                className="bento-card group"
              >
                <Link to={`/news/${news.id}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[9px] tracking-wider px-2 py-0.5 bg-muted text-muted-foreground border border-border">
                      {news.type}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground">{news.date ?? news.stat}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors leading-tight mb-1">
                    {news.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground line-clamp-2">
                    {news.excerpt}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/30 px-4 py-2 hover:bg-primary/10 transition-all"
          >
            ВСЕ НОВОСТИ <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
