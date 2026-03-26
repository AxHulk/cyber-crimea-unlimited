export type CategoryKey = "all" | "news" | "results" | "updates" | "interview" | "guides" | "gallery";

export type FeedItem = {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryKey;
  type: string;
  stat: string;
  accent: string;
  date?: string;
  videoUrl?: string;
  /** iframe-ready embed URL (VK/YouTube/Twitch) */
  embedUrl?: string;
  details?: string[];
  externalLink?: { label: string; url: string };
};

export const feed: FeedItem[] = [
  {
    id: "n1",
    title: "Киберлига Крыма 2024 по Dota 2: Rampage Arena — чемпионы!",
    excerpt: "Rampage Arena одержали уверенную победу со счётом 2-0 в гранд-финале, обойдя 36 участников турнира. Серебро у ZVери (1-1), бронза — Telko и Karen team.",
    category: "results",
    type: "Итоги турнира",
    stat: "16 декабря 2024",
    accent: "text-primary",
    date: "16 декабря 2024",
    videoUrl: "https://vkvideo.ru/video-126368111_456239394",
    embedUrl: "https://vk.com/video_ext.php?oid=-126368111&id=456239394&hd=2",
    details: [
      "🏆 1 место — Rampage Arena (2-0): not a human, Varashkin, Seyeze, Rain, Воровская Лапа",
      "🥈 2 место — ZVери (1-1)",
      "🥉 3 место — Telko (0-1), Karen team (0-1)",
      "👥 36 участников · Формат: групповой этап → Single Elimination",
      "📅 Старт турнира: 28 ноября 2024",
    ],
    externalLink: { label: "СЕТКА НА CHALLONGE", url: "https://challonge.com/ru/h31zui3f" },
  },
  {
    id: "n7",
    title: "Киберлига Крыма 2024 по CS 2: Coldhands забирают титул!",
    excerpt: "Команда Coldhands уверенно прошла плей-офф со счётом 2-0 в гранд-финале, опередив 44 участника турнира. Серебро у MVP Cyber Team (1-1), бронза — MVP Junior и Perekop.",
    category: "results",
    type: "Итоги турнира",
    stat: "16 декабря 2024",
    accent: "text-primary",
    date: "16 декабря 2024",
    videoUrl: "https://vkvideo.ru/video-126368111_456239393",
    embedUrl: "https://vk.com/video_ext.php?oid=-126368111&id=456239393&hd=2",
    details: [
      "🏆 1 место — Coldhands (2-0): K4nfuz, D3m3nt3d, k1nco-, 2urist, Luc1k",
      "🥈 2 место — MVP Cyber Team (1-1)",
      "🥉 3 место — MVP Junior (0-1), Perekop (0-1)",
      "👥 44 участника · Формат: групповой этап (8 групп) → Single Elimination",
      "📅 Старт турнира: 28 ноября 2024",
    ],
    externalLink: { label: "СЕТКА НА CHALLONGE", url: "https://challonge.com/ru/srb79kwv" },
  },

    title: "Новости ФКС: утверждён календарь летнего сезона",
    excerpt: "Новые даты региональных квалификаций и формат очного финала.",
    category: "news",
    type: "Новости",
    stat: "3.1K просмотров",
    accent: "text-neon-cyan",
  },
  {
    id: "n3",
    title: "Патч Valorant 9.2: что меняется в мете Крыма",
    excerpt: "Ключевые изменения агентов и оружия в соревновательных матчах.",
    category: "updates",
    type: "Обновления",
    stat: "2.6K просмотров",
    accent: "text-neon-green",
  },
  {
    id: "n4",
    title: "Интервью: капитан Crimea Wolves о подготовке к финалу",
    excerpt: "Режим тренировок, работа с аналитиком и психологией команды.",
    category: "interview",
    type: "Интервью",
    stat: "4.7K просмотров",
    accent: "text-neon-purple",
  },
  {
    id: "n5",
    title: "Гайд: как закрывать Mirage за CT в региональной мете",
    excerpt: "Пошаговый тактический разбор от локальных аналитиков.",
    category: "guides",
    type: "Гайд",
    stat: "5.9K просмотров",
    accent: "text-neon-cyan",
  },
  {
    id: "n6",
    title: "Фотоархив LAN: лучшие кадры сцены и фан-зоны",
    excerpt: "Masonry-подборка с ключевыми моментами офлайн-турнира.",
    category: "gallery",
    type: "Галерея",
    stat: "1.8K просмотров",
    accent: "text-primary",
  },
];
