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
    const MAX_ATTEMPTS = 30;

    const poll = async () => {
      try {
        const res = await fetch(`${API_BASE}/triage/${sessionId}/result`, {
          headers: { "Cache-Control": "no-cache" },
        });

        if (!res.ok) {
          throw new Error("Unable to retrieve assessment.");
        }

        const response = await res.json();
        // Handle both wrapped and direct response formats
        const payload = response.data ?? response;

        // Check for completion using multiple possible fields
        const isReady = 
          response.ready === true ||
          payload.ready === true ||
          payload.status === "COMPLETED" ||
          response.status === "COMPLETED";

        if (!isReady) {
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
          timerRef.current = setTimeout(poll, 2000);
          return;
        }

        // Extract assessment from wherever it exists in the response
        const assessment = 
          response.assessment ??
          payload.assessment ??
          payload;

        setResult({
          riskLevel: (assessment.riskLevel || "low").toLowerCase(),
          recommendation: Array.isArray(assessment.recommendations)
            ? assessment.recommendations.join("\n")
            : assessment.recommendations || assessment.explanation || "",
          possibleConditions: assessment.possibleConditions ?? [],
          confidence: Number(assessment.confidence) ?? 0.9,
        });

        // Small delay ensures context update propagates before navigation
        setTimeout(() => {
          if (isMounted) navigate("/results");
        }, 100);

      } catch (err) {
        console.error("Polling error:", err);
        if (!isMounted) return;

        toast({
          title: "Something went wrong",
          description: err instanceof Error ? err.message : "Unable to retrieve assessment.",
          variant: "destructive",
        });
        navigate("/");
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
          This usually takes between <strong>5 and 15 seconds</strong>.
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingAssessment;