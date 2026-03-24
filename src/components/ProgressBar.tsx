import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  labels?: string[];
}

const ProgressBar = ({ current, total, labels }: ProgressBarProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {labels
          ? labels.map((label, i) => (
              <span
                key={i}
                className={`text-xs font-medium ${
                  i < current ? "text-primary" : i === current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            ))
          : Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`text-xs font-medium ${
                  i < current ? "text-primary" : i === current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Step {i + 1}
              </span>
            ))}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
