import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const allNews = [
  {
    id: 1,
    title: "Crimea Cyber Cup 2026: Открыта регистрация на крупнейший LAN-финал в Симферополе",
    excerpt: "Призовой фонд 500,000₽. Дисциплины: CS2, Dota 2, Valorant. Регистрация открыта до 28 марта 2026 года.",
    date: "15 марта 2026",
    category: "ТУРНИРЫ",
    featured: true,
  },
  {
    id: 2,
    title: "CrimeaStorm выходит в финал регионального чемпионата по CS2",
    excerpt: "Команда одержала уверенную победу со счётом 2:0 над BlackSeaGG в полуфинале и готовится к решающей серии.",
    date: "14 марта 2026",
    category: "МАТЧИ",
  },
  {
    id: 3,
    title: "Новая программа подготовки киберспортсменов стартует в апреле",
    excerpt: "ФКС РК запускает бесплатную образовательную программу для начинающих игроков от 14 до 25 лет.",
    date: "12 марта 2026",
    category: "РАЗВИТИЕ",
  },
  {
    id: 4,
    title: "Итоги зимнего сезона: региональный рейтинг обновлён",
    excerpt: "CrimeaStorm сохраняет лидерство. BlackSeaGG и YaltaRise борются за вторую строчку.",
    date: "10 марта 2026",
    category: "РЕЙТИНГИ",
  },
  {
    id: 5,
    title: "Партнёрство с крымскими вузами: киберспорт в образовании",
    excerpt: "ФКС РК подписала соглашения о сотрудничестве с тремя ведущими университетами полуострова.",
    date: "8 марта 2026",
    category: "РАЗВИТИЕ",
  },
  {
    id: 6,
    title: "Результаты Valorant Spring Open: четвертьфиналы определены",
    excerpt: "Восемь сильнейших команд Крыма продолжают борьбу за титул и призовой фонд 150,000₽.",
    date: "6 марта 2026",
    category: "МАТЧИ",
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-background scanline">
      <HudNavbar />
      <main className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-2">// NEWS_ARCHIVE</div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-wide mb-4">НОВОСТИ</h1>
            <p className="font-body text-sm text-muted-foreground max-w-xl">
              Актуальные события, результаты турниров и развитие киберспорта в Крыму.
            </p>
          </div>

          {/* Asymmetric news grid */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-12 gap-4"
          >
            {allNews.map((news, i) => {
              const isFeatured = i === 0;
              return (
                <motion.article
                  key={news.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  className={`bento-card group cursor-pointer ${
                    isFeatured
                      ? "col-span-12 md:col-span-8 min-h-[250px] flex flex-col justify-end relative"
                      : i === 1
                      ? "col-span-12 md:col-span-4 md:-mt-8"
                      : i % 3 === 0
                      ? "col-span-12 sm:col-span-7"
                      : "col-span-12 sm:col-span-5"
                  }`}
                  style={{ marginLeft: i === 3 ? '1.5rem' : undefined }}
                >
                  {isFeatured && (
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-primary/10 rounded-[var(--radius)]" />
                  )}
                  <div className={isFeatured ? "relative z-10" : ""}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`font-mono text-[9px] tracking-wider px-2 py-0.5 border ${
                        isFeatured
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground border-border"
                      }`}>
                        {news.category}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {news.date}
                      </span>
                    </div>
                    <h3 className={`font-display font-bold mb-2 group-hover:text-primary transition-colors leading-tight ${
                      isFeatured ? "text-xl md:text-2xl" : "text-sm"
                    }`}>
                      {news.title}
                    </h3>
                    <p className={`font-body text-muted-foreground ${isFeatured ? "text-sm" : "text-xs"} line-clamp-2`}>
                      {news.excerpt}
                    </p>
                    {isFeatured && (
                      <span className="inline-flex items-center gap-2 font-mono text-xs text-primary mt-4 group-hover:gap-3 transition-all">
                        ПОДРОБНЕЕ <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
