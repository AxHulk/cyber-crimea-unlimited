import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Crimea Cyber Cup 2026: Открыта регистрация на крупнейший LAN-финал в Симферополе",
    excerpt: "Призовой фонд 500,000₽. Дисциплины: CS2, Dota 2, Valorant. Регистрация до 28 марта.",
    date: "15 марта 2026",
    category: "ТУРНИРЫ",
    featured: true,
  },
  {
    id: 2,
    title: "CrimeaStorm выходит в финал регионального чемпионата по CS2",
    excerpt: "Команда одержала уверенную победу со счётом 2:0 над BlackSeaGG в полуфинале.",
    date: "14 марта 2026",
    category: "МАТЧИ",
    featured: false,
  },
  {
    id: 3,
    title: "Новая программа подготовки киберспортсменов стартует в апреле",
    excerpt: "ФКС РК запускает бесплатную образовательную программу для начинающих игроков.",
    date: "12 марта 2026",
    category: "РАЗВИТИЕ",
    featured: false,
  },
  {
    id: 4,
    title: "Итоги зимнего сезона: рейтинг обновлён",
    excerpt: "Обновлён региональный рейтинг команд по итогам зимнего сезона 2025/2026.",
    date: "10 марта 2026",
    category: "РЕЙТИНГИ",
    featured: false,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function NewsSection() {
  const featured = newsData.find(n => n.featured);
  const rest = newsData.filter(n => !n.featured);

  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="container mx-auto">
        {/* Section header */}
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

        {/* Asymmetric grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4"
        >
          {/* Featured large */}
          {featured && (
            <motion.article
              variants={itemVariants}
              className="col-span-12 md:col-span-7 bento-card group relative min-h-[300px] flex flex-col justify-end"
            >
              {/* Gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-primary/10 rounded-[var(--radius)]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[9px] tracking-wider px-2 py-1 bg-primary/20 text-primary border border-primary/30">
                    {featured.category}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featured.date}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-primary group-hover:gap-3 transition-all cursor-pointer">
                  ПОДРОБНЕЕ <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          )}

          {/* Side stack with offset */}
          <div className="col-span-12 md:col-span-5 space-y-4 md:-mt-4">
            {rest.map((news, i) => (
              <motion.article
                key={news.id}
                variants={itemVariants}
                className="bento-card group cursor-pointer"
                style={{ marginLeft: i === 1 ? '1rem' : '0' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[9px] tracking-wider px-2 py-0.5 bg-muted text-muted-foreground border border-border">
                    {news.category}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">{news.date}</span>
                </div>
                <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors leading-tight mb-1">
                  {news.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground line-clamp-2">
                  {news.excerpt}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Mobile link */}
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
