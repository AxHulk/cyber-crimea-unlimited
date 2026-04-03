import { motion } from "framer-motion";
import iconCs2 from "@/assets/arena/icon_cs2.png";
import iconDota2 from "@/assets/arena/icon_dota2.png";

export type ArenaDiscipline = "cs2" | "dota2";

const disciplines: { key: ArenaDiscipline; label: string; icon: string }[] = [
  { key: "cs2", label: "CS2", icon: iconCs2 },
  { key: "dota2", label: "DOTA 2", icon: iconDota2 },
];

interface Props {
  selected: ArenaDiscipline;
  onChange: (d: ArenaDiscipline) => void;
}

export default function ArenaDisciplineFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {disciplines.map((d) => (
        <motion.button
          key={d.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(d.key)}
          className={`flex items-center gap-2.5 px-5 py-3 border font-display text-sm tracking-wider transition-all ${
            selected === d.key
              ? "border-primary bg-primary/15 text-primary"
              : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
          }`}
        >
          <img src={d.icon} alt={d.label} className="w-6 h-6 object-contain" />
          {d.label}
        </motion.button>
      ))}
    </div>
  );
}
