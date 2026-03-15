import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Target, Users, Award, MapPin, Mail, Phone } from "lucide-react";

const leadership = [
  { name: "Иванов Александр Сергеевич", role: "Президент ФКС РК" },
  { name: "Петрова Елена Владимировна", role: "Вице-президент" },
  { name: "Сидоров Дмитрий Андреевич", role: "Генеральный секретарь" },
  { name: "Козлова Анна Игоревна", role: "Директор по развитию" },
];

const stats = [
  { icon: Users, value: "1,247", label: "Зарегистрированных спортсменов" },
  { icon: Award, value: "86", label: "Турниров за 2025 год" },
  { icon: Target, value: "12", label: "Дисциплин" },
  { icon: Shield, value: "45", label: "Команд в реестре" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  return (
    <div className="min-h-screen bg-background scanline">
      <HudNavbar />
      <main className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-neon-green mb-2">// ABOUT_FKS_RK</div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-wide mb-6">О ФЕДЕРАЦИИ</h1>
            <div className="max-w-3xl space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
              <p>
                Федерация компьютерного спорта Республики Крым (ФКС РК) — региональное отделение Федерации компьютерного спорта России.
                Мы развиваем киберспорт на полуострове, организуем турниры, готовим спортсменов и представляем Крым на всероссийских соревнованиях.
              </p>
              <p>
                Наша миссия — сделать киберспорт доступным для каждого жителя Крыма, создать инфраструктуру для профессионального роста
                игроков и вывести крымские команды на федеральный уровень.
              </p>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bento-card hud-corner text-center group"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-3 text-primary group-hover:text-neon-green transition-colors" />
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] text-muted-foreground mt-2 tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Leadership */}
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-6">// LEADERSHIP</div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-12 gap-4"
            >
              {leadership.map((person, i) => (
                <motion.div
                  key={person.name}
                  variants={itemVariants}
                  className={`bento-card group ${
                    i === 0 ? "col-span-12 md:col-span-6" : "col-span-12 sm:col-span-6 md:col-span-3"
                  }`}
                  style={{ marginTop: i === 2 ? '-0.5rem' : undefined }}
                >
                  <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center mb-3">
                    <span className="font-display text-lg font-bold text-primary">
                      {person.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors">{person.name}</h3>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">{person.role}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-6">// CONTACT</div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 bento-card">
                <h3 className="font-display text-lg font-bold mb-4">Контакты</h3>
                <div className="space-y-3 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>г. Симферополь, Республика Крым</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>info@fks-rk.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+7 (978) XXX-XX-XX</span>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 bento-card">
                <h3 className="font-display text-lg font-bold mb-4">Документы</h3>
                <div className="space-y-2">
                  {["Устав ФКС РК", "Регламент турниров", "Положение о рейтинге", "Антидопинговая политика"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 py-1.5 px-2 border border-border hover:border-primary/50 transition-all cursor-pointer group/doc">
                      <span className="font-mono text-xs text-muted-foreground group-hover/doc:text-foreground transition-colors">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
