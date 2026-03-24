import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wifi, Users, Zap, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const navLinks = [
  { to: "/arena", label: "АРЕНА" },
  { to: "/ratings", label: "РЕЙТИНГИ" },
  { to: "/media-hub", label: "МЕДИА-ХАБ" },
  { to: "/infrastructure", label: "ПЛОЩАДКИ" },
  { to: "/about", label: "О ФЕДЕРАЦИИ" },
  { to: "/b2b", label: "ПАРТНЁРАМ" },
];

const HudNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setLoggedIn(!!s));
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      {/* Top HUD line */}
      <div className="border-b border-border/50 px-4 py-1 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-neon-green" />
            SYS_STATUS: <span className="text-neon-green">ONLINE</span>
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <Users className="w-3 h-3 text-neon-cyan" />
            ACTIVE_PLAYERS: <span className="text-neon-cyan">12,402</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-neon-purple" />
          FKS_RK://CYBER_CRIMEA v2.0
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded overflow-hidden neon-glow-purple">
            <img
              src="/logo-fks-v3.png"
              alt="ФКС РК"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-sm tracking-wider text-foreground group-hover:text-primary transition-colors">
              ФКС РК
            </div>
            <div className="font-mono text-[9px] text-muted-foreground tracking-widest">
              CYBER_CRIMEA
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 font-display text-xs tracking-wider transition-all duration-300
                  ${isActive
                    ? "text-primary border border-primary/30 bg-primary/5 neon-glow-purple"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                  }`}
              >
                {isActive && (
                  <span className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[2px] h-3 bg-primary" />
                )}
                {link.label}
              </Link>
            );
          })}

          {/* Auth button */}
          <Link
            to={loggedIn ? "/dashboard" : "/auth"}
            className={`ml-2 flex items-center gap-1.5 px-4 py-2 font-display text-xs tracking-wider transition-all duration-300 border ${
              location.pathname === "/dashboard" || location.pathname === "/auth"
                ? "text-primary border-primary/30 bg-primary/5 neon-glow-purple"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {loggedIn ? "ЛК" : "ВХОД"}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground border border-border hover:border-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 font-display text-sm tracking-wider transition-all
                      ${isActive
                        ? "text-primary border-l-2 border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border-l-2 border-transparent"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Auth link mobile */}
              <Link
                to={loggedIn ? "/dashboard" : "/auth"}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 font-display text-sm tracking-wider transition-all border-l-2 ${
                  location.pathname === "/dashboard" || location.pathname === "/auth"
                    ? "text-primary border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border-transparent"
                }`}
              >
                <User className="w-4 h-4" />
                {loggedIn ? "КОМАНДНЫЙ ПУНКТ" : "ВХОД / РЕГИСТРАЦИЯ"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HudNavbar;
