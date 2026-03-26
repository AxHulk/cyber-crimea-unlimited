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
    title: "Киберлига Крыма 2024 — Финал по CS2",
    embedUrl: "https://vk.com/video_ext.php?oid=-126368111&id=456239391&hd=2",
    sourceUrl: "https://vkvideo.ru/video-126368111_456239391",
    date: "2024",
  },
  {
    id: "vod2",
    title: "Киберлига Крыма 2024 — Финал по Dota 2",
    embedUrl: "https://vk.com/video_ext.php?oid=-126368111&id=456239387&hd=2",
    sourceUrl: "https://vkvideo.ru/video-126368111_456239387",
    date: "2024",
  },
];
