import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";

import iconMapPin from "@/assets/infrastructure/icon_map_pin.png";
import iconGpu from "@/assets/infrastructure/icon_gpu.png";
import iconMonitor from "@/assets/infrastructure/icon_monitor.png";
import iconHardware from "@/assets/infrastructure/icon_hardware.png";
import iconConsole from "@/assets/infrastructure/icon_console.png";
import iconBootcamp from "@/assets/infrastructure/icon_bootcamp.png";
import iconBar from "@/assets/infrastructure/icon_bar.png";
import iconVip from "@/assets/infrastructure/icon_vip.png";
import iconAtmosphere from "@/assets/infrastructure/icon_atmosphere.png";
import iconCleanliness from "@/assets/infrastructure/icon_cleanliness.png";
import iconStaff from "@/assets/infrastructure/icon_staff.png";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cities = ["Все", "Симферополь", "Севастополь", "Ялта", "Керчь", "Евпатория"];

interface Hall {
  name: string;
  gpu?: string;
  cpu?: string;
  monitor?: string;
  priceDay: number;
  priceNight: number;
  priceLate?: number;
  timeDay?: string;
  timeNight?: string;
  timeLate?: string;
}

interface Club {
  id: number;
  name: string;
  city: string;
  address: string;
  rating: number;
  reviews: number;
  ratingSource: string;
  status: string;
  hours: string;
  zones: string[];
  halls: Hall[];
  links: {
    yandex?: string;
    booking?: string;
    vk?: string;
  };
  ratingDetails: { hardware: number; atmosphere: number; cleanliness: number; staff: number };
}

const clubs: Club[] = [
  {
    id: 1,
    name: "Дофамин",
    city: "Симферополь",
    address: "Эстонская улица, 2, этаж 3",
    rating: 5.0,
    reviews: 349,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["bootcamp", "vip", "bar", "console"],
    halls: [
      { name: "Prime", gpu: "GeForce 5060", cpu: "AMD Ryzen 5 8400F", monitor: "240 Hz", priceDay: 149, priceNight: 169, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "Squad", gpu: "GeForce 5070", cpu: "AMD Ryzen 5 7500F", monitor: "280 Hz", priceDay: 189, priceNight: 219, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "Bootcamp", gpu: "GeForce 4070 TI", cpu: "i5-13600KF", monitor: "270 Hz", priceDay: 239, priceNight: 269, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "PS5 Zone", priceDay: 449, priceNight: 499, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/86547315556",
      booking: "https://taplink.cc/godpmn",
      vk: "https://vk.com/godpmn",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 4.9, staff: 5.0 },
  },
  {
    id: 2,
    name: "CyberX Центральный",
    city: "Симферополь",
    address: "ул. Пушкина, 5, этаж цокольный",
    rating: 5.0,
    reviews: 573,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["bootcamp", "vip", "bar", "console"],
    halls: [
      { name: "Стандарт", gpu: "GTX 1660 TI", cpu: "i5-9400F", monitor: "144 Hz", priceDay: 120, priceNight: 130, priceLate: 160, timeDay: "09:00–17:00", timeNight: "17:00–00:00", timeLate: "00:00–09:00" },
      { name: "Мидл", gpu: "RTX 2070 SUPER", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 150, priceNight: 170, priceLate: 200, timeDay: "09:00–17:00", timeNight: "17:00–00:00", timeLate: "00:00–09:00" },
      { name: "Випка", gpu: "RTX 4070 TI", cpu: "i5-12600KF", monitor: "240 Hz", priceDay: 180, priceNight: 200, priceLate: 270, timeDay: "09:00–17:00", timeNight: "17:00–00:00", timeLate: "00:00–09:00" },
      { name: "Имбудка", gpu: "RTX 5070 TI", cpu: "Ryzen 7 9800X3D", monitor: "400 Hz", priceDay: 290, priceNight: 330, priceLate: 400, timeDay: "09:00–17:00", timeNight: "17:00–00:00", timeLate: "00:00–09:00" },
      { name: "ДУО", gpu: "RTX 5070 TI", cpu: "Ryzen 7 9800X3D", monitor: "400 Hz", priceDay: 320, priceNight: 360, priceLate: 430, timeDay: "09:00–17:00", timeNight: "17:00–00:00", timeLate: "00:00–09:00" },
      { name: "PS5 Лаунж", priceDay: 400, priceNight: 400, timeDay: "09:00–17:00", timeNight: "17:00–00:00" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/115521029721",
      booking: "https://cyberx-center.ru",
      vk: "https://vk.com/cyberx.simferopol",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 3,
    name: "Rampage Arena",
    city: "Симферополь",
    address: "проспект Кирова, 19, этаж цокольный",
    rating: 5.0,
    reviews: 157,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["bootcamp", "vip", "streamer", "console"],
    halls: [
      { name: "Стандарт", gpu: "RTX 4070 TI", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 100, priceNight: 120, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "VIP", gpu: "RTX 4070 TI Super", cpu: "i7-14700KF", monitor: "280 Hz", priceDay: 150, priceNight: 170, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "PS5", priceDay: 300, priceNight: 300, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
    ],
    links: {
      yandex: "https://yandex.com/profile/12212603817",
      booking: "https://t.me/+79786758201",
      vk: "https://vk.com/rampagearena82",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
];

const zoneIcons: Record<string, { icon: string; label: string }> = {
  bootcamp: { icon: iconBootcamp, label: "Буткемп" },
  vip: { icon: iconVip, label: "VIP" },
  bar: { icon: iconBar, label: "Бар" },
  console: { icon: iconConsole, label: "Приставки" },
  streamer: { icon: iconVip, label: "Стримерская" },
};

const ratingIcons = [
  { key: "hardware", icon: iconHardware, label: "Железо" },
  { key: "atmosphere", icon: iconAtmosphere, label: "Атмосфера" },
  { key: "cleanliness", icon: iconCleanliness, label: "Чистота" },
  { key: "staff", icon: iconStaff, label: "Персонал" },
];

function StarRating({ value }: { value: number }) {
  return (
    <span className="font-mono text-xs text-neon-green">{value.toFixed(1)} ★</span>
  );
}

function getBestSpec(halls: Hall[]) {
  const pcHalls = halls.filter((h) => h.gpu);
  if (pcHalls.length === 0) return { gpu: "—", cpu: "—", monitor: "—" };
  const best = pcHalls[pcHalls.length - 1];
  return { gpu: best.gpu!, cpu: best.cpu!, monitor: best.monitor! };
}

export default function Infrastructure() {
  const [selectedCity, setSelectedCity] = useState("Все");
  const [openNow, setOpenNow] = useState(false);
  const [selectedClub, setSelectedClub] = useState<number | null>(null);

  const filtered = clubs.filter((c) => {
    if (selectedCity !== "Все" && c.city !== selectedCity) return false;
    if (openNow && c.status !== "open") return false;
    return true;
  });

  const activeClub = selectedClub !== null ? clubs.find((c) => c.id === selectedClub) : null;

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="font-mono text-[10px] tracking-[0.4em] text-neon-cyan mb-3">// VENUES_&_CLUBS</div>
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground mb-4">
              ПЛОЩАДКИ <span className="text-neon-cyan">//</span> КРЫМ
            </h1>
            <p className="font-mono text-sm text-muted-foreground max-w-2xl mx-auto">
              Каталог киберспортивных площадок Крыма. Оборудование, рейтинги — всё в одном месте.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      </section>

      <section className="container mx-auto px-4 pb-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>

          {/* Filters row */}
          <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-3">
            <img src={iconMapPin} alt="Location" className="w-6 h-6" />
            <div className="font-mono text-[10px] tracking-widest text-neon-cyan mr-2">// ФИЛЬТРЫ</div>
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-wider border transition-all
                  ${selectedCity === c
                    ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                    : "border-border text-muted-foreground hover:border-neon-cyan/40 hover:text-foreground"
                  }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
            <button
              onClick={() => setOpenNow(!openNow)}
              className={`ml-auto px-3 py-1.5 font-mono text-[10px] tracking-wider border transition-all
                ${openNow
                  ? "border-neon-green text-neon-green bg-neon-green/10"
                  : "border-border text-muted-foreground hover:border-neon-green/40"
                }`}
            >
              {openNow ? "● " : "○ "}ОТКРЫТО СЕЙЧАС
            </button>
          </motion.div>

          {/* Main grid: club list + detail */}
          <div className="grid grid-cols-12 gap-4">

            {/* Club list — left panel */}
            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {filtered.length === 0 && (
                <div className="bento-card hud-corner p-8 text-center">
                  <div className="font-mono text-sm text-muted-foreground">Нет площадок по фильтру</div>
                </div>
              )}
              {filtered.map((club) => {
                const best = getBestSpec(club.halls);
                return (
                  <motion.div
                    key={club.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedClub(club.id)}
                    className={`bento-card hud-corner p-4 cursor-pointer transition-all ${
                      selectedClub === club.id ? "border-neon-cyan neon-glow-cyan" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-display text-base font-bold text-foreground">{club.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{club.city} · {club.address}</div>
                      </div>
                      <span className={`flex items-center gap-1.5 font-mono text-[10px] ${
                        club.status === "open" ? "text-neon-green" : "text-destructive"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${club.status === "open" ? "bg-neon-green animate-pulse" : "bg-destructive"}`} />
                        {club.status === "open" ? `Открыто ${club.hours}` : `Закрыто, откр. ${club.hours}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <StarRating value={club.rating} />
                      <span className="font-mono text-[9px] text-muted-foreground">{club.reviews} оценок · {club.ratingSource}</span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <img src={iconGpu} alt="GPU" className="w-4 h-4" />
                        <span className="font-mono text-[10px] text-neon-cyan">{best.gpu}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <img src={iconHardware} alt="CPU" className="w-4 h-4" />
                        <span className="font-mono text-[10px] text-neon-cyan">{best.cpu}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <img src={iconMonitor} alt="Monitor" className="w-4 h-4" />
                        <span className="font-mono text-[10px] text-neon-cyan">{best.monitor}</span>
                      </div>
                    </div>

                    {/* Zones preview */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      {club.zones.map((z) => {
                        const zone = zoneIcons[z];
                        if (!zone) return null;
                        return (
                          <div key={z} className="flex items-center gap-1">
                            <img src={zone.icon} alt={zone.label} className="w-4 h-4" />
                            <span className="font-mono text-[9px] text-muted-foreground">{zone.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Detail panel — right */}
            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-7">
              {!activeClub ? (
                <div className="bento-card hud-corner p-12 flex flex-col items-center justify-center min-h-[500px]">
                  <img src={iconMapPin} alt="Select" className="w-16 h-16 opacity-30 mb-4" />
                  <div className="font-mono text-sm text-muted-foreground text-center">
                    Выберите площадку из списка слева
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Club header */}
                  <div className="bento-card hud-corner p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-mono text-[10px] tracking-widest text-neon-cyan mb-1">// CLUB_PROFILE</div>
                        <h2 className="font-display text-2xl font-black text-foreground">{activeClub.name}</h2>
                        <div className="font-mono text-xs text-muted-foreground mt-1">
                          {activeClub.city} · {activeClub.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl font-black text-neon-green">{activeClub.rating.toFixed(1)}</div>
                        <div className="font-mono text-[9px] text-muted-foreground">{activeClub.reviews} оценок · {activeClub.ratingSource}</div>
                      </div>
                    </div>

                    {/* External links */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {activeClub.links.yandex && (
                        <a href={activeClub.links.yandex} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border font-mono text-[10px] tracking-wider text-muted-foreground hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors">
                          <ExternalLink className="w-3 h-3" /> ЯНДЕКС
                        </a>
                      )}
                      {activeClub.links.booking && (
                        <a href={activeClub.links.booking} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-neon-cyan bg-neon-cyan/10 font-mono text-[10px] tracking-wider text-neon-cyan hover:bg-neon-cyan/20 transition-colors neon-glow-cyan">
                          <ExternalLink className="w-3 h-3" /> БРОНЬ
                        </a>
                      )}
                      {activeClub.links.vk && (
                        <a href={activeClub.links.vk} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border font-mono text-[10px] tracking-wider text-muted-foreground hover:border-neon-purple/40 hover:text-neon-purple transition-colors">
                          <ExternalLink className="w-3 h-3" /> VK
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Equipment & Zones */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Equipment — best specs */}
                    <div className="bento-card hud-corner p-5">
                      <div className="font-mono text-[10px] tracking-widest text-neon-cyan mb-4">// ОБОРУДОВАНИЕ</div>
                      {(() => {
                        const best = getBestSpec(activeClub.halls);
                        return (
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 border border-border p-3 bg-muted/20">
                              <img src={iconGpu} alt="GPU" className="w-8 h-8" />
                              <div>
                                <div className="font-mono text-[9px] text-muted-foreground">GPU</div>
                                <div className="font-display text-sm font-bold text-foreground">{best.gpu}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 border border-border p-3 bg-muted/20">
                              <img src={iconHardware} alt="CPU" className="w-8 h-8" />
                              <div>
                                <div className="font-mono text-[9px] text-muted-foreground">ПРОЦЕССОР</div>
                                <div className="font-display text-sm font-bold text-foreground">{best.cpu}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 border border-border p-3 bg-muted/20">
                              <img src={iconMonitor} alt="Monitor" className="w-8 h-8" />
                              <div>
                                <div className="font-mono text-[9px] text-muted-foreground">МОНИТОРЫ</div>
                                <div className="font-display text-sm font-bold text-foreground">{best.monitor}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Zones */}
                    <div className="bento-card hud-corner p-5">
                      <div className="font-mono text-[10px] tracking-widest text-neon-purple mb-4">// ЗОНЫ И УСЛУГИ</div>
                      {activeClub.zones.length === 0 ? (
                        <div className="font-mono text-[10px] text-muted-foreground">Стандартный зал</div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {activeClub.zones.map((z) => {
                            const zone = zoneIcons[z];
                            if (!zone) return null;
                            return (
                              <div key={z} className="flex items-center gap-2 border border-border p-3 bg-muted/20 hover:border-primary/40 transition-colors">
                                <img src={zone.icon} alt={zone.label} className="w-7 h-7" />
                                <span className="font-mono text-[10px] text-foreground">{zone.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Halls */}
                  <div className="bento-card hud-corner p-5">
                    <div className="font-mono text-[10px] tracking-widest text-neon-green mb-4">// ЗАЛЫ</div>
                    <div className="space-y-3">
                      {activeClub.halls.map((hall) => (
                        <div key={hall.name} className="border border-border p-4 bg-muted/20 hover:border-neon-cyan/30 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-display text-sm font-bold text-foreground">{hall.name}</div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <div className="text-right">
                                <div className="font-mono text-[9px] text-muted-foreground">{hall.timeDay || "08:00–17:00"}</div>
                                <div className="font-display text-sm font-bold text-neon-green">{hall.priceDay} ₽/ч</div>
                              </div>
                              <div className="w-px h-8 bg-border" />
                              <div className="text-right">
                                <div className="font-mono text-[9px] text-muted-foreground">{hall.timeNight || "17:00–08:00"}</div>
                                <div className="font-display text-sm font-bold text-neon-cyan">{hall.priceNight} ₽/ч</div>
                              </div>
                              {hall.priceLate && (
                                <>
                                  <div className="w-px h-8 bg-border" />
                                  <div className="text-right">
                                    <div className="font-mono text-[9px] text-muted-foreground">{hall.timeLate}</div>
                                    <div className="font-display text-sm font-bold text-neon-purple">{hall.priceLate} ₽/ч</div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          {hall.gpu && (
                            <div className="flex items-center gap-4 flex-wrap">
                              <div className="flex items-center gap-1.5">
                                <img src={iconGpu} alt="GPU" className="w-4 h-4" />
                                <span className="font-mono text-[10px] text-neon-cyan">{hall.gpu}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <img src={iconHardware} alt="CPU" className="w-4 h-4" />
                                <span className="font-mono text-[10px] text-neon-cyan">{hall.cpu}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <img src={iconMonitor} alt="Monitor" className="w-4 h-4" />
                                <span className="font-mono text-[10px] text-neon-cyan">{hall.monitor}</span>
                              </div>
                            </div>
                          )}
                          {!hall.gpu && (
                            <div className="flex items-center gap-1.5">
                              <img src={iconConsole} alt="Console" className="w-4 h-4" />
                              <span className="font-mono text-[10px] text-neon-purple">PlayStation 5</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ratings breakdown */}
                  <div className="bento-card hud-corner p-5">
                    <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// ОЦЕНКИ ПОЛЬЗОВАТЕЛЕЙ</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {ratingIcons.map((r) => (
                        <div key={r.key} className="border border-border p-4 bg-muted/20 text-center hover:border-primary/40 transition-colors">
                          <img src={r.icon} alt={r.label} className="w-10 h-10 mx-auto mb-2" />
                          <div className="font-display text-lg font-black text-foreground">
                            {(activeClub.ratingDetails as Record<string, number>)[r.key]?.toFixed(1)}
                          </div>
                          <div className="font-mono text-[9px] text-muted-foreground mt-1">{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Bottom stats row */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "ПЛОЩАДОК В КРЫМУ", value: "3", color: "text-neon-cyan" },
              { label: "ЗАЛОВ", value: "13", color: "text-neon-green" },
              { label: "СРЕДНИЙ РЕЙТИНГ", value: "5.0 ★", color: "text-neon-green" },
              { label: "ДИСЦИПЛИН", value: "PC + PS5", color: "text-neon-magenta" },
            ].map((s) => (
              <div key={s.label} className="bento-card hud-corner p-5 text-center">
                <div className={`font-display text-2xl font-black ${s.color}`}>{s.value}</div>
                <div className="font-mono text-[9px] text-muted-foreground tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
