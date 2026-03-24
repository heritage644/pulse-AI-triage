import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProgressBar from "@/components/ProgressBar";
import { useTriage } from "@/context/TriageContext";
import { triageApi } from "@/services/api";
import { Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FollowUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const ctx = useTriage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [collectedAnswers, setCollectedAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const questions = ctx.questions;

  if (!questions.length || !ctx.sessionId) {
    navigate("/assess");
    return null;
  }

  const isLast = currentIdx === questions.length - 1;

  const handleNext = async () => {
    if (!currentAnswer.trim()) {
      toast({ title: "Please provide an answer", variant: "destructive" });
      return;
    }

    const newAnswers = [...collectedAnswers, { question: questions[currentIdx], answer: currentAnswer.trim() }];

    if (isLast) {
      setLoading(true);
      try {
        const result = await triageApi.answer({
          sessionId: ctx.sessionId!,
          answers: newAnswers,
        });
        ctx.setAnswers(newAnswers);
        ctx.setResult(result);
        navigate("/results");
      } catch (err) {
        toast({
          title: "Something went wrong",
          description: err instanceof Error ? err.message : "Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setCollectedAnswers(newAnswers);
      setCurrentAnswer("");
      setCurrentIdx((i) => i + 1);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-xl mx-auto">
      <ProgressBar current={1} total={3} labels={["Symptoms", "Questions", "Results"]} />

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Question {currentIdx + 1} of {questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">{questions[currentIdx]}</h2>

          <Input
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
            placeholder="Type your answer..."
            className="py-6 text-base"
            autoFocus
          />

          <Button
            onClick={handleNext}
            disabled={loading || !currentAnswer.trim()}
            className="w-full py-6 text-base rounded-xl"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {isLast ? "Get Results" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FollowUp;
