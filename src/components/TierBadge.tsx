import tierS from "@/assets/ratings/tier_s.png";
import tierA from "@/assets/ratings/tier_a.png";
import tierB from "@/assets/ratings/tier_b.png";
import tierC from "@/assets/ratings/tier_c.png";

const tierMap: Record<string, { icon: string; label: string; color: string }> = {
  S: { icon: tierS, label: "S-TIER", color: "border-yellow-500/50 bg-yellow-500/10 text-yellow-400" },
  A: { icon: tierA, label: "A-TIER", color: "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan" },
  B: { icon: tierB, label: "B-TIER", color: "border-neon-purple/50 bg-neon-purple/10 text-neon-purple" },
  C: { icon: tierC, label: "C-TIER", color: "border-muted-foreground/50 bg-muted/20 text-muted-foreground" },
};

interface TierBadgeProps {
  tier: string | null | undefined;
  size?: "sm" | "md" | "lg";
}

export default function TierBadge({ tier, size = "md" }: TierBadgeProps) {
  if (!tier || !tierMap[tier]) return null;
  const t = tierMap[tier];

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 border font-mono text-[10px] tracking-wider ${t.color}`}>
      <img src={t.icon} alt={t.label} className={`${sizeClasses[size]} object-contain`} />
      {t.label}
    </span>
  );
}
