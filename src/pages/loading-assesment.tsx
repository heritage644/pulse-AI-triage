import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTriage } from "@/context/TriageContext";

const API_BASE = "https://ai-triage-api-4.onrender.com/api";

const LoadingAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sessionId, setResult } = useTriage();

  const [status, setStatus] = useState("Analyzing your responses...");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    let isMounted = true;
    let attempts = 0;
    // 24 attempts * 5000ms = 120 seconds total polling window
    const MAX_ATTEMPTS = 24;
    const POLL_INTERVAL_MS = 5000;

    const poll = async () => {
      try {
        const res = await fetch(`${API_BASE}/triage/${sessionId}/result`, {
          headers: { "Cache-Control": "no-cache" },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const response = await res.json();
        const data = response.data ?? response;

        if (!isMounted) return;

        if (!data?.ready) {
          attempts++;

          if (attempts >= MAX_ATTEMPTS) {
            toast({
              title: "Assessment is taking longer than expected",
              description: "Please try again in a few moments.",
              variant: "destructive",
            });
            navigate("/");
            return;
          }

          setStatus("AI is analyzing your symptoms...");
          timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
          return;
        }

        // Assessment is ready
        const assessment = data.assessment || {};

        setResult({
          riskLevel: (assessment.riskLevel || "low").toLowerCase(),
          recommendation: Array.isArray(assessment.recommendations)
            ? assessment.recommendations.join("\n")
            : assessment.recommendations || "",
          possibleConditions: assessment.possibleConditions ?? [],
          confidence: assessment.confidence ?? 0.9,
        });

        timerRef.current = setTimeout(() => {
          if (isMounted) navigate("/results");
        }, 100);
      } catch (err) {
        console.warn("Polling attempt encountered an error:", err);

        if (!isMounted) return;

        attempts++;

        // Retry on network/rate-limit error unless max attempts are reached
        if (attempts < MAX_ATTEMPTS) {
          timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          toast({
            title: "Something went wrong",
            description:
              err instanceof Error
                ? err.message
                : "Unable to retrieve assessment.",
            variant: "destructive",
          });
          navigate("/");
        }
      }
    };

    poll();

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sessionId, setResult, navigate, toast]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="flex justify-center mb-6"
        >
          <Loader2 className="h-16 w-16 text-blue-600" />
        </motion.div>

        <h1 className="text-2xl font-bold mb-3">
          Preparing Your Assessment
        </h1>

        <p className="text-muted-foreground mb-8">
          We're reviewing your responses and preparing your personalized
          assessment.
        </p>

        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span>Symptoms submitted</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span>Follow-up answers received</span>
          </div>

          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span>{status}</span>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          This usually takes between <strong>30 and 60 seconds</strong>.
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingAssessment;