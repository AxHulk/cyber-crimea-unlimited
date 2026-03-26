import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";

import catNews from "@/assets/mediahub/cat_news.png";
import catResults from "@/assets/mediahub/cat_results.png";
import catUpdates from "@/assets/mediahub/cat_updates.png";
import catInterview from "@/assets/mediahub/cat_interview.png";
import catGuides from "@/assets/mediahub/cat_guides.png";
import catGallery from "@/assets/mediahub/cat_gallery.png";

import interactComment from "@/assets/mediahub/interact_comment.png";
import interactKarma from "@/assets/mediahub/interact_karma.png";
import interactShare from "@/assets/mediahub/interact_share.png";
import interactSubscribe from "@/assets/mediahub/interact_subscribe.png";

import typeReport from "@/assets/mediahub/type_report.png";
import typeVod from "@/assets/mediahub/type_vod_original.png";

import badgeAnalyst from "@/assets/badges/badge_analyst.png";
import badgeCaptain from "@/assets/badges/badge_captain.png";
import badgeProphet from "@/assets/badges/badge_prophet.png";
import badgeVeteran from "@/assets/badges/badge_veteran.png";

import { feed, type CategoryKey } from "@/data/mediaFeed";

const categories: Array<{ key: CategoryKey; label: string; icon: string }> = [
  { key: "all", label: "ВСЁ", icon: catNews },
  { key: "news", label: "Новости ФКС", icon: catNews },
  { key: "results", label: "Итоги турниров", icon: catResults },
  { key: "updates", label: "Обновления игр", icon: catUpdates },
  { key: "interview", label: "Интервью", icon: catInterview },
  { key: "guides", label: "Гайды", icon: catGuides },
  { key: "gallery", label: "Галереи", icon: catGallery },
];

const badgeItems = [
  { title: "Аналитик", icon: badgeAnalyst, req: "Популярные тактические разборы" },
  { title: "Капитан", icon: badgeCaptain, req: "Верифицированный капитан команды" },
  { title: "Пророк", icon: badgeProphet, req: "Высокая точность прогнозов в Арене" },
  { title: "Ветеран", icon: badgeVeteran, req: "5+ лет активности в сообществе" },
];

const box = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

export default function MediaHub() {
  const [active, setActive] = useState<CategoryKey>("all");

  const filtered = useMemo(() => {
    if (active === "all") return feed;
    return feed.filter((item) => item.category === active);
  }, [active]);

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="relative pt-28 pb-12 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.35em] text-primary mb-3">// MEDIA_HUB</p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-foreground">МЕДИА-ХАБ</h1>
          <p className="font-mono text-xs md:text-sm text-muted-foreground mt-3 max-w-3xl mx-auto">
            Динамичная контент-лента ФКС РК: новости, итоги турниров, интервью, гайды, галереи и комьюнити-активности.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="bento-card hud-corner p-4 md:p-6 mb-4">
          <div className="font-mono text-[10px] tracking-widest text-primary mb-3">// CONTENT_FILTERS</div>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`border p-2 flex items-center gap-2 transition-colors ${active === c.key ? "border-primary bg-primary/10" : "border-border bg-muted/20 hover:border-primary/50"}`}
              >
                <img src={c.icon} alt={c.label} className="w-8 h-8 object-contain" loading="lazy" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-12 gap-4">
          {featured && (
            <Link to={`/media-hub/${featured.id}`} className="col-span-12 lg:col-span-8">
              <motion.article variants={box} className="bento-card hud-corner p-6 h-full group">
                <div className="flex items-center gap-3 mb-4">
                  <img src={typeReport} alt="Тип контента" className="w-12 h-12 object-contain" loading="lazy" />
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-primary">// FEATURED_MATERIAL</div>
                    <div className={`font-display text-lg md:text-2xl font-black ${featured.accent}`}>{featured.type}</div>
                  </div>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="font-mono text-xs text-muted-foreground max-w-3xl">{featured.excerpt}</p>

                {featured.details && (
                  <div className="mt-4 space-y-1.5">
                    {featured.details.slice(0, 3).map((d, i) => (
                      <div key={i} className="font-mono text-[11px] text-muted-foreground leading-relaxed">{d}</div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground">{featured.date || featured.stat}</span>
                  <span className="border border-primary bg-primary/10 px-4 py-2 font-mono text-[10px] tracking-wider text-primary group-hover:bg-primary/20 transition-colors">
                    ПОДРОБНЕЕ
                  </span>
                </div>
              </motion.article>
            </Link>
          )}

          <motion.div variants={box} className="col-span-12 lg:col-span-4 bento-card hud-corner p-6">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// MEDIA_TYPES</div>
            <div className="space-y-3">
              {[{ icon: typeReport, name: "MATCH REPORT", desc: "Репортажи и аналитика" }, { icon: typeVod, name: "VOD ARCHIVE", desc: "Архив матчей и трансляций" }].map((t) => (
                <div key={t.name} className="border border-border bg-muted/20 p-3 hover-scale">
                  <img src={t.icon} alt={t.name} className="w-14 h-14 object-contain" loading="lazy" />
                  <div className="font-display text-sm font-bold text-foreground mt-2">{t.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{t.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {rest.map((item) => (
            <Link key={item.id} to={`/media-hub/${item.id}`} className="col-span-12 md:col-span-6 lg:col-span-4">
              <motion.article variants={box} className="bento-card hud-corner p-5 h-full group">
                <div className={`font-mono text-[10px] tracking-widest mb-2 ${item.accent}`}>// {item.type.toUpperCase()}</div>
                <h3 className="font-display text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="font-mono text-[10px] text-muted-foreground mt-2">{item.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">{item.date || item.stat}</span>
                  <span className="border border-border bg-muted/20 px-3 py-1.5 font-mono text-[10px] text-foreground group-hover:border-primary/50 transition-colors">Читать</span>
                </div>
              </motion.article>
            </Link>
          ))}

          <motion.div variants={box} className="col-span-12 lg:col-span-5 bento-card hud-corner p-6">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// COMMUNITY_ACTIONS</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: interactComment, name: "Комментарии", val: "2,148" },
                { icon: interactKarma, name: "Карма", val: "+8,902" },
                { icon: interactShare, name: "Репосты", val: "1,007" },
                { icon: interactSubscribe, name: "Подписки", val: "4,381" },
              ].map((a) => (
                <div key={a.name} className="border border-border bg-muted/20 p-3 text-center">
                  <img src={a.icon} alt={a.name} className="w-12 h-12 object-contain mx-auto" loading="lazy" />
                  <div className="font-display text-lg font-black text-foreground mt-2">{a.val}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{a.name}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={box} className="col-span-12 lg:col-span-7 bento-card hud-corner p-6">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// BADGES_AND_KARMA</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {badgeItems.map((b) => (
                <div key={b.title} className="border border-border bg-muted/20 p-3 text-center hover-scale">
                  <img src={b.icon} alt={`Бейдж ${b.title}`} className="w-16 h-16 mx-auto object-contain" loading="lazy" />
                  <div className="font-display text-sm font-black text-foreground mt-2">{b.title}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">{b.req}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
