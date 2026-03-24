import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { useTriage } from "@/context/TriageContext";
import { AlertTriangle, CheckCircle2, AlertCircle, ShieldAlert, RotateCcw } from "lucide-react";
import type { RiskLevel } from "@/types/triage";

const riskConfig: Record<RiskLevel, { label: string; colorClass: string; bgClass: string; icon: typeof CheckCircle2 }> = {
  low: { label: "Low Risk", colorClass: "text-risk-low", bgClass: "bg-risk-low/10", icon: CheckCircle2 },
  medium: { label: "Medium Risk", colorClass: "text-risk-medium", bgClass: "bg-risk-medium/10", icon: AlertCircle },
  high: { label: "High Risk", colorClass: "text-risk-high", bgClass: "bg-risk-high/10", icon: AlertTriangle },
  emergency: { label: "Emergency", colorClass: "text-risk-emergency", bgClass: "bg-risk-emergency/10", icon: ShieldAlert },
};

const Results = () => {
  const navigate = useNavigate();
  const ctx = useTriage();

  if (!ctx.result) {
    navigate("/");
    return null;
  }

  const { riskLevel, recommendation, possibleConditions, confidence } = ctx.result;
  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  const handleNewAssessment = () => {
    ctx.reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-xl mx-auto">
      <ProgressBar current={2} total={3} labels={["Symptoms", "Questions", "Results"]} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Risk Badge */}
        <div className={`flex items-center gap-3 p-5 rounded-xl ${config.bgClass}`}>
          <Icon className={`w-8 h-8 ${config.colorClass}`} />
          <div>
            <p className={`text-lg font-bold ${config.colorClass}`}>{config.label}</p>
            <p className="text-sm text-muted-foreground">Assessment complete</p>
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-5 rounded-xl bg-card border border-border">
          <h2 className="font-semibold text-foreground mb-2">Recommendation</h2>
          <p className="text-foreground leading-relaxed">{recommendation}</p>
        </div>

        {/* Possible Conditions */}
        {possibleConditions.length > 0 && (
          <div className="p-5 rounded-xl bg-card border border-border">
            <h2 className="font-semibold text-foreground mb-3">Possible Conditions</h2>
            <ul className="space-y-2">
              {possibleConditions.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-3 italic">
              These are not diagnoses. Please consult a healthcare professional.
            </p>
          </div>
        )}

        {/* Confidence */}
        <div className="p-5 rounded-xl bg-card border border-border">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-foreground">Confidence</h2>
            <span className="text-sm font-medium text-primary">{Math.round(confidence * 100)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${confidence * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={handleNewAssessment}
          className="w-full py-6 text-base rounded-xl"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New Assessment
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center px-4">
          This is not a diagnosis. Seek professional care if symptoms persist or worsen.
        </p>
      </motion.div>
    </div>
  );
};

export default Results;
