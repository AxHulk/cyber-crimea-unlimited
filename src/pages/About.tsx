import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Mail, Phone, ChevronRight, ExternalLink } from "lucide-react";

// Icons
import iconYears from "@/assets/about/icon_years.png";
import iconTournaments from "@/assets/about/icon_tournaments.png";
import iconParticipants from "@/assets/about/icon_participants.png";
import iconPrize from "@/assets/about/icon_prize.png";
import iconPresidium from "@/assets/about/icon_presidium.png";
import iconJudiciary from "@/assets/about/icon_judiciary.png";
import iconDisciplinary from "@/assets/about/icon_disciplinary.png";
import iconStudent from "@/assets/about/icon_student.png";
import iconPartners from "@/assets/about/icon_partners.png";
import iconAvatarDefault from "@/assets/about/icon_avatar_default.png";
import iconDocument from "@/assets/about/icon_document.png";
import iconJoinMember from "@/assets/about/icon_join_member.png";
import iconBecomePartner from "@/assets/about/icon_become_partner.png";
import iconPlayTournament from "@/assets/about/icon_play_tournament.png";
import logoFks from "@/assets/about/logo_fks.png";
import logoFpg from "@/assets/about/logo_fpg.png";
import logoCyberx from "@/assets/about/logo_cyberx.png";
import logoMvp from "@/assets/about/logo_mvp.png";
import logoFabrikant from "@/assets/about/logo_fabrikant.png";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stats = [
  { icon: iconYears, value: "9+", label: "Лет на рынке", color: "neon-cyan" },
  { icon: iconTournaments, value: "185+", label: "Проведённых турниров", color: "neon-purple" },
  { icon: iconParticipants, value: "22 000+", label: "Участников соревнований", color: "neon-green" },
  { icon: iconPrize, value: "4 000 000+ ₽", label: "Разыграно призовых", color: "neon-green" },
];

const timeline = [
  { year: "2016", title: "Основание Федерации", desc: "Проведение первых турниров по киберспорту в Крыму" },
  { year: "2017", title: "Киберкрым: перспективы развития", desc: "Стандартизация локальных регламентов, инициализация судейского корпуса." },
  { year: "2021", title: "Первый гейминг-хаус", desc: "Буткемп — выделенная база для тренировок 1 состава" },
  { year: "2023", title: "Турнир с участием новых регионов", desc: "Интеграция удаленных кластеров, гибридный формат соревнований." },
  { year: "2024", title: "Кубок Главы Республики Крым", desc: "Высший региональный статус, овернайт-монтаж площадки в Симферополе." },
];

const departments = [
  { icon: iconPresidium, name: "Президиум", desc: "Стратегическое управление и принятие ключевых решений", color: "border-yellow-500/50" },
  { icon: iconJudiciary, name: "Судейская коллегия", desc: "Обеспечение честного и прозрачного судейства на всех турнирах", color: "border-neon-cyan/50" },
  { icon: iconDisciplinary, name: "Дисциплинарный комитет", desc: "Контроль за соблюдением правил и рассмотрение апелляций", color: "border-pink-500/50" },
  { icon: iconStudent, name: "Студенческий киберспорт", desc: "Развитие киберспорта в вузах и проведение межвузовских турниров", color: "border-purple-500/50" },
  { icon: iconPartners, name: "Работа с партнёрами", desc: "Привлечение спонсоров и развитие партнёрской сети", color: "border-neon-green/50" },
];

const team = [
  { name: "Прокуда Станислав Андреевич", role: "Президент ФКС РК", desc: "Стратегическое развитие и представительство на федеральном уровне" },
  { name: "Васильченко Алексей Анатольевич", role: "Технический директор", desc: "Руководитель технической части и организатор соревнований" },
  { name: "Киселёв Егор Игоревич", role: "Директор по развитию", desc: "Партнёрские программы и продвижение киберспорта в регионе" },
  { name: "Жинжак Максим Владимирович", role: "Генеральный секретарь", desc: "PR-направления и связи с общественностью" },
];

const documents = [
  { name: "Устав ФКС РК", format: "PDF", href: "/docs/ustav_fks_2026.pdf" },
  { name: "Пользовательское соглашение", format: "PDF", href: "/docs/polzovatelskoe_soglashenie.pdf" },
  { name: "Публичная оферта", format: "PDF", href: "/docs/publichnaya_oferta.pdf" },
  { name: "Политика обработки персональных данных", format: "PDF", href: "/docs/politika_opd.pdf" },
  { name: "Согласие на обработку персональных данных", format: "PDF", href: "/docs/soglasie_opd.pdf" },
  { name: "Согласие на получение рассылки", format: "PDF", href: "/docs/soglasie_ptl.pdf" },
  { name: "Положение о безопасности платежей и возвратах", format: "PDF", href: "/docs/polozhenie_bezopasnost_platezhey.pdf" },
];

const ctaActions = [
  { icon: iconJoinMember, label: "Стать членом Федерации", desc: "Получите официальный статус и начните путь в киберспорте", to: "/auth", color: "neon-cyan" },
  { icon: iconBecomePartner, label: "Стать партнёром", desc: "Обсудите варианты сотрудничества и продвижения", to: "/about", color: "neon-green" },
  { icon: iconPlayTournament, label: "Участвовать в турнирах", desc: "Присоединяйтесь к соревнованиям в Арене", to: "/arena", color: "neon-purple" },
];

const [activeTimeline, setActiveTimeline] = [0, () => {}]; // placeholder for hook

const About = () => {
  const [activeTL, setActiveTL] = useState(0);

  return (
    <div className="min-h-screen bg-background scanline">
      <HudNavbar />
      <main className="pt-24 pb-20">
        {/* ===== HERO / MANIFEST ===== */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, hsl(var(--neon-purple)) 1px, transparent 1px), radial-gradient(circle at 70% 30%, hsl(var(--neon-cyan)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 80px 80px',
          }} />
          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0"
              >
                <img src={logoFks} alt="ФКС РК" className="w-full h-full object-contain drop-shadow-[0_0_20px_hsl(270,80%,60%,0.4)]" />
              </motion.div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-3">// ABOUT_FKS_RK</div>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wide mb-4">
                  О ФЕДЕРАЦИИ
                </h1>
                <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                  Региональная общественная организация
                  <br />
                  «Федерация компьютерного спорта Республики Крым»
                </p>
                <p className="font-display text-lg md:text-xl text-foreground/80 mt-4 max-w-2xl">
                  Строим будущее киберспорта в Крыму.
                  <br />
                  От локальных турниров до национальных чемпионатов.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MISSION ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-6">// MISSION</div>
          <div className="relative bento-card hud-corner p-6 md:p-10 border-l-2 border-l-primary">
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Наша миссия — развитие массового киберспорта в Республике Крым, поддержка талантливых игроков,
              интеграция в общероссийскую систему соревнований и создание прозрачной экосистемы, где каждый
              желающий может пройти путь от новичка до профессионального спортсмена. Мы формируем инфраструктуру,
              проводим турниры всех уровней и обеспечиваем профессиональное судейство для честной и конкурентной
              среды.
            </p>
          </div>
        </section>

        {/* ===== ACHIEVEMENTS IN NUMBERS ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon-green mb-6">// ACHIEVEMENTS</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-8">ДОСТИЖЕНИЯ В ЦИФРАХ</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={itemVariants} className="bento-card hud-corner text-center group p-6">
                <img src={s.icon} alt={s.label} className="w-10 h-10 mx-auto mb-4 object-contain" />
                <div className={`font-display text-2xl md:text-3xl font-bold text-${s.color} transition-colors`}>
                  {s.value}
                </div>
                <div className="font-mono text-[9px] text-muted-foreground mt-2 tracking-wider uppercase">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===== TIMELINE ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-6">// HISTORY</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-8">ИСТОРИЯ РАЗВИТИЯ</h2>

          {/* Timeline navigation */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
            <div className="flex justify-between relative z-10">
              {timeline.map((item, i) => (
                <button
                  key={item.year}
                  onClick={() => setActiveTL(i)}
                  className={`flex flex-col items-center gap-2 group transition-all duration-300`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    activeTL === i
                      ? "bg-primary border-primary shadow-[0_0_12px_hsl(270,80%,60%,0.6)]"
                      : "bg-card border-border group-hover:border-primary/50"
                  }`} />
                  <span className={`font-mono text-xs transition-colors ${
                    activeTL === i ? "text-primary" : "text-muted-foreground"
                  }`}>{item.year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active event */}
          <motion.div
            key={activeTL}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bento-card hud-corner p-6"
          >
            <div className="font-display text-lg font-bold text-primary mb-1">{timeline[activeTL].year}</div>
            <h3 className="font-display text-xl font-bold mb-2">{timeline[activeTL].title}</h3>
            <p className="font-body text-sm text-muted-foreground">{timeline[activeTL].desc}</p>
          </motion.div>
        </section>

        {/* ===== STRUCTURE ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon-purple mb-6">// STRUCTURE</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-8">СТРУКТУРА ФЕДЕРАЦИИ</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {departments.map((dept) => (
              <motion.div
                key={dept.name}
                variants={itemVariants}
                className={`bento-card hud-corner group p-5 border-l-2 ${dept.color}`}
              >
                <img src={dept.icon} alt={dept.name} className="w-10 h-10 object-contain mb-3" />
                <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors mb-1">{dept.name}</h3>
                <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{dept.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===== TEAM ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-6">// TEAM</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-8">КОМАНДА</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {team.map((person) => (
              <motion.div key={person.name} variants={itemVariants} className="bento-card hud-corner group p-5 text-center">
                <img src={iconAvatarDefault} alt={person.name} className="w-16 h-16 mx-auto mb-3 object-contain" />
                <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors">{person.name}</h3>
                <div className="font-mono text-[10px] text-primary mt-1">{person.role}</div>
                <p className="font-mono text-[9px] text-muted-foreground mt-2 leading-relaxed">{person.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===== PARTNERS ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon-green mb-6">// PARTNERS</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-8">ПАРТНЁРЫ И СПОНСОРЫ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { logo: logoFpg, name: "Фонд Президентских грантов", role: "Генеральный партнёр", imgClass: "" },
              { logo: logoMvp, name: "MVP", role: "Технический партнёр", imgClass: "" },
              { logo: logoCyberx, name: "CyberX", role: "Технический партнёр, спонсор", imgClass: "" },
              { logo: logoFabrikant, name: "Фабрикантъ", role: "Коммерческий партнёр", imgClass: "invert brightness-200" },
            ].map((partner) => (
              <div key={partner.name} className="bento-card hud-corner p-5 text-center group flex flex-col items-center justify-center">
                <div className="h-16 mx-auto mb-3 flex items-center justify-center">
                  <img src={partner.logo} alt={partner.name} className={`h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity ${partner.imgClass}`} />
              </div>
                <div className="font-mono text-[9px] text-muted-foreground mt-1">{partner.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== DOCUMENTS ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-accent mb-6">// DOCUMENTS</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-8">ОФИЦИАЛЬНЫЕ ДОКУМЕНТЫ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <a key={doc.name} href={doc.href} target="_blank" rel="noopener noreferrer" className="bento-card group flex items-center gap-4 p-4 cursor-pointer">
                <img src={iconDocument} alt="PDF" className="w-8 h-8 object-contain flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-display text-sm font-bold group-hover:text-primary transition-colors">{doc.name}</span>
                  <div className="font-mono text-[9px] text-muted-foreground mt-0.5">{doc.format}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-6">// CONTACT</div>
          <div className="bento-card hud-corner p-6 md:p-8 max-w-xl">
            <h3 className="font-display text-lg font-bold mb-4">Контакты</h3>
            <div className="space-y-3 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>295034, Респ. Крым, г. Симферополь, пр-кт Победы 42</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>hello@axhulk.ru</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+7 (978) XXX-XX-XX</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon-green mb-6">// JOIN_US</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-8">ПРИСОЕДИНЯЙСЯ</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {ctaActions.map((cta) => (
              <motion.div key={cta.label} variants={itemVariants}>
                <Link
                  to={cta.to}
                  className={`bento-card hud-corner group flex flex-col items-center text-center p-6 hover:border-${cta.color}/50 block`}
                >
                  <img src={cta.icon} alt={cta.label} className="w-14 h-14 object-contain mb-4" />
                  <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors mb-2">{cta.label}</h3>
                  <p className="font-mono text-[10px] text-muted-foreground leading-relaxed mb-3">{cta.desc}</p>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
