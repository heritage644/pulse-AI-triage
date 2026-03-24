import type { SeverityLevel } from "@/types/triage";
import { motion } from "framer-motion";

interface SeveritySelectorProps {
  value: SeverityLevel | null;
  onChange: (v: SeverityLevel) => void;
  error?: string;
}

const options: { level: SeverityLevel; label: string; description: string; colorClass: string }[] = [
  { level: "mild", label: "Mild", description: "Slight discomfort, manageable", colorClass: "bg-severity-mild" },
  { level: "moderate", label: "Moderate", description: "Noticeable, affects daily tasks", colorClass: "bg-severity-moderate" },
  { level: "severe", label: "Severe", description: "Significant pain or distress", colorClass: "bg-severity-severe" },
  { level: "extreme", label: "Extreme", description: "Unbearable, needs urgent care", colorClass: "bg-severity-extreme" },
];

const SeveritySelector = ({ value, onChange, error }: SeveritySelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        Severity
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <motion.button
            key={opt.level}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(opt.level)}
            className={`relative flex flex-col items-start p-4 rounded-lg border-2 transition-colors text-left ${
              value === opt.level
                ? "border-primary bg-primary/5"
                : "border-input bg-card hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-3 h-3 rounded-full ${opt.colorClass}`} />
              <span className="font-semibold text-sm text-foreground">{opt.label}</span>
            </div>
            <span className="text-xs text-muted-foreground">{opt.description}</span>
          </motion.button>
        ))}
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default SeveritySelector;
