import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTriage } from "@/context/TriageContext";
import type { RiskLevel } from "@/types/triage";

const API_BASE = "https://ai-triage-api-4.onrender.com/api";
const POLL_INTERVAL = 2000;
const MAX_ATTEMPTS = 30;

const VALID_RISK_LEVELS: RiskLevel[] = ["low", "moderate", "high", "emergency"];

function normalizeRiskLevel(value: unknown): RiskLevel {
  const lower = String(value ?? "").toLowerCase();
  return (VALID_RISK_LEVELS as string[]).includes(lower)
    ? (lower as RiskLevel)
    : "low";
}

const LoadingAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sessionId, setResult } = useTriage();

  const [status, setStatus] = useState("AI is analyzing your symptoms...");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneRef = useRef(false);
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!sessionId) {
      navigate("/", { replace: true });
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    doneRef.current = false;
    attemptsRef.current = 0;

    const scheduleNextPoll = () => {
      if (cancelled || doneRef.current) return;

      timeoutRef.current = setTimeout(() => {
        void poll();
      }, POLL_INTERVAL);
    };

    const poll = async () => {
      if (cancelled || doneRef.current) return;

      try {
        const res = await fetch(`${API_BASE}/triage/${sessionId}/result`, {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!res.ok) {
          throw new Error("Unable to retrieve assessment.");
        }

        const response = await res.json();
        const data = response?.data ?? response;

        const ready = Boolean(data?.ready) || data?.status === "COMPLETED";

        if (!ready) {
          attemptsRef.current += 1;

          if (attemptsRef.current >= MAX_ATTEMPTS) {
            toast({
              title: "Assessment is taking longer than expected",
              description: "Please try again in a few moments.",
              variant: "destructive",
            });

            navigate("/", { replace: true });
            return;
          }

          setStatus("AI is analyzing your symptoms...");
          scheduleNextPoll();
          return;
        }

        doneRef.current = true;

        const assessment = data?.assessment ?? {};

        const recommendationRaw =
          assessment.recommendation ??
          assessment.recommendations ??
          "";

        const possibleConditionsRaw =
          assessment.possibleConditions ??
          assessment.possible_conditions ??
          [];

        const riskLevelRaw =
          assessment.riskLevel ??
          assessment.risk_level ??
          data?.riskLevel ??
          data?.risk_level ??
          "low";

        const confidenceRaw =
          assessment.confidence ??
          data?.confidence ??
          0.9;

        const confidenceNumber = Number(confidenceRaw);
        const normalizedConfidence =
          Number.isFinite(confidenceNumber)
            ? confidenceNumber > 1
              ? Math.min(confidenceNumber / 100, 1)
              : Math.max(confidenceNumber, 0)
            : 0.9;

        flushSync(() => {
          setResult({
            riskLevel: normalizeRiskLevel(riskLevelRaw),
            recommendation: Array.isArray(recommendationRaw)
              ? recommendationRaw.join("\n")
              : String(recommendationRaw || ""),
            possibleConditions: Array.isArray(possibleConditionsRaw)
              ? possibleConditionsRaw
              : [],
            confidence: normalizedConfidence,
          });
        });

        navigate("/results", { replace: true });
      } catch (err) {
        if (cancelled) return;

        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Polling error:", err);

        attemptsRef.current += 1;

        if (attemptsRef.current < MAX_ATTEMPTS) {
          setStatus("Still processing your assessment...");
          scheduleNextPoll();
          return;
        }

        toast({
          title: "Something went wrong",
          description:
            err instanceof Error
              ? err.message
              : "Unable to retrieve assessment.",
          variant: "destructive",
        });

        navigate("/", { replace: true });
      }
    };

    void poll();

    return () => {
      cancelled = true;
      doneRef.current = true;
      controller.abort();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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
          We&apos;re reviewing your responses and preparing your personalized
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