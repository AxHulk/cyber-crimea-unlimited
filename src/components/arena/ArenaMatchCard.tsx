import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Team {
  id: string;
  name: string;
  tag: string;
  logo_url: string | null;
}

interface Player {
  id: string;
  nickname: string;
}

export interface ArenaMatch {
  id: string;
  discipline: string;
  format: string;
  status: string;
  team1?: Team | null;
  team2?: Team | null;
  player1?: Player | null;
  player2?: Player | null;
  score: string | null;
  map: string | null;
  stream_url: string | null;
  scheduled_at: string | null;
  started_at: string | null;
  finished_at: string | null;
}

const statusStyles: Record<string, { label: string; color: string; dot?: string }> = {
  waiting: { label: "ОЖИДАНИЕ", color: "text-muted-foreground" },
  ready: { label: "ГОТОВ", color: "text-yellow-400" },
  live: { label: "LIVE", color: "text-neon-green", dot: "bg-neon-green" },
  completed: { label: "ЗАВЕРШЁН", color: "text-muted-foreground" },
  cancelled: { label: "ОТМЕНЁН", color: "text-destructive" },
};

/** Parse stream_url into an embeddable iframe src */
function getEmbedUrl(url: string): string | null {
  try {
    // Twitch channel: twitch.tv/channelname
    const twitchChannel = url.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
    if (twitchChannel) {
      return `https://player.twitch.tv/?channel=${twitchChannel[1]}&parent=${window.location.hostname}&muted=true`;
    }

    // YouTube: youtube.com/watch?v=ID or youtu.be/ID or youtube.com/live/ID
    const ytWatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1&mute=1`;

    const ytShort = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1&mute=1`;

    const ytLive = url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
    if (ytLive) return `https://www.youtube.com/embed/${ytLive[1]}?autoplay=1&mute=1`;

    // VK Video embed
    const vkVideo = url.match(/vk\.com\/video_ext\.php/);
    if (vkVideo) return url;

    const vkVideoAlt = url.match(/vkvideo\.ru\/video(-?\d+)_(\d+)/);
    if (vkVideoAlt) return `https://vk.com/video_ext.php?oid=${vkVideoAlt[1]}&id=${vkVideoAlt[2]}&hd=2`;
  } catch {
    // ignore
  }
  return null;
}

function TeamSide({ team, player, align }: { team?: Team | null; player?: Player | null; align: "left" | "right" }) {
  const name = team?.tag || team?.name || player?.nickname || "TBD";
  const linkTo = team ? `/ratings/team/${team.id}` : player ? `/ratings/player/${player.id}` : undefined;

  const content = (
    <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      {team?.logo_url ? (
        <img src={team.logo_url} alt={name} className="w-10 h-10 rounded object-cover border border-border" />
      ) : (
        <div className="w-10 h-10 rounded border border-border bg-muted/40 flex items-center justify-center font-display text-xs font-bold text-muted-foreground">
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="font-display text-sm font-bold text-foreground tracking-wider">{name}</div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="hover:opacity-80 transition-opacity">{content}</Link>;
  }
  return content;
}

export default function ArenaMatchCard({ match }: { match: ArenaMatch }) {
  const st = statusStyles[match.status] || statusStyles.waiting;
  const isLive = match.status === "live";
  const [showStream, setShowStream] = useState(isLive);

  const embedUrl = match.stream_url ? getEmbedUrl(match.stream_url) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border bg-muted/20 transition-all ${
        isLive ? "border-neon-green/40 shadow-[0_0_20px_hsl(120_100%_50%/0.1)]" : "border-border hover:border-primary/30"
      }`}
    >
      <div className="p-5">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-primary border border-primary/30 px-2 py-0.5 bg-primary/5">
              {match.format}
            </span>
            {match.map && (
              <span className="font-mono text-[10px] text-muted-foreground">{match.map}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {st.dot && (
              <span className={`w-2 h-2 rounded-full ${st.dot} animate-[pulse_1.5s_ease-in-out_infinite]`} />
            )}
            <span className={`font-mono text-[10px] tracking-widest ${st.color}`}>{st.label}</span>
          </div>
        </div>

        {/* Teams / players */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <TeamSide team={match.team1} player={match.player1} align="left" />
          </div>
          <div className="flex flex-col items-center">
            {match.score ? (
              <div className="font-display text-2xl font-black text-foreground tracking-wider">{match.score}</div>
            ) : (
              <div className="font-display text-lg font-bold text-muted-foreground">VS</div>
            )}
            {match.scheduled_at && match.status === "waiting" && (
              <div className="font-mono text-[9px] text-muted-foreground mt-1">
                {new Date(match.scheduled_at).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </div>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            <TeamSide team={match.team2} player={match.player2} align="right" />
          </div>
        </div>

        {/* Stream toggle */}
        {match.stream_url && (
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
            {embedUrl ? (
              <button
                onClick={() => setShowStream(!showStream)}
                className="inline-flex items-center gap-2 font-mono text-[10px] text-neon-green hover:text-neon-green/80 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-neon-green animate-[pulse_1.5s_ease-in-out_infinite]" />
                {showStream ? "СКРЫТЬ ТРАНСЛЯЦИЮ" : "СМОТРЕТЬ ТРАНСЛЯЦИЮ"}
                {showStream ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            ) : (
              <a
                href={match.stream_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[10px] text-neon-green hover:underline"
              >
                <span className="w-2 h-2 rounded-full bg-neon-green animate-[pulse_1.5s_ease-in-out_infinite]" />
                СМОТРЕТЬ ТРАНСЛЯЦИЮ
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {embedUrl && (
              <a
                href={match.stream_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                title="Открыть в новом окне"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Embedded player */}
      {match.stream_url && embedUrl && showStream && (
        <div className="border-t border-border">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
              title={`Stream: ${match.team1?.tag ?? ""} vs ${match.team2?.tag ?? ""}`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
