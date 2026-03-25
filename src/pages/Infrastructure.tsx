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
import iconStreaming from "@/assets/infrastructure/icon_streaming.png";
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

const cities = ["Все", "Симферополь", "Севастополь", "Ялта", "Керчь", "Евпатория", "Феодосия", "Первомайское", "Белогорск", "Джанкой"];

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
  {
    id: 4,
    name: "Cherema",
    city: "Симферополь",
    address: "Ростовская улица, 19Б",
    rating: 5.0,
    reviews: 196,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Стандарт (15 мест)", gpu: "RTX 4060", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 120, priceNight: 150, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "VIP (10 мест) / DUO VIP (2 места)", gpu: "RTX 4070", cpu: "i5-12400F", monitor: "300 Hz", priceDay: 150, priceNight: 180, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
    ],
    links: {
      yandex: "https://yandex.com/profile/164422127547",
      booking: "https://vk.com/@cherema_cyber-bronirovanie",
      vk: "https://vk.com/cherema_cyber",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 5,
    name: "Rampage Arena 60 лет",
    city: "Симферополь",
    address: "улица 60 лет Октября 22, этаж 2",
    rating: 5.0,
    reviews: 106,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Стандарт", gpu: "RTX 2060", cpu: "i5-9400F", monitor: "144 Hz", priceDay: 100, priceNight: 120, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "VIP", gpu: "RTX 3060 TI", cpu: "i5-11400F", monitor: "144 Hz", priceDay: 150, priceNight: 170, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "PS4", priceDay: 200, priceNight: 200, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "PS5", priceDay: 300, priceNight: 300, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/182651780159",
      booking: "https://wa.me/79782580848",
      vk: "https://vk.com/rampage60let",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 6,
    name: "Rampage Arena Кечкеметская",
    city: "Симферополь",
    address: "Кечкеметская улица, 190А, этаж 2",
    rating: 4.9,
    reviews: 74,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip"],
    halls: [
      { name: "Стандарт", gpu: "RTX 3060 TI", cpu: "i5-11400F", monitor: "144 Hz", priceDay: 100, priceNight: 120, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "VIP", gpu: "RTX 4070", cpu: "i7-14700F", monitor: "144 Hz", priceDay: 150, priceNight: 170, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/88108575552",
      booking: "https://t.me/+79786483830",
      vk: "https://vk.com/rampage_borodina",
    },
    ratingDetails: { hardware: 4.9, atmosphere: 4.9, cleanliness: 4.9, staff: 4.9 },
  },
  {
    id: 7,
    name: "Мантикора Москольцо",
    city: "Симферополь",
    address: "Киевская улица, 100А, этаж 2",
    rating: 5.0,
    reviews: 205,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Standart", gpu: "nVidia 3080 Super", cpu: "i5-10400F", monitor: "240 Hz", priceDay: 100, priceNight: 100, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "PRO", gpu: "nVidia 4070", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 125, priceNight: 125, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "VIP", gpu: "nVidia 4070", cpu: "i5-12600KF", monitor: "240 Hz", priceDay: 150, priceNight: 150, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "PS Standart", priceDay: 250, priceNight: 250, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "PS PRO", priceDay: 400, priceNight: 400, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
    ],
    links: {
      yandex: "https://yandex.com/profile/156722418943",
      booking: "https://t.me/manticore_Cyber",
      vk: "https://vk.com/manticore_cyber",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 8,
    name: "Мантикора Беспалова",
    city: "Симферополь",
    address: "ул. Беспалова, 110Н, этаж 1",
    rating: 5.0,
    reviews: 100,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Standart", gpu: "nVidia 3080 Super", cpu: "i5-10400F", monitor: "240 Hz", priceDay: 100, priceNight: 100, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "PRO", gpu: "nVidia 4070", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 125, priceNight: 125, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "VIP", gpu: "nVidia 4070", cpu: "i5-12600KF", monitor: "240 Hz", priceDay: 150, priceNight: 150, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "PS Standart", priceDay: 250, priceNight: 250, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
      { name: "PS PRO", priceDay: 400, priceNight: 400, timeDay: "Круглосуточно", timeNight: "Круглосуточно" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/93325863259",
      booking: "https://t.me/manticore_Cyber",
      vk: "https://vk.com/manticore_cyber",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 9,
    name: "Кибер Медведь",
    city: "Симферополь",
    address: "Парковая улица, 1к2, Белоглинка, этаж 1",
    rating: 5.0,
    reviews: 113,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Standart", gpu: "RTX 4070", cpu: "i5-13400F", monitor: "180 Hz", priceDay: 130, priceNight: 130, timeDay: "Круглосуточно", timeNight: "" },
      { name: "VIP", gpu: "RTX 4070 Super", cpu: "i5-13500F", monitor: "240 Hz", priceDay: 150, priceNight: 150, timeDay: "Круглосуточно", timeNight: "" },
      { name: "PS 5", priceDay: 300, priceNight: 300, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/135661946144",
      booking: "tel:+79790073404",
      vk: "https://vk.com/cyberbeargres_82",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 10,
    name: "Полигон",
    city: "Севастополь",
    address: "просп. Юрия Гагарина, 8, этаж 3",
    rating: 5.0,
    reviews: 310,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["bootcamp", "vip", "bar", "console", "streamer"],
    halls: [
      { name: "Standart", gpu: "RTX 3060 Ti", cpu: "Ryzen 5 5600", monitor: "240 Hz", priceDay: 140, priceNight: 140, timeDay: "Круглосуточно", timeNight: "" },
      { name: "Twin", gpu: "RTX 3060 12 Gb", cpu: "Ryzen 5 5600X", monitor: "280 Hz", priceDay: 160, priceNight: 160, timeDay: "Круглосуточно", timeNight: "" },
      { name: "VIP", gpu: "RTX 3070 Ti", cpu: "Ryzen 7 5700X3D", monitor: "300 Hz", priceDay: 180, priceNight: 180, timeDay: "Круглосуточно", timeNight: "" },
      { name: "Premium", gpu: "RTX 3080 Ti", cpu: "i5-14600KF", monitor: "390 Hz", priceDay: 210, priceNight: 210, timeDay: "Круглосуточно", timeNight: "" },
      { name: "Stream", gpu: "RTX 4060 Ti", cpu: "i5-12490F", monitor: "280 Hz", priceDay: 250, priceNight: 250, timeDay: "Круглосуточно", timeNight: "" },
      { name: "PS 5 VIP", priceDay: 350, priceNight: 350, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/162239332806",
      booking: "https://poligonarena.ru/",
      vk: "https://vk.com/arenapoligon",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 11,
    name: "CyberX",
    city: "Севастополь",
    address: "ул. Генерала Хрюкина, 6",
    rating: 5.0,
    reviews: 91,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console", "bar"],
    halls: [
      { name: "Standart", gpu: "RTX 3060", cpu: "i5-12400F", monitor: "144 Hz", priceDay: 130, priceNight: 150, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "VIP Zone", gpu: "RTX 4070 Super", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 170, priceNight: 190, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "Super VIP", gpu: "RTX 5060 Ti", cpu: "AMD Ryzen 5 7500F", monitor: "240 Hz", priceDay: 230, priceNight: 250, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "TRIO Zone", gpu: "RTX 4070 Super", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 250, priceNight: 270, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "DUO Zone", gpu: "RTX 4070 Super", cpu: "i5-13400F", monitor: "240 Hz", priceDay: 290, priceNight: 310, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "Solo Zone", gpu: "RTX 5080", cpu: "i5-14700F", monitor: "360 Hz", priceDay: 330, priceNight: 350, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "PS 5 Standart", priceDay: 350, priceNight: 400, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "PS 5 VIP", priceDay: 400, priceNight: 450, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/68287539046",
      booking: "https://t.me/cyberx_sev",
      vk: "https://vk.com/cyberx_sev",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 12,
    name: "CyberX Очаковцев",
    city: "Севастополь",
    address: "ул. Очаковцев, 52",
    rating: 5.0,
    reviews: 75,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Standart", gpu: "RTX 4060", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 140, priceNight: 160, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "VIP Zone", gpu: "RTX 5070 Super", cpu: "i5-14600KF", monitor: "240 Hz", priceDay: 170, priceNight: 190, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "TRIO Zone", gpu: "RTX 5070", cpu: "i5-14600KF", monitor: "240 Hz", priceDay: 220, priceNight: 240, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "DUO Zone", gpu: "RTX 5070", cpu: "i5-14600KF", monitor: "240 Hz", priceDay: 240, priceNight: 260, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "TV Zone (PS 5)", priceDay: 300, priceNight: 300, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/36441415799",
      booking: "https://t.me/cyberxsev",
      vk: "https://vk.com/club233554288",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 13,
    name: "Coliseum",
    city: "Ялта",
    address: "Московская ул., 21",
    rating: 5.0,
    reviews: 262,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip"],
    halls: [
      { name: "Standart", gpu: "RTX 4060 Ti", cpu: "i5-13400F", monitor: "280 Hz", priceDay: 160, priceNight: 185, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "Standart-VIP", gpu: "RTX 4060 Ti", cpu: "i5-13400F", monitor: "240 Hz", priceDay: 180, priceNight: 205, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/141034667611",
      booking: "https://colizeumarena.com/blog/club/coliseum-yalta/",
      vk: "https://vk.com/coliseum_yalta",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 14,
    name: "CyberX",
    city: "Ялта",
    address: "ул. Гоголя, 20",
    rating: 4.8,
    reviews: 153,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Standart", gpu: "RTX 2060", cpu: "i5-10400F", monitor: "144 Hz", priceDay: 150, priceNight: 175, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "Комфорт", gpu: "RTX 3060", cpu: "i5-11400F", monitor: "240 Hz", priceDay: 175, priceNight: 225, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "VIP Zone", gpu: "RTX 5070 Ti", cpu: "Ryzen 7 7700", monitor: "240 Hz", priceDay: 300, priceNight: 300, timeDay: "Круглосуточно", timeNight: "" },
      { name: "TV Zone (PS 5) 55″", priceDay: 350, priceNight: 350, timeDay: "Круглосуточно", timeNight: "" },
      { name: "TV Zone (PS 5) 75″", priceDay: 400, priceNight: 400, timeDay: "Круглосуточно", timeNight: "" },
      { name: "TV Zone (PS 5) 85″", priceDay: 500, priceNight: 500, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/101184159887",
      booking: "https://kiberklub-cyber-x.clients.site/",
      vk: "https://vk.com/cyberx_yalta",
    },
    ratingDetails: { hardware: 4.8, atmosphere: 4.8, cleanliness: 4.8, staff: 4.8 },
  },
  {
    id: 15,
    name: "Offline",
    city: "Керчь",
    address: "Вокзальное ш., 44А",
    rating: 5.0,
    reviews: 86,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console", "streamer"],
    halls: [
      { name: "Standart", gpu: "RTX 2060 Super", cpu: "i5-9400F", monitor: "144 Hz", priceDay: 140, priceNight: 140, timeDay: "Круглосуточно", timeNight: "" },
      { name: "Bootcamp", gpu: "RTX 2060 Super", cpu: "i5-9400F", monitor: "144 Hz", priceDay: 160, priceNight: 160, timeDay: "Круглосуточно", timeNight: "" },
      { name: "VIP X1", gpu: "RTX 2060 Super", cpu: "i5-9400F", monitor: "144 Hz", priceDay: 200, priceNight: 200, timeDay: "Круглосуточно", timeNight: "" },
      { name: "Stream", gpu: "RTX 2060 Super", cpu: "i5-9400F", monitor: "144 Hz", priceDay: 250, priceNight: 250, timeDay: "Круглосуточно", timeNight: "" },
      { name: "Зона ТВ (PS 5)", priceDay: 300, priceNight: 300, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/145295732718",
      booking: "https://kompjuternyj-klub-offline.clients.site/",
      vk: "https://vk.com/cyberoffline",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 16,
    name: "CyberX",
    city: "Евпатория",
    address: "Интернациональная ул., 130 лит1А, этаж цокольный",
    rating: 5.0,
    reviews: 139,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "bar", "console"],
    halls: [
      { name: "Standart 4060", gpu: "RTX 4060", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 130, priceNight: 150, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "Bootcamp 4060", gpu: "RTX 4060", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 150, priceNight: 170, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "TRIO 5070", gpu: "RTX 5070", cpu: "i5-14400F", monitor: "240 Hz", priceDay: 180, priceNight: 200, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "DUO Zone", gpu: "RTX 5070", cpu: "i5-14400F", monitor: "240 Hz", priceDay: 210, priceNight: 230, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "Solo Zone", gpu: "RTX 5070 TI", cpu: "AMD Ryzen 7 7700", monitor: "180 Hz", priceDay: 250, priceNight: 270, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "TV Zone (PS 5) Standart", priceDay: 300, priceNight: 300, timeDay: "Круглосуточно", timeNight: "" },
      { name: "TV Zone (PS 5) VIP", priceDay: 350, priceNight: 350, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.com/profile/94637006623",
      booking: "https://cyberxcommunity.ru/kluby/rossiya/evpatoriya/internaczionalnaya.html",
      vk: "https://vk.com/cyberx_evp",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 17,
    name: "Colizeum",
    city: "Феодосия",
    address: "Боевая ул., 14А",
    rating: 5.0,
    reviews: 74,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "bar", "console"],
    halls: [
      { name: "Стандарт", gpu: "RTX 3060", cpu: "i5-10400F", monitor: "165 Hz", priceDay: 105, priceNight: 125, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "Стандарт-PRO", gpu: "RTX 4060 TI", cpu: "i5-13400F", monitor: "280 Hz", priceDay: 125, priceNight: 125, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "Буткемп-VIP", gpu: "RTX 5070 TI", cpu: "i7-14700F", monitor: "280 Hz", priceDay: 140, priceNight: 160, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "Буткемп-PRO", gpu: "RTX 4070 TI", cpu: "i5-13400F", monitor: "280 Hz", priceDay: 160, priceNight: 180, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "Буткемп-Premium", gpu: "RTX 4090", cpu: "i9-13900F", monitor: "360 Hz", priceDay: 270, priceNight: 290, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "TV Zone (PS 5) 65″", priceDay: 200, priceNight: 280, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/143430377605",
      booking: "https://coliseum-kafa.clients.site/",
      vk: "https://vk.com/coliseumfeo",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 18,
    name: "Rampage Arena",
    city: "Феодосия",
    address: "бул. Старшинова, 12Р",
    rating: 4.8,
    reviews: 71,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Стандарт", gpu: "RTX 3060 Ti", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 100, priceNight: 120, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "VIP", gpu: "RTX 4070 Ti", cpu: "i7-12700KF", monitor: "280 Hz", priceDay: 150, priceNight: 170, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "DUO", gpu: "RTX 4070 Super", cpu: "i5-14600KF", monitor: "360 Hz", priceDay: 200, priceNight: 240, timeDay: "08:00–17:00", timeNight: "17:00–08:00" },
      { name: "PS 5", priceDay: 300, priceNight: 300, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/48824367382",
      booking: "https://t.me/+79787191818",
      vk: "https://vk.com/rampage_feo",
    },
    ratingDetails: { hardware: 4.8, atmosphere: 4.8, cleanliness: 4.8, staff: 4.8 },
  },
  {
    id: 19,
    name: "Сириус",
    city: "Первомайское",
    address: "ул. Гагарина, 11",
    rating: 5.0,
    reviews: 32,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Standart", gpu: "RTX 2060 Super", cpu: "i5-13400F", monitor: "144 Hz", priceDay: 70, priceNight: 70, timeDay: "Круглосуточно", timeNight: "" },
      { name: "PlayStation 4", priceDay: 150, priceNight: 150, timeDay: "Круглосуточно", timeNight: "" },
      { name: "PlayStation 5", priceDay: 250, priceNight: 250, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/194923375179",
      booking: "https://t.me/siriuscyberclub",
      vk: "https://vk.com/siriuscyberclub",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
  {
    id: 20,
    name: "Rampage Arena",
    city: "Белогорск",
    address: "ул. Луначарского, 38",
    rating: 4.6,
    reviews: 67,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "console"],
    halls: [
      { name: "Стандарт", gpu: "RTX 4060", cpu: "i5-12400F", monitor: "240 Hz", priceDay: 100, priceNight: 100, timeDay: "Круглосуточно", timeNight: "" },
      { name: "VIP", gpu: "RTX 4070 Ti", cpu: "i7-12700KF", monitor: "240 Hz", priceDay: 150, priceNight: 150, timeDay: "Круглосуточно", timeNight: "" },
      { name: "PS 5", priceDay: 300, priceNight: 300, timeDay: "Круглосуточно", timeNight: "" },
    ],
    links: {
      yandex: "https://yandex.ru/profile/32713143434",
      booking: "https://t.me/rampagearena",
      vk: "https://vk.com/rampage_bgk",
    },
    ratingDetails: { hardware: 4.6, atmosphere: 4.6, cleanliness: 4.6, staff: 4.6 },
  },
  {
    id: 21,
    name: "True Gamers",
    city: "Джанкой",
    address: "ул. Толстого, 30Б",
    rating: 5.0,
    reviews: 58,
    ratingSource: "Яндекс",
    status: "open",
    hours: "24/7",
    zones: ["vip", "bar", "console"],
    halls: [
      { name: "Normal", gpu: "RTX 3060 Ti", cpu: "i5-12400F", monitor: "144 Hz", priceDay: 130, priceNight: 140, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "Bootcamp", gpu: "RTX 4060 Ti", cpu: "i5-12600KF", monitor: "170 Hz", priceDay: 150, priceNight: 160, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
      { name: "PS 5", priceDay: 300, priceNight: 350, timeDay: "Пн–Чт", timeNight: "Пт–Вс" },
    ],
    links: {
      yandex: "https://yandex.com/profile/25180462380",
      booking: "https://t.me/truegamersdzhankoy",
      vk: "https://vk.com/truegamers_djankoy",
    },
    ratingDetails: { hardware: 5.0, atmosphere: 5.0, cleanliness: 5.0, staff: 5.0 },
  },
];

const zoneIcons: Record<string, { icon: string; label: string }> = {
  bootcamp: { icon: iconBootcamp, label: "Буткемп" },
  vip: { icon: iconVip, label: "VIP" },
  bar: { icon: iconBar, label: "Бар" },
  console: { icon: iconConsole, label: "Приставки" },
  streamer: { icon: iconStreaming, label: "Стримерская" },
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
                              <span className="font-mono text-[10px] text-neon-purple">{hall.name.toLowerCase().includes("ps4") ? "PlayStation 4" : "PlayStation 5"}</span>
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
{ label: "ПЛОЩАДОК В КРЫМУ", value: "21", color: "text-neon-cyan" },
              { label: "ЗАЛОВ", value: "92", color: "text-neon-green" },
              { label: "СРЕДНИЙ РЕЙТИНГ", value: "4.97 ★", color: "text-neon-green" },
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
