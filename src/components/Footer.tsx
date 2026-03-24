import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Главная", to: "/" },
  { label: "Турниры", to: "/tournaments" },
  { label: "Новости", to: "/news" },
  { label: "О Федерации", to: "/about" },
];

const socials = [
  { label: "VK", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      {/* HUD top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo & info */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded overflow-hidden neon-glow-purple">
                <img src="/logo-fks-v3.png" alt="ФКС РК" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display font-bold text-sm tracking-wider">ФКС РК</div>
                <div className="font-mono text-[8px] text-muted-foreground tracking-widest">CYBER_CRIMEA_PORTAL</div>
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
              Федерация компьютерного спорта Республики Крым. Развитие киберспорта, организация турниров, поддержка игроков.
            </p>
            <div className="font-mono text-[9px] text-muted-foreground">
              © {new Date().getFullYear()} ФКС РК. ALL_RIGHTS_RESERVED.
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-6 md:col-span-2 md:col-start-6">
            <div className="font-mono text-[10px] tracking-wider text-primary mb-4">// NAV</div>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="col-span-6 md:col-span-2">
            <div className="font-mono text-[10px] tracking-wider text-neon-cyan mb-4">// SOCIAL</div>
            <div className="space-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="block font-mono text-xs text-muted-foreground hover:text-neon-cyan transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[10px] tracking-wider text-neon-green mb-4">// CONTACT</div>
            <div className="space-y-2 font-mono text-xs text-muted-foreground">
              <div>295034, Респ. Крым, г. Симферополь, пр-кт Победы 42</div>
              <div>hello@axhulk.ru</div>
              <div>+7 978 738 23 99</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD line */}
      <div className="border-t border-border px-4 py-2 flex items-center justify-between font-mono text-[9px] text-muted-foreground/50 tracking-wider">
        <span>SYS_BUILD: v2.0.26</span>
        <span>NODE: CRIMEA_01</span>
        <span>STATUS: OPERATIONAL</span>
      </div>
    </footer>
  );
}
