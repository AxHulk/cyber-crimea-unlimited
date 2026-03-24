import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Send, ChevronRight } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// KPI icons
import iconReach from "@/assets/b2b/icon_kpi_reach.png";
import iconEngagement from "@/assets/b2b/icon_kpi_engagement.png";
import iconDemographics from "@/assets/b2b/icon_kpi_demographics.png";
import iconRoi from "@/assets/b2b/icon_kpi_roi.png";

// Integration type icons
import iconBranding from "@/assets/b2b/icon_int_branding.png";
import iconCorporate from "@/assets/b2b/icon_int_corporate.png";
import iconInfra from "@/assets/b2b/icon_int_infra.png";
import iconLk from "@/assets/b2b/icon_int_lk.png";
import iconNative from "@/assets/b2b/icon_int_native.png";
import iconSection from "@/assets/b2b/icon_int_section.png";

// Package icons
import iconPkgGeneral from "@/assets/b2b/icon_pkg_general.png";
import iconPkgTournament from "@/assets/b2b/icon_pkg_tournament.png";
import iconPkgTechnical from "@/assets/b2b/icon_pkg_technical.png";
import iconPkgInfo from "@/assets/b2b/icon_pkg_info.png";

// Step icons
import iconStepLead from "@/assets/b2b/icon_step_lead.png";
import iconStepQualify from "@/assets/b2b/icon_step_qualify.png";
import iconStepProposal from "@/assets/b2b/icon_step_proposal.png";
import iconStepSign from "@/assets/b2b/icon_step_sign.png";
import iconStepImplement from "@/assets/b2b/icon_step_implement.png";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const kpiStats = [
  { icon: iconReach, value: "22 000+", label: "Активных пользователей", color: "text-[hsl(var(--neon-cyan))]" },
  { icon: iconEngagement, value: "87%", label: "Вовлечённость аудитории", color: "text-[hsl(var(--neon-magenta))]" },
  { icon: iconDemographics, value: "18–34", label: "Ядро аудитории (лет)", color: "text-amber-400" },
  { icon: iconRoi, value: "3.2x", label: "Средний ROI партнёров", color: "text-[hsl(var(--neon-green))]" },
];

const integrationTypes = [
  {
    icon: iconSection,
    title: "Спонсорство раздела",
    desc: "Эксклюзивное брендирование раздела сайта: ваш логотип, цвета и материалы интегрированы во все элементы.",
    color: "border-amber-400/30 hover:border-amber-400",
  },
  {
    icon: iconBranding,
    title: "Брендирование турниров",
    desc: "Ваш логотип в названии турнира, на всех материалах, стримах и в турнирных сетках Арены.",
    color: "border-[hsl(var(--neon-cyan))]/30 hover:border-[hsl(var(--neon-cyan))]",
  },
  {
    icon: iconNative,
    title: "Нативная реклама",
    desc: "Публикация нативных статей в Медиа-хабе, органично вписанных в контент платформы.",
    color: "border-[hsl(var(--neon-magenta))]/30 hover:border-[hsl(var(--neon-magenta))]",
  },
  {
    icon: iconInfra,
    title: "Интеграция в Инфраструктуру",
    desc: "Премиум-листинг для киберклубов и поставщиков оборудования с расширенным профилем.",
    color: "border-[hsl(var(--neon-green))]/30 hover:border-[hsl(var(--neon-green))]",
  },
  {
    icon: iconCorporate,
    title: "Корпоративные турниры",
    desc: "Организация турниров под ключ для сотрудников или клиентов вашей компании.",
    color: "border-blue-400/30 hover:border-blue-400",
  },
  {
    icon: iconLk,
    title: "Интеграция в личный кабинет",
    desc: "Размещение спецпредложений и контента в личном кабинете пользователей платформы.",
    color: "border-purple-400/30 hover:border-purple-400",
  },
];

const packages = [
  {
    icon: iconPkgGeneral,
    tier: "ГЕНЕРАЛЬНЫЙ",
    price: "1 500 000 ₽",
    period: "/ сезон",
    color: "from-amber-500/20 to-amber-600/5 border-amber-500/40",
    glowClass: "shadow-[0_0_30px_hsl(40_100%_50%/0.15)]",
    features: [
      { text: "Брендирование всех турниров сезона", included: true },
      { text: "Именной ладдер в Рейтингах", included: true },
      { text: "2+ нативных статьи + спецпроект", included: true },
      { text: "Логотип на сайте", included: true },
      { text: "Доступ в Кабинет партнёра", included: true },
      { text: "Детальная аналитика и отчёты", included: true },
    ],
    popular: true,
  },
  {
    icon: iconPkgTournament,
    tier: "ПАРТНЁР ТУРНИРА",
    price: "300 000 ₽",
    period: "/ турнир",
    color: "from-[hsl(var(--neon-cyan))]/15 to-transparent border-[hsl(var(--neon-cyan))]/30",
    glowClass: "",
    features: [
      { text: "Брендирование одного турнира", included: true },
      { text: "Именной ладдер в Рейтингах", included: false },
      { text: "Анонсы с упоминанием", included: true },
      { text: "Логотип на сайте", included: true },
      { text: "Доступ в Кабинет партнёра", included: true },
      { text: "Детальная аналитика и отчёты", included: true },
    ],
    popular: false,
  },
  {
    icon: iconPkgTechnical,
    tier: "ТЕХНИЧЕСКИЙ",
    price: "от 100 000 ₽",
    period: "+ оборудование",
    color: "from-blue-500/15 to-transparent border-blue-500/30",
    glowClass: "",
    features: [
      { text: "Продукт-плейсмент в Инфраструктуре", included: true },
      { text: "Именной ладдер в Рейтингах", included: false },
      { text: "1 обзорная статья", included: true },
      { text: "Логотип на сайте", included: true },
      { text: "Доступ в Кабинет партнёра", included: true },
      { text: "Детальная аналитика и отчёты", included: true },
    ],
    popular: false,
  },
  {
    icon: iconPkgInfo,
    tier: "ИНФО-ПАРТНЁР",
    price: "Бартер",
    period: "",
    color: "from-purple-500/15 to-transparent border-purple-500/30",
    glowClass: "",
    features: [
      { text: "Брендирование в Арене", included: false },
      { text: "Именной ладдер в Рейтингах", included: false },
      { text: "Взаимные анонсы", included: true },
      { text: "Логотип на сайте", included: true },
      { text: "Доступ в Кабинет партнёра", included: false },
      { text: "Аналитика и отчёты", included: false },
    ],
    popular: false,
  },
];

const processSteps = [
  { icon: iconStepLead, step: "01", title: "ЗАЯВКА", desc: "Вы оставляете заявку через форму на сайте" },
  { icon: iconStepQualify, step: "02", title: "КВАЛИФИКАЦИЯ", desc: "Менеджер уточняет ваши цели и бюджет" },
  { icon: iconStepProposal, step: "03", title: "ПРЕДЛОЖЕНИЕ", desc: "Формируем индивидуальный пакет" },
  { icon: iconStepSign, step: "04", title: "ДОГОВОР", desc: "Согласуем детали и подписываем договор" },
  { icon: iconStepImplement, step: "05", title: "ЗАПУСК", desc: "Интеграция контента и старт кампании" },
];

const whyStats = [
  { value: "0%", label: "Смотрят ТВ-рекламу" },
  { value: "74%", label: "Используют AdBlock" },
  { value: "92%", label: "Лояльны к интегрированным брендам" },
  { value: "₽45K", label: "Средний доход аудитории" },
];

// Normalize any phone input to 10 digits (without country code)
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // 89991234567 → 9991234567, 79991234567 → 9991234567, 9991234567 → as is
  if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) return digits.slice(1);
  if (digits.length === 10) return digits;
  // partial input
  if (digits.length < 10) {
    if (digits.length > 0 && (digits[0] === "7" || digits[0] === "8")) return digits.slice(1);
    return digits;
  }
  // longer than 11 — take last 10
  return digits.slice(-10);
}

function formatPhone(digits: string): string {
  const d = digits;
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length <= 8) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`;
}

export default function B2B() {
  const [formData, setFormData] = useState({ name: "", company: "", phone: "", email: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = normalizePhone(e.target.value);
    setFormData({ ...formData, phone: digits });
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const digits = normalizePhone(pasted);
    setFormData({ ...formData, phone: digits });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background scanline">
      <HudNavbar />
      <main className="pt-24">

        {/* === HERO === */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_100%_50%/0.08),transparent_60%)]" />
          <div className="container mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="font-mono text-[10px] tracking-[0.3em] text-amber-400 mb-3">// B2B_PORTAL</div>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide mb-6 leading-tight">
                ВАША ТОЧКА ВХОДА<br />
                <span className="text-amber-400">В КИБЕРСПОРТ КРЫМА</span>
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mb-10">
                Получите доступ к 22 000+ активных киберспортсменов и фанатов. 
                Мы не продаём логотипы на баннерах — мы предлагаем измеримый доступ 
                к одной из самых востребованных аудиторий.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-background font-display font-bold px-8 py-4 text-sm tracking-wider transition-all">
                СТАТЬ ПАРТНЁРОМ <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* KPI cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {kpiStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bento-card text-center"
                >
                  <img src={stat.icon} alt="" className="w-10 h-10 mx-auto mb-3 object-contain" />
                  <div className={`font-display text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === ПОЧЕМУ КИБЕРСПОРТ === */}
        <section className="py-20 px-4 border-t border-border">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="font-mono text-[10px] tracking-[0.3em] text-[hsl(var(--neon-cyan))] mb-2">// WHY_ESPORTS</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-4">ПОЧЕМУ КИБЕРСПОРТ?</h2>
              <p className="text-muted-foreground max-w-3xl mb-12">
                Киберспортивная аудитория — одна из самых трудноохватимых через традиционные каналы.
                Она не смотрит ТВ, использует AdBlock, но демонстрирует экстремальную лояльность к брендам,
                интегрированным в её увлечения.
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {whyStats.map((s) => (
                <motion.div key={s.label} variants={itemVariants} className="bento-card text-center py-8">
                  <div className="font-display text-3xl md:text-4xl font-bold text-[hsl(var(--neon-cyan))]">{s.value}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-2 tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === ТИПЫ ИНТЕГРАЦИЙ === */}
        <section className="py-20 px-4 border-t border-border">
          <div className="container mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[hsl(var(--neon-magenta))] mb-2">// INTEGRATION_TYPES</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-12">ТИПЫ ИНТЕГРАЦИЙ</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {integrationTypes.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className={`bento-card border ${item.color} transition-all group`}
                >
                  <img src={item.icon} alt="" className="w-12 h-12 object-contain mb-4" />
                  <h3 className="font-display text-sm font-bold tracking-wider mb-2 group-hover:text-foreground transition-colors">{item.title}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === СПОНСОРСКИЕ ПАКЕТЫ === */}
        <section className="py-20 px-4 border-t border-border">
          <div className="container mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-amber-400 mb-2">// PACKAGES</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-4">СПОНСОРСКИЕ ПАКЕТЫ</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Готовые решения с чёткими KPI. Выберите подходящий уровень или запросите индивидуальный пакет.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.tier}
                  variants={itemVariants}
                  className={`relative bento-card bg-gradient-to-b ${pkg.color} ${pkg.glowClass} flex flex-col`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-px left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  )}
                  <img src={pkg.icon} alt="" className="w-10 h-10 object-contain mb-3" />
                  <div className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground mb-1">{pkg.tier}</div>
                  <div className="font-display text-xl font-bold mb-0.5">
                    {pkg.price}
                    <span className="text-xs font-normal text-muted-foreground">{pkg.period}</span>
                  </div>
                  <div className="border-t border-border/50 my-4" />
                  <ul className="space-y-2.5 flex-1">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        {f.included ? (
                          <Check className="w-3.5 h-3.5 text-[hsl(var(--neon-green))] mt-0.5 shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-muted-foreground/40 mt-0.5 shrink-0">—</span>
                        )}
                        <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-6 block text-center font-display text-xs tracking-wider py-2.5 border transition-all
                      ${pkg.popular
                        ? "bg-amber-500 text-background border-amber-500 hover:bg-amber-400"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                  >
                    ВЫБРАТЬ
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === ПРОЦЕСС === */}
        <section className="py-20 px-4 border-t border-border">
          <div className="container mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[hsl(var(--neon-green))] mb-2">// WORKFLOW</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-12">ПРОЦЕСС РАБОТЫ</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-border via-[hsl(var(--neon-green))]/30 to-border -translate-y-1/2 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {processSteps.map((step, i) => (
                  <motion.div key={step.step} variants={itemVariants} className="bento-card text-center relative z-10">
                    <div className="font-mono text-[9px] tracking-widest text-[hsl(var(--neon-green))] mb-3">{step.step}</div>
                    <img src={step.icon} alt="" className="w-12 h-12 mx-auto mb-3 object-contain" />
                    <h3 className="font-display text-xs font-bold tracking-wider mb-1">{step.title}</h3>
                    <p className="font-body text-[11px] text-muted-foreground">{step.desc}</p>
                    {i < processSteps.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--neon-green))]/50 z-20" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* === КОРПОРАТИВНЫЕ ТУРНИРЫ === */}
        <section className="py-20 px-4 border-t border-border">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="font-mono text-[10px] tracking-[0.3em] text-blue-400 mb-2">// CORPORATE_EVENTS</div>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-4">
                  МЕРОПРИЯТИЯ<br /><span className="text-blue-400">ПОД КЛЮЧ</span>
                </h2>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  Организуем корпоративный турнир для вашей компании с полным сопровождением: 
                  разработка регламента, техническое оснащение, стриминг, награждение. 
                  Идеальный инструмент для тимбилдинга и бренд-билдинга.
                </p>
                <ul className="space-y-3">
                  {["Разработка регламента и правил", "Полное техническое оснащение", "Профессиональный стриминг", "Призовой фонд и награждение"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bento-card border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-transparent p-8"
              >
                <img src={iconCorporate} alt="" className="w-20 h-20 mx-auto mb-6 object-contain opacity-80" />
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-blue-400 mb-1">от 150 000 ₽</div>
                  <div className="font-mono text-[10px] text-muted-foreground tracking-wider">ПОЛНЫЙ ПАКЕТ ОРГАНИЗАЦИИ</div>
                </div>
                <div className="border-t border-border/50 my-6" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">50+</div>
                    <div className="font-mono text-[9px] text-muted-foreground">УЧАСТНИКОВ</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">8ч</div>
                    <div className="font-mono text-[9px] text-muted-foreground">ЭФИРНОГО ВРЕМЕНИ</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">4</div>
                    <div className="font-mono text-[9px] text-muted-foreground">ДИСЦИПЛИНЫ</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === ФОРМА ЗАЯВКИ === */}
        <section id="contact" className="py-20 px-4 border-t border-border">
          <div className="container mx-auto max-w-2xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="font-mono text-[10px] tracking-[0.3em] text-amber-400 mb-2">// CONTACT_FORM</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide mb-4 text-center">СТАТЬ ПАРТНЁРОМ</h2>
              <p className="text-muted-foreground text-center mb-10 text-sm">
                Оставьте заявку, и наш менеджер свяжется с вами в течение 24 часов.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bento-card text-center py-16 border-[hsl(var(--neon-green))]/30"
              >
                <Check className="w-12 h-12 text-[hsl(var(--neon-green))] mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">ЗАЯВКА ОТПРАВЛЕНА</h3>
                <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время.</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="bento-card border-amber-500/20 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1.5 block">ИМЯ *</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-input border border-border px-3 py-2.5 text-sm text-foreground focus:border-amber-400 focus:outline-none transition-colors"
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1.5 block">КОМПАНИЯ *</label>
                    <input
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-input border border-border px-3 py-2.5 text-sm text-foreground focus:border-amber-400 focus:outline-none transition-colors"
                      placeholder="ООО «Компания»"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1.5 block">ТЕЛЕФОН *</label>
                    <div className="flex">
                      <span className="flex items-center bg-input border border-r-0 border-border px-2.5 py-2.5 text-sm text-muted-foreground font-mono select-none">+7</span>
                      <input
                        required
                        type="tel"
                        value={formatPhone(formData.phone)}
                        onChange={handlePhoneChange}
                        onPaste={handlePhonePaste}
                        className="w-full bg-input border border-border px-3 py-2.5 text-sm text-foreground focus:border-amber-400 focus:outline-none transition-colors"
                        placeholder="(900) 000-00-00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1.5 block">E-MAIL *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-input border border-border px-3 py-2.5 text-sm text-foreground focus:border-amber-400 focus:outline-none transition-colors"
                      placeholder="partner@company.ru"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1.5 block">КОММЕНТАРИЙ</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={3}
                    className="w-full bg-input border border-border px-3 py-2.5 text-sm text-foreground focus:border-amber-400 focus:outline-none transition-colors resize-none"
                    placeholder="Расскажите о ваших целях и бюджете..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-background font-display font-bold tracking-wider py-6"
                >
                  <Send className="w-4 h-4 mr-2" /> ОТПРАВИТЬ ЗАЯВКУ
                </Button>
              </motion.form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
