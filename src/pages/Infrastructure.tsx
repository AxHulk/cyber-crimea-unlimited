import { useState } from "react";
import { motion } from "framer-motion";
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
import iconStreaming from "@/assets/infrastructure/icon_streaming.png";
import iconAtmosphere from "@/assets/infrastructure/icon_atmosphere.png";
import iconCleanliness from "@/assets/infrastructure/icon_cleanliness.png";
import iconStaff from "@/assets/infrastructure/icon_staff.png";
import iconSeatFree from "@/assets/infrastructure/icon_seat_free.png";
import iconSeatOccupied from "@/assets/infrastructure/icon_seat_occupied.png";
import iconSeatReserved from "@/assets/infrastructure/icon_seat_reserved.png";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cities = ["Все", "Симферополь", "Севастополь", "Ялта", "Керчь", "Евпатория"];

const clubs = [
  {
    id: 1,
    name: "CyberHub Crimea",
    city: "Симферополь",
    address: "ул. Пушкина, 42",
    rating: 4.9,
    reviews: 127,
    status: "open",
    hours: "до 06:00",
    gpu: "RTX 4070 Ti",
    monitors: "360Hz",
    seats: { total: 60, free: 18, occupied: 35, reserved: 7 },
    zones: ["bootcamp", "vip", "streaming", "bar"],
    prices: { standard: 200, vip: 400, bootcamp: 1500 },
    ratingDetails: { hardware: 4.9, atmosphere: 4.8, cleanliness: 4.7, staff: 4.9 },
  },
  {
    id: 2,
    name: "GG Arena",
    city: "Севастополь",
    address: "пр. Нахимова, 15",
    rating: 4.7,
    reviews: 89,
    status: "open",
    hours: "до 02:00",
    gpu: "RTX 4060",
    monitors: "240Hz",
    seats: { total: 40, free: 12, occupied: 22, reserved: 6 },
    zones: ["vip", "bar", "console"],
    prices: { standard: 180, vip: 350 },
    ratingDetails: { hardware: 4.6, atmosphere: 4.8, cleanliness: 4.5, staff: 4.7 },
  },
  {
    id: 3,
    name: "Pixel Zone",
    city: "Ялта",
    address: "ул. Игнатенко, 8",
    rating: 4.5,
    reviews: 56,
    status: "open",
    hours: "до 00:00",
    gpu: "RTX 3060",
    monitors: "144Hz",
    seats: { total: 25, free: 8, occupied: 14, reserved: 3 },
    zones: ["console"],
    prices: { standard: 150 },
    ratingDetails: { hardware: 4.3, atmosphere: 4.6, cleanliness: 4.5, staff: 4.4 },
  },
  {
    id: 4,
    name: "Frag Factory",
    city: "Керчь",
    address: "ул. Ленина, 72",
    rating: 4.3,
    reviews: 34,
    status: "closed",
    hours: "с 12:00",
    gpu: "RTX 3060 Ti",
    monitors: "165Hz",
    seats: { total: 20, free: 0, occupied: 0, reserved: 0 },
    zones: [],
    prices: { standard: 130 },
    ratingDetails: { hardware: 4.2, atmosphere: 4.4, cleanliness: 4.3, staff: 4.2 },
  },
  {
    id: 5,
    name: "NeonPlay",
    city: "Евпатория",
    address: "ул. Фрунзе, 31",
    rating: 4.6,
    reviews: 44,
    status: "open",
    hours: "до 04:00",
    gpu: "RTX 4060 Ti",
    monitors: "240Hz",
    seats: { total: 30, free: 5, occupied: 20, reserved: 5 },
    zones: ["bootcamp", "streaming"],
    prices: { standard: 170, bootcamp: 1200 },
    ratingDetails: { hardware: 4.5, atmosphere: 4.7, cleanliness: 4.6, staff: 4.5 },
  },
];

const zoneIcons: Record<string, { icon: string; label: string }> = {
  bootcamp: { icon: iconBootcamp, label: "Буткемп" },
  vip: { icon: iconVip, label: "VIP" },
  streaming: { icon: iconStreaming, label: "Стрим-зона" },
  bar: { icon: iconBar, label: "Бар" },
  console: { icon: iconConsole, label: "Консоли" },
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
              ИНФРАСТРУКТУРА <span className="text-neon-cyan">//</span> КРЫМ
            </h1>
            <p className="font-mono text-sm text-muted-foreground max-w-2xl mx-auto">
              Каталог киберспортивных площадок Крыма. Оборудование, бронирование, рейтинги — всё в одном месте.
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
              {filtered.map((club) => (
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
                    <span className="font-mono text-[9px] text-muted-foreground">{club.reviews} отзывов</span>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <img src={iconGpu} alt="GPU" className="w-4 h-4" />
                      <span className="font-mono text-[10px] text-neon-cyan">{club.gpu}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <img src={iconMonitor} alt="Monitor" className="w-4 h-4" />
                      <span className="font-mono text-[10px] text-neon-cyan">{club.monitors}</span>
                    </div>
                  </div>

                  {/* Seat indicators */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <img src={iconSeatFree} alt="Free" className="w-4 h-4" />
                      <span className="font-mono text-[10px] text-neon-green">{club.seats.free}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={iconSeatOccupied} alt="Occupied" className="w-4 h-4" />
                      <span className="font-mono text-[10px] text-destructive">{club.seats.occupied}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={iconSeatReserved} alt="Reserved" className="w-4 h-4" />
                      <span className="font-mono text-[10px] text-yellow-400">{club.seats.reserved}</span>
                    </div>
                    <span className="font-mono text-[9px] text-muted-foreground ml-auto">
                      {club.seats.total} мест
                    </span>
                  </div>
                </motion.div>
              ))}
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
                        <div className="font-display text-2xl font-black text-neon-green">{activeClub.rating}</div>
                        <div className="font-mono text-[9px] text-muted-foreground">{activeClub.reviews} отзывов</div>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 border font-mono text-[10px] tracking-wider ${
                      activeClub.status === "open"
                        ? "border-neon-green/40 text-neon-green bg-neon-green/5"
                        : "border-destructive/40 text-destructive bg-destructive/5"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        activeClub.status === "open" ? "bg-neon-green animate-pulse" : "bg-destructive"
                      }`} />
                      {activeClub.status === "open" ? `ОТКРЫТО ${activeClub.hours}` : `ЗАКРЫТО · ОТКР. ${activeClub.hours}`}
                    </div>
                  </div>

                  {/* Equipment & Zones */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Equipment */}
                    <div className="bento-card hud-corner p-5">
                      <div className="font-mono text-[10px] tracking-widest text-neon-cyan mb-4">// ОБОРУДОВАНИЕ</div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 border border-border p-3 bg-muted/20">
                          <img src={iconGpu} alt="GPU" className="w-8 h-8" />
                          <div>
                            <div className="font-mono text-[9px] text-muted-foreground">GPU</div>
                            <div className="font-display text-sm font-bold text-foreground">{activeClub.gpu}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border border-border p-3 bg-muted/20">
                          <img src={iconMonitor} alt="Monitor" className="w-8 h-8" />
                          <div>
                            <div className="font-mono text-[9px] text-muted-foreground">МОНИТОРЫ</div>
                            <div className="font-display text-sm font-bold text-foreground">{activeClub.monitors}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border border-border p-3 bg-muted/20">
                          <img src={iconHardware} alt="Hardware" className="w-8 h-8" />
                          <div>
                            <div className="font-mono text-[9px] text-muted-foreground">ПЕРИФЕРИЯ</div>
                            <div className="font-display text-sm font-bold text-foreground">Pro Gaming</div>
                          </div>
                        </div>
                      </div>
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

                  {/* Seat map + Pricing */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Seat availability */}
                    <div className="bento-card hud-corner p-5">
                      <div className="font-mono text-[10px] tracking-widest text-neon-green mb-4">// ЗАГРУЗКА ЗАЛА</div>

                      {/* Visual seat grid */}
                      <div className="grid grid-cols-10 gap-1 mb-4">
                        {Array.from({ length: activeClub.seats.total }).map((_, i) => {
                          let color = "bg-neon-green/60 border-neon-green/30";
                          if (i < activeClub.seats.occupied) color = "bg-destructive/60 border-destructive/30";
                          else if (i < activeClub.seats.occupied + activeClub.seats.reserved) color = "bg-yellow-400/60 border-yellow-400/30";
                          return (
                            <div key={i} className={`w-full aspect-square border ${color} rounded-[1px]`} />
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <img src={iconSeatFree} alt="Free" className="w-5 h-5" />
                            <span className="font-mono text-[10px] text-neon-green">{activeClub.seats.free}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={iconSeatOccupied} alt="Occ" className="w-5 h-5" />
                            <span className="font-mono text-[10px] text-destructive">{activeClub.seats.occupied}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={iconSeatReserved} alt="Res" className="w-5 h-5" />
                            <span className="font-mono text-[10px] text-yellow-400">{activeClub.seats.reserved}</span>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] text-muted-foreground">{activeClub.seats.total} мест</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bento-card hud-corner p-5">
                      <div className="font-mono text-[10px] tracking-widest text-neon-magenta mb-4">// ПРАЙС-ЛИСТ</div>
                      <div className="space-y-2">
                        {activeClub.prices.standard && (
                          <div className="flex items-center justify-between border border-border p-3 bg-muted/20">
                            <span className="font-mono text-[10px] text-foreground">Стандарт</span>
                            <span className="font-display text-sm font-bold text-foreground">{activeClub.prices.standard} ₽/ч</span>
                          </div>
                        )}
                        {activeClub.prices.vip && (
                          <div className="flex items-center justify-between border border-border p-3 bg-muted/20">
                            <span className="font-mono text-[10px] text-foreground">VIP-зал</span>
                            <span className="font-display text-sm font-bold text-foreground">{activeClub.prices.vip} ₽/ч</span>
                          </div>
                        )}
                        {activeClub.prices.bootcamp && (
                          <div className="flex items-center justify-between border border-border p-3 bg-muted/20">
                            <span className="font-mono text-[10px] text-foreground">Буткемп (5 мест)</span>
                            <span className="font-display text-sm font-bold text-foreground">{activeClub.prices.bootcamp} ₽/ч</span>
                          </div>
                        )}
                      </div>

                      <button className="w-full mt-4 border-2 border-neon-cyan bg-neon-cyan/10 px-4 py-3 font-display text-sm tracking-wider text-neon-cyan hover:bg-neon-cyan/20 transition-colors neon-glow-cyan">
                        ЗАБРОНИРОВАТЬ МЕСТО
                      </button>
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
              { label: "ПЛОЩАДОК В КРЫМУ", value: "12", color: "text-neon-cyan" },
              { label: "ИГРОВЫХ МЕСТ", value: "480+", color: "text-neon-green" },
              { label: "СРЕДНИЙ РЕЙТИНГ", value: "4.6 ★", color: "text-neon-green" },
              { label: "БРОНИРОВАНИЙ / МЕС", value: "2,340", color: "text-neon-magenta" },
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
