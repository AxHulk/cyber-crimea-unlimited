import cs2Final01 from "@/assets/gallery/cs2-final-01.jpg";
import cs2Final02 from "@/assets/gallery/cs2-final-02.jpg";
import cs2Final03 from "@/assets/gallery/cs2-final-03.jpg";
import cs2Final04 from "@/assets/gallery/cs2-final-04.jpg";
import cs2Final05 from "@/assets/gallery/cs2-final-05.jpg";
import cs2Final06 from "@/assets/gallery/cs2-final-06.jpg";
import cs2Final07 from "@/assets/gallery/cs2-final-07.jpg";
import cs2Final08 from "@/assets/gallery/cs2-final-08.jpg";
import cs2Final09 from "@/assets/gallery/cs2-final-09.jpg";
import cs2Final10 from "@/assets/gallery/cs2-final-10.jpg";
import cs2Final11 from "@/assets/gallery/cs2-final-11.jpg";
import cs2Final12 from "@/assets/gallery/cs2-final-12.jpg";
import cs2Final13 from "@/assets/gallery/cs2-final-13.jpg";
import cs2Final14 from "@/assets/gallery/cs2-final-14.jpg";
import cs2Final15 from "@/assets/gallery/cs2-final-15.jpg";
import cs2Final16 from "@/assets/gallery/cs2-final-16.jpg";
import cs2Final17 from "@/assets/gallery/cs2-final-17.jpg";
import cs2Final18 from "@/assets/gallery/cs2-final-18.jpg";
import cs2Final19 from "@/assets/gallery/cs2-final-19.jpg";
import dota2Final01 from "@/assets/gallery/dota2-final-01.jpg";
import dota2Final02 from "@/assets/gallery/dota2-final-02.jpg";
import dota2Final03 from "@/assets/gallery/dota2-final-03.jpg";
import dota2Final04 from "@/assets/gallery/dota2-final-04.jpg";
import dota2Final05 from "@/assets/gallery/dota2-final-05.jpg";
import dota2Final06 from "@/assets/gallery/dota2-final-06.jpg";
import dota2Final07 from "@/assets/gallery/dota2-final-07.jpg";
import dota2Final08 from "@/assets/gallery/dota2-final-08.jpg";
import dota2Final09 from "@/assets/gallery/dota2-final-09.jpg";
import dota2Final10 from "@/assets/gallery/dota2-final-10.jpg";
import dota2Final11 from "@/assets/gallery/dota2-final-11.jpg";
import dota2Final12 from "@/assets/gallery/dota2-final-12.jpg";
import dota2Final13 from "@/assets/gallery/dota2-final-13.jpg";
import dota2Final14 from "@/assets/gallery/dota2-final-14.jpg";

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  photos: { src: string; alt: string }[];
};

export const galleries: GalleryItem[] = [
  {
    id: "cs2-cyberleague-2024",
    title: "Киберлига Крыма 2024 — Финал по CS2",
    description: "Подборка лучших фото с офлайн-финала Киберлиги Крыма 2024 по CS2. Атмосфера турнира, игроки за компьютерами и церемония награждения.",
    date: "16 декабря 2024",
    photos: [
      { src: cs2Final01, alt: "Команда-победитель Coldhands с кубком Киберлиги 2024" },
      { src: cs2Final02, alt: "Игрок за компьютером на турнире" },
      { src: cs2Final03, alt: "Команда Coldhands на сцене" },
      { src: cs2Final04, alt: "Кулачный удар игроков — командный дух" },
      { src: cs2Final05, alt: "Игрок CS2 за монитором на LAN-турнире" },
      { src: cs2Final06, alt: "Команда играет на турнире — вид сбоку" },
      { src: cs2Final07, alt: "Игрок с гарнитурой — сосредоточение" },
      { src: cs2Final08, alt: "Болельщица Киберлиги Крыма" },
      { src: cs2Final09, alt: "Команда Coldhands в зрительном зале" },
      { src: cs2Final10, alt: "Молодой игрок за компьютером" },
      { src: cs2Final11, alt: "Игрок Perekop Team в наушниках HyperX" },
      { src: cs2Final12, alt: "Игрок YIKC за монитором" },
      { src: cs2Final13, alt: "Крупный план формы MALOV TEAM" },
      { src: cs2Final14, alt: "Сцена турнира — вид из зала с мониторами команд" },
      { src: cs2Final15, alt: "Игрок команды в форме YIKC за компьютером" },
      { src: cs2Final16, alt: "Игрок BOSS оборачивается к камере во время матча" },
      { src: cs2Final17, alt: "Обсуждение игроков во время матча на сцене" },
      { src: cs2Final18, alt: "Эмоциональный момент — объятия после игры" },
      { src: cs2Final19, alt: "Игрок Breakout Team крупным планом за компьютером" },
    ],
  },
  {
    id: "dota2-cyberleague-2024",
    title: "Киберлига Крыма 2024 — Финал по Dota2",
    description: "Подборка лучших фото с офлайн-финала Киберлиги Крыма 2024 по Dota2. Первая часть фотоархива.",
    date: "16 декабря 2024",
    photos: [
      { src: dota2Final01, alt: "Игроки за компьютерами на офлайн-финале Dota2" },
      { src: dota2Final02, alt: "Главная сцена Киберлиги Крыма 2024" },
      { src: dota2Final03, alt: "Подготовка команды Rampage Arena перед матчем" },
      { src: dota2Final04, alt: "Состав команды за игровыми местами" },
      { src: dota2Final05, alt: "Игрок на сцене во время матча" },
      { src: dota2Final06, alt: "Участники у компьютеров перед стартом" },
      { src: dota2Final07, alt: "Крупный план игрока на офлайн-турнире" },
      { src: dota2Final08, alt: "Игрок в красной худи за компьютером" },
      { src: dota2Final09, alt: "Ряд игроков Dota2 во время матча" },
      { src: dota2Final10, alt: "Игровая сцена с брендингом Киберлиги Крыма" },
      { src: dota2Final11, alt: "Трофей Киберлиги Крыма крупным планом" },
      { src: dota2Final12, alt: "Игрок в наушниках на фоне зрительного зала" },
      { src: dota2Final13, alt: "Командный момент у одного монитора" },
      { src: dota2Final14, alt: "Подготовка участников на сцене перед матчем" },
    ],
  },
];
