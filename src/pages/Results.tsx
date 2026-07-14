import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { useTriage } from "@/context/TriageContext";
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  RotateCcw,
} from "lucide-react";
import type { RiskLevel } from "@/types/triage";

const riskConfig: Record<
  RiskLevel,
  {
    label: string;
    colorClass: string;
    bgClass: string;
    icon: typeof CheckCircle2;
  }
> = {
  low: {
    label: "Low Risk",
    colorClass: "text-risk-low",
    bgClass: "bg-risk-low/10",
    icon: CheckCircle2,
  },
  medium: {
    label: "Medium Risk",
    colorClass: "text-risk-medium",
    bgClass: "bg-risk-medium/10",
    icon: AlertCircle,
  },
  high: {
    label: "High Risk",
    colorClass: "text-risk-high",
    bgClass: "bg-risk-high/10",
    icon: AlertTriangle,
  },
  emergency: {
    label: "Emergency",
    colorClass: "text-risk-emergency",
    bgClass: "bg-risk-emergency/10",
    icon: ShieldAlert,
  },
};

const Results = () => {
  const navigate = useNavigate();
  const ctx = useTriage();

  // User refreshed the page or accessed /results directly
  if (!ctx.sessionId || !ctx.result) {
    navigate("/");
    return null;
  }

  const {
    riskLevel,
    recommendation,
    possibleConditions,
    confidence,
  } = ctx.result;

  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  const handleNewAssessment = () => {
    ctx.reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 max-w-xl mx-auto">
      <ProgressBar
        current={2}
        total={3}
        labels={["Symptoms", "Questions", "Results"]}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 mt-6"
      >
        {/* Risk Level */}
        <div
          className={`flex items-center gap-4 rounded-xl p-5 ${config.bgClass}`}
        >
          <Icon className={`h-8 w-8 ${config.colorClass}`} />

          <div>
            <h2 className={`text-xl font-bold ${config.colorClass}`}>
              {config.label}
            </h2>

            <p className="text-sm text-muted-foreground">
              Assessment completed successfully
            </p>
          </div>
        </div>

        {/* Recommendation */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-lg mb-3">
            Recommendation
          </h3>

          <p className="leading-relaxed whitespace-pre-line">
            {recommendation}
          </p>
        </div>

        {/* Possible Conditions */}
        {possibleConditions.length > 0 && (
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold text-lg mb-3">
              Possible Conditions
            </h3>

            <ul className="space-y-2">
              {possibleConditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex gap-2 items-start"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />

                  <span>{condition}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs italic text-muted-foreground mt-4">
              These are possible conditions only and are not a medical
              diagnosis.
            </p>
          </div>
        )}

        {/* Confidence */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">
              Confidence
            </h3>

            <span className="font-semibold text-primary">
              {Math.round(confidence * 100)}%
            </span>
          </div>

          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: `${confidence * 100}%`,
              }}
              transition={{
                duration: 0.8,
              }}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            This assessment is intended for informational purposes only and is
            not a substitute for professional medical advice, diagnosis, or
            treatment. If your symptoms worsen or you believe you are
            experiencing a medical emergency, seek immediate medical attention.
          </p>
        </div>

        {/* Start Again */}
        <Button
          onClick={handleNewAssessment}
          className="w-full py-6 rounded-xl"
          size="lg"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Assessment
        </Button>
      </motion.div>
    </div>
  );
};

export default Results;