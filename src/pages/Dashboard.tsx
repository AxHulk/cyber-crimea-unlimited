import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, User, Shield, Trophy, TrendingUp, Calendar, Bell, Settings, ChevronRight, Star, Swords, Target, Camera } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

import gamifAchievement from "@/assets/dashboard/gamif_achievement.png";
import gamifAvatarFrame from "@/assets/dashboard/gamif_avatar_frame.png";
import gamifBadge from "@/assets/dashboard/gamif_badge.png";
import gamifXp from "@/assets/dashboard/gamif_xp.png";
import roleFighter from "@/assets/dashboard/role_fighter.png";
import roleCaptain from "@/assets/dashboard/role_captain.png";
import roleOrganizer from "@/assets/dashboard/role_organizer.png";

type Tab = "dashboard" | "profile" | "career" | "settings";

interface ProfileData {
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  full_name: string;
  birth_date: string;
}

interface PlayerData {
  nickname: string;
  discipline: string;
  elo: number;
  wins: number;
  losses: number;
  kda: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState<ProfileData>({
    username: "", display_name: "", bio: "", avatar_url: "", full_name: "", birth_date: "",
  });
  const [player, setPlayer] = useState<PlayerData>({
    nickname: "", discipline: "CS2", elo: 1000, wins: 0, losses: 0, kda: 1,
  });

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (!s) navigate("/auth");
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth");
        return;
      }
      setSession(data.session);
      loadUserData(data.session.user.id);
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    setLoading(true);
    const [{ data: p }, { data: pl }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("players").select("*").eq("profile_id", userId).maybeSingle(),
    ]);

    if (p) {
      setProfile({
        username: p.username ?? "",
        display_name: p.display_name ?? "",
        bio: p.bio ?? "",
        avatar_url: p.avatar_url ?? "",
        full_name: (p as any).full_name ?? "",
        birth_date: (p as any).birth_date ?? "",
      });
    }
    if (pl) {
      setPlayer({
        nickname: pl.nickname,
        discipline: pl.discipline,
        elo: pl.elo,
        wins: pl.wins,
        losses: pl.losses,
        kda: Number(pl.kda),
      });
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!session?.user) return;
    setSaving(true);
    setMessage("");

    try {
      const { error: pe } = await supabase.from("profiles").upsert({
        id: session.user.id,
        username: profile.username,
        display_name: profile.display_name,
        bio: profile.bio,
        full_name: profile.full_name,
        birth_date: profile.birth_date || null,
      } as any);
      if (pe) throw pe;

      const { error: ple } = await supabase.from("players").upsert(
        { profile_id: session.user.id, nickname: profile.username, discipline: player.discipline },
        { onConflict: "profile_id" }
      );
      if (ple) throw ple;

      setMessage("Профиль сохранён!");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const winrate = player.wins + player.losses > 0
    ? Math.round((player.wins / (player.wins + player.losses)) * 100)
    : 0;

  const xpLevel = Math.floor((player.wins * 50 + player.elo) / 200);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "ДАШБОРД", icon: <Target className="w-4 h-4" /> },
    { id: "profile", label: "ПРОФИЛЬ", icon: <User className="w-4 h-4" /> },
    { id: "career", label: "КАРЬЕРА", icon: <Trophy className="w-4 h-4" /> },
    { id: "settings", label: "НАСТРОЙКИ", icon: <Settings className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-sm text-primary animate-pulse">LOADING_COMMAND_CENTER...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-primary">// COMMAND_CENTER</p>
              <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mt-1">КОМАНДНЫЙ ПУНКТ</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-display text-sm text-foreground">{profile.display_name || profile.username}</div>
                <div className="font-mono text-[9px] text-muted-foreground">{session?.user.email}</div>
              </div>
              <button onClick={handleLogout} className="border border-border bg-muted/20 p-2.5 text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex gap-1 mb-6 overflow-x-auto border-b border-border pb-px">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 font-mono text-[10px] tracking-wider transition-all whitespace-nowrap border-b-2 ${
                  tab === t.id
                    ? "text-primary border-primary bg-primary/5"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {tab === "dashboard" && <DashboardTab player={player} profile={profile} winrate={winrate} xpLevel={xpLevel} />}
          {tab === "profile" && (
            <ProfileTab
              profile={profile}
              setProfile={setProfile}
              player={player}
              setPlayer={setPlayer}
              onSave={handleSaveProfile}
              saving={saving}
              message={message}
              session={session}
            />
          )}
          {tab === "career" && <CareerTab player={player} winrate={winrate} />}
          {tab === "settings" && <SettingsTab session={session} />}
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ===== DASHBOARD TAB ===== */
function DashboardTab({ player, profile, winrate, xpLevel }: { player: PlayerData; profile: ProfileData; winrate: number; xpLevel: number }) {
  return (
    <motion.div className="grid grid-cols-12 gap-4" variants={stagger} initial="hidden" animate="show">
      {/* Player card */}
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-4 bento-card hud-corner p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img src={gamifAvatarFrame} alt="" className="w-24 h-24 absolute -inset-2 object-contain pointer-events-none" style={{ width: "112px", height: "112px", top: "-8px", left: "-8px" }} />
            <div className="w-24 h-24 rounded-full bg-muted/50 border border-border flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
          </div>
          <div className="font-display text-lg font-bold text-foreground">{profile.display_name || profile.username}</div>
          <div className="font-mono text-[10px] text-primary mt-1">{player.discipline} • ELO {player.elo}</div>
          <div className="flex items-center gap-1 mt-2">
            <img src={roleFighter} alt="" className="w-5 h-5" />
            <span className="font-mono text-[9px] text-neon-cyan">БОЕЦ</span>
          </div>

          {/* XP bar */}
          <div className="w-full mt-4">
            <div className="flex justify-between font-mono text-[9px] text-muted-foreground mb-1">
              <span>УРОВЕНЬ {xpLevel}</span>
              <span>LVL {xpLevel + 1}</span>
            </div>
            <div className="w-full h-2 bg-muted/50 border border-border">
              <div className="h-full bg-gradient-to-r from-primary to-neon-cyan" style={{ width: `${(xpLevel % 1) * 100 || 65}%` }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "ELO РЕЙТИНГ", value: player.elo, icon: <TrendingUp className="w-4 h-4 text-neon-cyan" /> },
          { label: "ПОБЕДЫ", value: player.wins, icon: <Trophy className="w-4 h-4 text-neon-green" /> },
          { label: "WINRATE", value: `${winrate}%`, icon: <Target className="w-4 h-4 text-primary" /> },
          { label: "KDA", value: player.kda.toFixed(2), icon: <Swords className="w-4 h-4 text-neon-magenta" /> },
        ].map((stat) => (
          <div key={stat.label} className="bento-card hud-corner p-4 flex flex-col items-center justify-center text-center">
            {stat.icon}
            <div className="font-display text-2xl font-black text-foreground mt-2">{stat.value}</div>
            <div className="font-mono text-[9px] text-muted-foreground tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Next match widget */}
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-6 bento-card hud-corner p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-mono text-[10px] tracking-widest text-primary">// СЛЕДУЮЩИЙ_МАТЧ</span>
        </div>
        <div className="border border-border bg-muted/20 p-4">
          <div className="font-mono text-[9px] text-muted-foreground mb-2">НЕТ ЗАПЛАНИРОВАННЫХ МАТЧЕЙ</div>
          <p className="font-mono text-[10px] text-muted-foreground">Зарегистрируйтесь на турнир в разделе «Арена»</p>
        </div>
      </motion.div>

      {/* Notifications widget */}
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-6 bento-card hud-corner p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-neon-magenta" />
          <span className="font-mono text-[10px] tracking-widest text-neon-magenta">// УВЕДОМЛЕНИЯ</span>
        </div>
        <div className="border border-border bg-muted/20 p-4">
          <div className="font-mono text-[9px] text-muted-foreground">Нет новых уведомлений</div>
        </div>
      </motion.div>

      {/* Gamification showcase */}
      <motion.div variants={fadeUp} className="col-span-12 bento-card hud-corner p-6">
        <div className="flex items-center gap-2 mb-5">
          <Star className="w-4 h-4 text-primary" />
          <span className="font-mono text-[10px] tracking-widest text-primary">// ДОСТИЖЕНИЯ_И_НАГРАДЫ</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { img: gamifAchievement, label: "АЧИВКИ", desc: "0 / 100", sub: "Получайте за участие в матчах" },
            { img: gamifBadge, label: "БЕЙДЖИ", desc: "Новичок", sub: "Отображается рядом с ником" },
            { img: gamifXp, label: "УРОВЕНЬ", desc: `LVL ${xpLevel}`, sub: "Растёт с каждым матчем" },
            { img: gamifAvatarFrame, label: "РАМКИ", desc: "Стандарт", sub: "Разблокируйте новые ранги" },
          ].map((item) => (
            <div key={item.label} className="border border-border bg-muted/20 p-4 flex flex-col items-center text-center group hover:border-primary/40 transition-colors">
              <img src={item.img} alt={item.label} className="w-14 h-14 object-contain mb-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="font-display text-xs font-bold text-foreground">{item.label}</div>
              <div className="font-mono text-[10px] text-primary mt-1">{item.desc}</div>
              <div className="font-mono text-[8px] text-muted-foreground mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ===== PROFILE TAB ===== */
function ProfileTab({
  profile, setProfile, player, setPlayer, onSave, saving, message,
}: {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  player: PlayerData;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerData>>;
  onSave: () => void;
  saving: boolean;
  message: string;
}) {
  const inputCls = "w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors";

  return (
    <motion.div className="grid grid-cols-12 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Game profile */}
      <div className="col-span-12 lg:col-span-6 bento-card hud-corner p-6">
        <div className="font-mono text-[10px] tracking-widest text-primary mb-5">// ИГРОВОЙ_ПРОФИЛЬ</div>
        <div className="space-y-4">
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">НИКНЕЙМ</label>
            <input className={inputCls} value={profile.username} onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))} />
          </div>
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">ОТОБРАЖАЕМОЕ ИМЯ</label>
            <input className={inputCls} value={profile.display_name} onChange={(e) => setProfile((p) => ({ ...p, display_name: e.target.value }))} />
          </div>
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">ДИСЦИПЛИНА</label>
            <select className={inputCls} value={player.discipline} onChange={(e) => setPlayer((p) => ({ ...p, discipline: e.target.value }))}>
              {["CS2", "Dota 2", "Valorant", "FIFA"].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">О СЕБЕ</label>
            <textarea className={`${inputCls} h-24 resize-none`} value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} placeholder="Расскажите о себе..." />
          </div>
        </div>
      </div>

      {/* Personal data */}
      <div className="col-span-12 lg:col-span-6 bento-card hud-corner p-6">
        <div className="font-mono text-[10px] tracking-widest text-neon-cyan mb-5">// ЛИЧНЫЕ_ДАННЫЕ</div>
        <p className="font-mono text-[9px] text-muted-foreground mb-4 border border-border bg-muted/20 p-3">
          <Shield className="w-3 h-3 inline mr-1 text-neon-cyan" />
          Заполните ФИО и дату рождения, если планируете совершать покупки через сайт. Данные защищены и не видны другим пользователям.
        </p>
        <div className="space-y-4">
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">ФИО (ПОЛНОЕ ИМЯ)</label>
            <input className={inputCls} value={profile.full_name} onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))} placeholder="Иванов Иван Иванович" />
          </div>
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">ДАТА РОЖДЕНИЯ</label>
            <input className={inputCls} type="date" value={profile.birth_date} onChange={(e) => setProfile((p) => ({ ...p, birth_date: e.target.value }))} />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="col-span-12 flex flex-col items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="border-2 border-primary bg-primary/10 px-8 py-3.5 font-display text-sm tracking-wider text-primary hover:bg-primary/20 transition-colors disabled:opacity-60 neon-glow-purple"
        >
          {saving ? "СОХРАНЕНИЕ..." : "СОХРАНИТЬ ПРОФИЛЬ"}
        </button>
        {message && <p className="font-mono text-xs text-neon-green">{message}</p>}
      </div>
    </motion.div>
  );
}

/* ===== CAREER TAB ===== */
function CareerTab({ player, winrate }: { player: PlayerData; winrate: number }) {
  const totalGames = player.wins + player.losses;

  return (
    <motion.div className="grid grid-cols-12 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Radar-like stats */}
      <div className="col-span-12 md:col-span-6 bento-card hud-corner p-6">
        <div className="font-mono text-[10px] tracking-widest text-primary mb-5">// СТАТИСТИКА</div>
        <div className="space-y-4">
          {[
            { label: "WINRATE", value: winrate, max: 100, color: "bg-neon-green" },
            { label: "KDA", value: Math.min(player.kda * 20, 100), max: 100, color: "bg-neon-cyan" },
            { label: "ELO", value: Math.min((player.elo / 3000) * 100, 100), max: 100, color: "bg-primary" },
            { label: "МАТЧИ", value: Math.min(totalGames, 100), max: 100, color: "bg-neon-magenta" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-between font-mono text-[9px] text-muted-foreground mb-1">
                <span>{stat.label}</span>
                <span>{stat.label === "WINRATE" ? `${winrate}%` : stat.label === "KDA" ? player.kda.toFixed(2) : stat.label === "ELO" ? player.elo : totalGames}</span>
              </div>
              <div className="w-full h-2 bg-muted/50 border border-border">
                <div className={`h-full ${stat.color} transition-all duration-700`} style={{ width: `${stat.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Match history */}
      <div className="col-span-12 md:col-span-6 bento-card hud-corner p-6">
        <div className="font-mono text-[10px] tracking-widest text-neon-cyan mb-5">// ИСТОРИЯ_МАТЧЕЙ</div>
        <div className="border border-border bg-muted/20 p-6 text-center">
          <Swords className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <div className="font-mono text-[10px] text-muted-foreground">
            История матчей будет доступна после участия в турнирах
          </div>
        </div>
      </div>

      {/* ELO chart placeholder */}
      <div className="col-span-12 bento-card hud-corner p-6">
        <div className="font-mono text-[10px] tracking-widest text-primary mb-5">// ДИНАМИКА_ELO</div>
        <div className="h-32 border border-border bg-muted/20 flex items-center justify-center">
          <div className="flex items-end gap-1 h-20">
            {[40, 45, 42, 55, 50, 65, 60, 70, 68, 75, 72, 80].map((h, i) => (
              <div key={i} className="w-4 md:w-8 bg-gradient-to-t from-primary/60 to-primary transition-all" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="flex justify-between font-mono text-[8px] text-muted-foreground mt-2">
          <span>12 НЕДЕЛЬ НАЗАД</span>
          <span>СЕГОДНЯ</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== SETTINGS TAB ===== */
function SettingsTab({ session }: { session: Session | null }) {
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setMsg("Минимум 6 символов");
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setMsg(error.message);
    else {
      setMsg("Пароль изменён!");
      setNewPassword("");
    }
    setSaving(false);
  };

  return (
    <motion.div className="max-w-lg mx-auto space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bento-card hud-corner p-6">
        <div className="font-mono text-[10px] tracking-widest text-primary mb-5">// АККАУНТ</div>
        <div className="space-y-3">
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">EMAIL</label>
            <div className="border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-muted-foreground">{session?.user.email}</div>
          </div>
        </div>
      </div>

      <div className="bento-card hud-corner p-6">
        <div className="font-mono text-[10px] tracking-widest text-neon-magenta mb-5">// СМЕНА_ПАРОЛЯ</div>
        <div className="space-y-4">
          <div>
            <label className="font-mono text-[10px] text-muted-foreground mb-1.5 block">НОВЫЙ ПАРОЛЬ</label>
            <input
              className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleChangePassword}
            disabled={saving}
            className="border border-primary bg-primary/10 px-6 py-3 font-display text-xs tracking-wider text-primary hover:bg-primary/20 transition-colors disabled:opacity-60"
          >
            {saving ? "СОХРАНЕНИЕ..." : "ИЗМЕНИТЬ ПАРОЛЬ"}
          </button>
          {msg && <p className="font-mono text-xs text-neon-green">{msg}</p>}
        </div>
      </div>
    </motion.div>
  );
}
