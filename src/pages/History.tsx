import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { triageApi } from "@/services/api";
import type { HistoryEntry, RiskLevel } from "@/types/triage";
import { Loader2, Calendar, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const riskColors: Record<RiskLevel, string> = {
  low: "bg-risk-low",
  medium: "bg-risk-medium",
  high: "bg-risk-high",
  emergency: "bg-risk-emergency",
};

const History = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    triageApi
      .history()
      .then(setEntries)
      .catch((err) => {
        setError(true);
        toast({
          title: "Could not load history",
          description: err instanceof Error ? err.message : "Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }, [toast]);

  return (
    <div className="min-h-screen px-4 py-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Assessment History</h1>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-muted-foreground py-20">
          Unable to load history. Please try again later.
        </p>
      )}

      {!loading && !error && entries.length === 0 && (
        <p className="text-center text-muted-foreground py-20">No assessments yet.</p>
      )}

      <div className="space-y-3">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border cursor-pointer hover:shadow-sm transition-shadow"
          >
            <span className={`w-3 h-3 rounded-full shrink-0 ${riskColors[entry.riskLevel]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {entry.symptoms.join(", ")}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {entry.date}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
