export type VodItem = {
  id: string;
  title: string;
  embedUrl: string;
  sourceUrl: string;
  date: string;
};

export const vodArchive: VodItem[] = [
  {
    id: "vod1",
    title: "Киберлига Крыма 2024 — Трансляция",
    embedUrl: "https://vk.com/video_ext.php?oid=-126368111&id=456239391&hd=2",
    sourceUrl: "https://vkvideo.ru/video-126368111_456239391",
    date: "2024",
  },
  {
    id: "vod2",
    title: "Киберлига Крыма 2024 по CS 2 — Гранд-финал",
    embedUrl: "https://vk.com/video_ext.php?oid=-126368111&id=456239393&hd=2",
    sourceUrl: "https://vkvideo.ru/video-126368111_456239393",
    date: "16 декабря 2024",
  },
  {
    id: "vod3",
    title: "Киберлига Крыма 2024 по Dota 2 — Гранд-финал",
    embedUrl: "https://vk.com/video_ext.php?oid=-126368111&id=456239394&hd=2",
    sourceUrl: "https://vkvideo.ru/video-126368111_456239394",
    date: "16 декабря 2024",
  },
];
