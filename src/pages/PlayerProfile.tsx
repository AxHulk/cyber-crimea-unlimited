import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Swords, TrendingUp, Users, Shield, ExternalLink } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PlayerProfile() {
  const { playerId } = useParams<{ playerId: string }>();

  const { data: player, isLoading } = useQuery({
    queryKey: ["player", playerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*, profiles(*)")
        .eq("id", playerId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!playerId,
  });

  const { data: teamHistory } = useQuery({
    queryKey: ["player-teams", playerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*, teams(id, name, tag, discipline, logo_url)")
        .eq("player_id", playerId!)
        .order("joined_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!playerId,
  });

  const totalGames = player ? player.wins + player.losses : 0;
  const winrate = totalGames > 0 ? Math.round((player!.wins / totalGames) * 100) : 0;

  const activeTeam = teamHistory?.find((t: any) => !t.left_at);

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="relative pt-28 pb-8 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/ratings" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" /> НАЗАД К РЕЙТИНГАМ
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="font-mono text-xs text-muted-foreground animate-pulse">ЗАГРУЗКА ПРОФИЛЯ ИГРОКА...</div>
          </div>
        ) : !player ? (
          <div className="text-center py-20">
            <div className="font-display text-2xl text-foreground mb-2">Игрок не найден</div>
            <div className="font-mono text-xs text-muted-foreground">Возможно, профиль ещё не создан</div>
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-12 gap-4">

            {/* Player Header */}
            <motion.div variants={item} className="col-span-12 lg:col-span-8 bento-card hud-corner p-0 relative overflow-hidden min-h-[220px] md:min-h-[260px]">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 z-10" />
              
              {/* Player photo - positioned right, cropped stylishly */}
              {player.profiles?.avatar_url && (
                <div className="absolute right-0 bottom-0 top-0 w-[45%] md:w-[40%] z-0">
                  <img 
                    src={player.profiles.avatar_url} 
                    alt={player.nickname} 
                    className="w-full h-full object-cover object-top opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              )}

              <div className="relative z-20 p-6 md:p-8 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-primary/30 bg-primary/10 text-primary">{player.discipline}</span>
                  {player.admin_verified && (
                    <span className="font-mono text-[10px] px-2 py-0.5 border border-neon-green/30 bg-neon-green/10 text-neon-green flex items-center gap-1">
                      <Shield className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-2 drop-shadow-lg">{player.nickname}</h1>
                {player.profiles?.full_name && (
                  <div className="font-mono text-sm text-muted-foreground mb-1">{player.profiles.full_name}</div>
                )}
                {player.profiles?.bio && (
                  <p className="font-mono text-xs text-muted-foreground/80 mt-2 max-w-md leading-relaxed">{player.profiles.bio}</p>
                )}
                {activeTeam && (
                  <Link to={`/ratings/team/${activeTeam.teams?.id}`} className="inline-flex items-center gap-2 mt-3 font-mono text-[10px] text-primary hover:underline">
                    <Users className="w-3 h-3" /> [{activeTeam.teams?.tag}] {activeTeam.teams?.name}
                  </Link>
                )}
              </div>

              {/* No photo fallback */}
              {!player.profiles?.avatar_url && (
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-0 opacity-10">
                  <span className="font-display text-[120px] font-black text-primary">{player.nickname[0]}</span>
                </div>
              )}
            </motion.div>

            {/* ELO Card */}
            <motion.div variants={item} className="col-span-12 lg:col-span-4 bento-card hud-corner p-6 flex flex-col items-center justify-center">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3">// ELO</div>
              <div className="font-display text-6xl font-black text-primary">{player.elo}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-2">РЕЙТИНГ</div>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <Swords className="w-6 h-6 mx-auto text-neon-cyan mb-2" />
              <div className="font-display text-2xl font-black text-foreground">{totalGames}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">ВСЕГО ИГР</div>
            </motion.div>

            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto text-neon-green mb-2" />
              <div className="font-display text-2xl font-black text-foreground">{player.wins}/{player.losses}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">В / П</div>
            </motion.div>

            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto text-neon-purple mb-2" />
              <div className="font-display text-2xl font-black text-neon-cyan">{winrate}%</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">ВИНРЕЙТ</div>
            </motion.div>

            <motion.div variants={item} className="col-span-6 md:col-span-3 bento-card hud-corner p-4 text-center">
              <Swords className="w-6 h-6 mx-auto text-neon-magenta mb-2" />
              <div className="font-display text-2xl font-black text-foreground">{Number(player.kda).toFixed(2)}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">KDA</div>
            </motion.div>

            {/* External Stats - Synced Data */}
            {player.stats_synced_at && (
              <motion.div variants={item} className="col-span-12 bento-card hud-corner p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-[10px] tracking-widest text-primary">// ВНЕШНЯЯ СТАТИСТИКА ({player.discipline === "CS2" ? "FACEIT" : "OPENDOTA"})</div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    Обновлено: {new Date(player.stats_synced_at).toLocaleString("ru")}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {player.external_elo != null && (
                    <div className="border border-border bg-muted/20 p-3 text-center">
                      <div className="font-display text-xl font-black text-neon-cyan">{player.external_elo}</div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">{player.discipline === "CS2" ? "FACEIT ELO" : "MMR"}</div>
                    </div>
                  )}
                  {player.external_level != null && player.external_level > 0 && (
                    <div className="border border-border bg-muted/20 p-3 text-center">
                      <div className="font-display text-xl font-black text-neon-purple">LVL {player.external_level}</div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">УРОВЕНЬ</div>
                    </div>
                  )}
                  {player.external_kda != null && (
                    <div className="border border-border bg-muted/20 p-3 text-center">
                      <div className="font-display text-xl font-black text-foreground">{Number(player.external_kda).toFixed(2)}</div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">K/D</div>
                    </div>
                  )}
                  {player.external_winrate != null && (
                    <div className="border border-border bg-muted/20 p-3 text-center">
                      <div className="font-display text-xl font-black text-neon-green">{player.external_winrate}%</div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">ВИНРЕЙТ</div>
                    </div>
                  )}
                  {player.external_matches != null && (
                    <div className="border border-border bg-muted/20 p-3 text-center">
                      <div className="font-display text-xl font-black text-foreground">{player.external_matches}</div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">МАТЧЕЙ</div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Accounts */}
            <motion.div variants={item} className="col-span-12 lg:col-span-6 bento-card hud-corner p-6">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// ПРИВЯЗАННЫЕ АККАУНТЫ</div>
              <div className="space-y-3">
                {player.steam_id ? (
                  <div className="border border-border bg-muted/20 p-3 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-foreground">Steam</div>
                      <div className="font-mono text-[10px] text-muted-foreground">ID: {player.steam_id}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {player.steam_verified ? (
                        <span className="font-mono text-[10px] text-neon-green">✓ Подтверждён</span>
                      ) : (
                        <span className="font-mono text-[10px] text-muted-foreground">Не подтверждён</span>
                      )}
                      <a href={`https://steamcommunity.com/profiles/${player.steam_id}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="border border-border bg-muted/10 p-3 text-center">
                    <div className="font-mono text-[10px] text-muted-foreground">Steam ID не указан</div>
                  </div>
                )}

                {player.faceit_nickname ? (
                  <div className="border border-border bg-muted/20 p-3 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-foreground">Faceit</div>
                      <div className="font-mono text-[10px] text-muted-foreground">Ник: {player.faceit_nickname}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {player.faceit_verified ? (
                        <span className="font-mono text-[10px] text-neon-green">✓ Подтверждён</span>
                      ) : (
                        <span className="font-mono text-[10px] text-muted-foreground">Не подтверждён</span>
                      )}
                      <a href={`https://www.faceit.com/en/players/${player.faceit_nickname}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="border border-border bg-muted/10 p-3 text-center">
                    <div className="font-mono text-[10px] text-muted-foreground">Faceit ник не указан</div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Team History */}
            <motion.div variants={item} className="col-span-12 lg:col-span-6 bento-card hud-corner p-6">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-4">// ИСТОРИЯ КОМАНД</div>
              {!teamHistory || teamHistory.length === 0 ? (
                <div className="text-center py-8">
                  <div className="font-mono text-xs text-muted-foreground">Игрок пока не состоял в командах</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {teamHistory.map((entry: any) => (
                    <Link
                      key={entry.id}
                      to={`/ratings/team/${entry.teams?.id}`}
                      className="border border-border bg-muted/20 p-3 flex items-center gap-3 hover:border-primary/50 transition-colors block"
                    >
                      <div className="w-8 h-8 border border-border bg-muted/30 flex items-center justify-center">
                        {entry.teams?.logo_url ? (
                          <img src={entry.teams.logo_url} alt={entry.teams.name} className="w-full h-full object-contain" />
                        ) : (
                          <Users className="w-4 h-4 text-primary/40" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-sm font-bold text-foreground">[{entry.teams?.tag}] {entry.teams?.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {entry.role === "captain" ? "КАПИТАН" : "ИГРОК"} • {entry.teams?.discipline}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {new Date(entry.joined_at).toLocaleDateString("ru")}
                        </div>
                        {entry.left_at ? (
                          <div className="font-mono text-[10px] text-destructive">→ {new Date(entry.left_at).toLocaleDateString("ru")}</div>
                        ) : (
                          <div className="font-mono text-[10px] text-neon-green">АКТИВЕН</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
