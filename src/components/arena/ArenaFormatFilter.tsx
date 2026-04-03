import { motion } from "framer-motion";

export type ArenaFormat = "all" | "5v5" | "2v2" | "1v1";

const formats: { key: ArenaFormat; label: string }[] = [
  { key: "all", label: "ВСЕ" },
  { key: "5v5", label: "5v5" },
  { key: "2v2", label: "2v2" },
  { key: "1v1", label: "1v1" },
];

interface Props {
  selected: ArenaFormat;
  onChange: (f: ArenaFormat) => void;
}

export default function ArenaFormatFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {formats.map((f) => (
        <motion.button
          key={f.key}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(f.key)}
          className={`px-4 py-2 border font-mono text-xs tracking-wider transition-all ${
            selected === f.key
              ? "border-primary bg-primary/15 text-primary"
              : "border-border bg-muted/20 text-muted-foreground hover:border-primary/40"
          }`}
        >
          {f.label}
        </motion.button>
      ))}
    </div>
  );
}
