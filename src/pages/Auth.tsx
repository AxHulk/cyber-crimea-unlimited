import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const signInSchema = z.object({
  email: z.string().trim().email("Некорректный email").max(255),
  password: z.string().min(6, "Минимум 6 символов").max(72),
});

const signUpSchema = signInSchema.extend({
  confirmPassword: z.string().min(6).max(72),
});

const profileSchema = z.object({
  username: z.string().trim().min(2, "Минимум 2 символа").max(32, "Максимум 32 символа"),
  displayName: z.string().trim().min(2, "Минимум 2 символа").max(80, "Максимум 80 символов"),
  discipline: z.string().trim().min(2).max(32),
});

export default function Auth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [message, setMessage] = useState<string>("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [discipline, setDiscipline] = useState("CS2");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        void ensureProfile(nextSession.user);
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        void ensureProfile(data.session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const ensureProfile = async (user: User) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, display_name")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) {
      const fallbackName = (user.email?.split("@")[0] || `player_${user.id.slice(0, 8)}`).replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 32);

      await supabase.from("profiles").insert({
        id: user.id,
        username: fallbackName,
        display_name: fallbackName,
      });

      setUsername(fallbackName);
      setDisplayName(fallbackName);
    } else {
      setUsername(profile.username ?? "");
      setDisplayName(profile.display_name ?? "");
    }

    const { data: player } = await supabase
      .from("players")
      .select("discipline")
      .eq("profile_id", user.id)
      .maybeSingle();

    if (player?.discipline) {
      setDiscipline(player.discipline);
    }
  };

  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    const validation = mode === "signup"
      ? signUpSchema.safeParse({ email, password, confirmPassword })
      : signInSchema.safeParse({ email, password });

    if (!validation.success) {
      setMessage(validation.error.issues[0]?.message ?? "Проверьте поля");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });

        if (error) throw error;
        setMessage("Регистрация успешна. Подтвердите email и войдите.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage("Вы вошли в систему.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    const validated = profileSchema.safeParse({ username, displayName, discipline });
    if (!validated.success) {
      setMessage(validated.error.issues[0]?.message ?? "Проверьте данные профиля");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: session.user.id,
        username: validated.data.username,
        display_name: validated.data.displayName,
      });

      if (profileError) throw profileError;

      const { error: playerError } = await supabase.from("players").upsert(
        {
          profile_id: session.user.id,
          nickname: validated.data.username,
          discipline: validated.data.discipline,
        },
        { onConflict: "profile_id" },
      );

      if (playerError) throw playerError;

      setMessage("Профиль игрока сохранён.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ошибка сохранения профиля");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setMessage("Вы вышли из аккаунта.");
  };

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary">// PLAYER_ACCESS</p>
            <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mt-2">РЕГИСТРАЦИЯ И ВХОД</h1>
          </div>

          {!session ? (
            <div className="bento-card hud-corner p-6 md:p-8 animate-fade-in">
              <div className="flex items-center gap-2 border border-border bg-muted/20 p-1 mb-6 w-fit mx-auto">
                <button
                  className={`px-4 py-2 font-mono text-[10px] tracking-wider ${mode === "signup" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}
                  onClick={() => setMode("signup")}
                  type="button"
                >
                  РЕГИСТРАЦИЯ
                </button>
                <button
                  className={`px-4 py-2 font-mono text-[10px] tracking-wider ${mode === "signin" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}
                  onClick={() => setMode("signin")}
                  type="button"
                >
                  ЛОГИН
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-md mx-auto">
                <input
                  className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {mode === "signup" && (
                  <input
                    className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border border-primary bg-primary/15 px-4 py-3 font-display text-sm tracking-wider text-primary hover:bg-primary/20 transition-colors disabled:opacity-60"
                >
                  {loading ? "ЗАГРУЗКА..." : mode === "signup" ? "СОЗДАТЬ АККАУНТ" : "ВОЙТИ"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bento-card hud-corner p-6 md:p-8 animate-scale-in">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className="font-mono text-xs text-muted-foreground">Вы вошли как {session.user.email}</p>
                <button
                  onClick={handleLogout}
                  className="border border-border bg-muted/20 px-4 py-2 font-mono text-[10px] tracking-wider text-foreground hover:border-primary transition-colors"
                  type="button"
                >
                  ВЫЙТИ
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <input
                  className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
                  type="text"
                  placeholder="Никнейм"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
                  type="text"
                  placeholder="Отображаемое имя"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
                <select
                  className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                >
                  <option value="CS2">CS2</option>
                  <option value="Dota 2">Dota 2</option>
                  <option value="Valorant">Valorant</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border border-primary bg-primary/15 px-4 py-3 font-display text-sm tracking-wider text-primary hover:bg-primary/20 transition-colors disabled:opacity-60"
                >
                  {loading ? "СОХРАНЕНИЕ..." : "СОХРАНИТЬ ПРОФИЛЬ"}
                </button>
              </form>
            </div>
          )}

          {message && (
            <p className="mt-4 text-center font-mono text-xs text-muted-foreground">{message}</p>
          )}

          <div className="text-center mt-6">
            <Link to="/arena" className="font-mono text-xs text-primary hover:underline">
              ← Вернуться в раздел «Арена»
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
