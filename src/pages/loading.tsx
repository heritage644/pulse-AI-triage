import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTriage } from "@/context/TriageContext";

const API_BASE = "https://ai-triage-api-4.onrender.com/api";

const Loading = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const ctx = useTriage();
  const sessionId = ctx.sessionId;
  const setQuestions = ctx.setQuestions;

  const [status, setStatus] = useState(
    "Generating personalized follow-up questions..."
  );

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    let cancelled = false;
    let attempts = 0;
    // Allow up to 2 minutes of polling (40 attempts * 3000ms = 120s)
    const MAX_ATTEMPTS = 40; 
    const POLL_INTERVAL_MS = 3000;

    const poll = async () => {
      try {
        const res = await fetch(`${API_BASE}/triage/${sessionId}`);

        if (!res.ok) {
          throw new Error("Unable to fetch session status.");
        }

        const response = await res.json();
        const data = response.data;

        if (cancelled) return;

        if (data.status === "AWAITING_FOLLOWUP") {
          setStatus("Generating personalized follow-up questions...");
        }

        if (
          data.status === "AWAITING_ANSWERS" &&
          data.followUp?.questions
        ) {
          setStatus("Questions ready!");
          setQuestions(data.followUp.questions);

          setTimeout(() => {
            navigate("/follow-up");
          }, 800);

          return; // Stop polling on success
        }

        attempts++;

        if (attempts >= MAX_ATTEMPTS) {
          toast({
            title: "Taking longer than expected",
            description: "Please refresh or try again in a few moments.",
            variant: "destructive",
          });
          return; // Stop polling on timeout
        }

        setTimeout(poll, POLL_INTERVAL_MS);
      } catch (err) {
        if (cancelled) return;
        
        // Log error and retry instead of instantly aborting
        attempts++;
        if (attempts < MAX_ATTEMPTS) {
          setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          toast({
            title: "Something went wrong",
            description:
              err instanceof Error
                ? err.message
                : "Unable to contact the server.",
            variant: "destructive",
          });
        }
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId, setQuestions, navigate, toast]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="flex justify-center mb-6"
        >
          <Loader2 className="h-16 w-16 text-blue-600" />
        </motion.div>

        <h1 className="text-2xl font-bold mb-3">Preparing Your Assessment</h1>

        <p className="text-muted-foreground mb-8">
          We're analyzing your symptoms and generating personalized follow-up
          questions.
        </p>

        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600 w-5 h-5" />
            <span>Symptoms received</span>
          </div>

          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span>{status}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            <span>Preparing questionnaire</span>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          This usually takes between <strong>15-45 seconds</strong>.
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;