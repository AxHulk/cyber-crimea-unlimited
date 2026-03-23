import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

import roleFighter from "@/assets/dashboard/role_fighter.png";
import roleCaptain from "@/assets/dashboard/role_captain.png";
import roleOrganizer from "@/assets/dashboard/role_organizer.png";

const signInSchema = z.object({
  email: z.string().trim().email("Некорректный email").max(255),
  password: z.string().min(6, "Минимум 6 символов").max(72),
});

const signUpSchema = signInSchema.extend({
  confirmPassword: z.string().min(6).max(72),
  nickname: z.string().trim().min(2, "Минимум 2 символа").max(32, "Максимум 32 символа"),
  discipline: z.string().min(1),
});

const roles = [
  { id: "fighter", label: "БОЕЦ", desc: "Рядовой игрок", icon: roleFighter, color: "neon-cyan" },
  { id: "captain", label: "КАПИТАН", desc: "Лидер команды", icon: roleCaptain, color: "primary" },
  { id: "organizer", label: "ОРГАНИЗАТОР", desc: "Администратор турниров", icon: roleOrganizer, color: "neon-magenta" },
];

const disciplines = ["CS2", "Dota 2", "Valorant", "FIFA"];

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" }>({ text: "", type: "error" });

  // Sign up fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [discipline, setDiscipline] = useState("CS2");
  const [selectedRole, setSelectedRole] = useState("fighter");

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/dashboard");
    });
  }, [navigate]);

  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "error" });

    if (mode === "signup") {
      const validation = signUpSchema.safeParse({ email, password, confirmPassword, nickname, discipline });
      if (!validation.success) {
        setMessage({ text: validation.error.issues[0]?.message ?? "Проверьте поля", type: "error" });
        return;
      }
      if (password !== confirmPassword) {
        setMessage({ text: "Пароли не совпадают", type: "error" });
        return;
      }
    } else {
      const validation = signInSchema.safeParse({ email, password });
      if (!validation.success) {
        setMessage({ text: validation.error.issues[0]?.message ?? "Проверьте поля", type: "error" });
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        const user = data.user;
        if (user) {
          // Create profile
          await supabase.from("profiles").upsert({
            id: user.id,
            username: nickname,
            display_name: nickname,
          });

          // Create player record
          await supabase.from("players").upsert(
            { profile_id: user.id, nickname, discipline },
            { onConflict: "profile_id" }
          );
        }

        setMessage({ text: "Аккаунт создан! Перенаправление...", type: "success" });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "Ошибка авторизации", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary">// PLAYER_ACCESS</p>
            <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mt-2">
              {mode === "signup" ? "РЕГИСТРАЦИЯ" : "ВХОД"}
            </h1>
          </div>

          <div className="bento-card hud-corner p-6 md:p-8">
            {/* Mode toggle */}
            <div className="flex items-center gap-2 border border-border bg-muted/20 p-1 mb-6 w-fit mx-auto">
              <button
                className={`px-5 py-2.5 font-mono text-[10px] tracking-wider transition-colors ${mode === "signup" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setMode("signup")}
                type="button"
              >
                РЕГИСТРАЦИЯ
              </button>
              <button
                className={`px-5 py-2.5 font-mono text-[10px] tracking-wider transition-colors ${mode === "signin" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setMode("signin")}
                type="button"
              >
                ВХОД
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {mode === "signup" && (
                <>
                  {/* Role selection */}
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3 block">// ВЫБЕРИТЕ РОЛЬ</label>
                    <div className="grid grid-cols-3 gap-2">
                      {roles.map((role) => (
                        <motion.button
                          key={role.id}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedRole(role.id)}
                          className={`border p-3 flex flex-col items-center gap-2 transition-all ${
                            selectedRole === role.id
                              ? "border-primary bg-primary/10 neon-glow-purple"
                              : "border-border bg-muted/20 hover:border-primary/40"
                          }`}
                        >
                          <img src={role.icon} alt={role.label} className="w-10 h-10 object-contain" />
                          <span className="font-display text-[10px] tracking-wider text-foreground">{role.label}</span>
                          <span className="font-mono text-[8px] text-muted-foreground">{role.desc}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Nickname */}
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1.5 block">НИКНЕЙМ</label>
                    <input
                      className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors"
                      type="text"
                      placeholder="YourNickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                  </div>

                  {/* Discipline */}
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1.5 block">ДИСЦИПЛИНА</label>
                    <select
                      className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                    >
                      {disciplines.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1.5 block">EMAIL</label>
                <input
                  className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors"
                  type="email"
                  placeholder="player@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1.5 block">ПАРОЛЬ</label>
                <input
                  className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {mode === "signup" && (
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1.5 block">ПОВТОРИТЕ ПАРОЛЬ</label>
                  <input
                    className="w-full border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-primary bg-primary/10 px-4 py-3.5 font-display text-sm tracking-wider text-primary hover:bg-primary/20 transition-colors disabled:opacity-60 neon-glow-purple"
              >
                {loading ? "ЗАГРУЗКА..." : mode === "signup" ? "СОЗДАТЬ АККАУНТ" : "ВОЙТИ"}
              </button>
            </form>

            {message.text && (
              <p className={`mt-4 text-center font-mono text-xs ${message.type === "success" ? "text-neon-green" : "text-destructive"}`}>
                {message.text}
              </p>
            )}
          </div>

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
