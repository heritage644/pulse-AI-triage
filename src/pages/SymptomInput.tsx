import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SymptomTagInput from "@/components/SymptomTagInput";
import SeveritySelector from "@/components/SeveritySelector";
import ProgressBar from "@/components/ProgressBar";
import { useTriage } from "@/context/TriageContext";
import { triageApi } from "@/services/api";
import type { DurationUnit } from "@/types/triage";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SymptomInput = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const ctx = useTriage();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!ctx.symptoms.length) e.symptoms = "Add at least one symptom";
    if (!ctx.age || ctx.age <= 0 || ctx.age >= 120) e.age = "Enter a valid age (1-119)";
    if (!ctx.duration.value || ctx.duration.value <= 0) e.duration = "Enter a valid duration";
    if (!ctx.severity) e.severity = "Select a severity level";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
      console.log(
        {
           symptoms: ctx.symptoms,
        age: ctx.age!,
        duration: ctx.duration,
        severity: ctx.severity!
        }
      )
    setLoading(true);
    try {
      const res = await triageApi.start({
        symptoms: ctx.symptoms,
        age: ctx.age!,
        duration: ctx.duration,
        severity: ctx.severity!,
      });
      ctx.setSessionId(res.sessionId);
      ctx.setQuestions(res.questions);
      navigate("/FollowUp");
    
    } catch (err) {
      toast({
        title: "Nothing went wrong",
        description: err instanceof Error ? err.message : "Please try again in 1min.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen    px-4 py-8 max-w-xl mx-auto">
      <ProgressBar current={0} total={3} labels={["Symptoms", "Questions", "Results"]} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Describe Your Symptoms</h1>
          <p className="text-muted-foreground text-sm">Provide details so we can assess your situation.</p>
        </div>

        <SymptomTagInput  symptoms={ctx.symptoms} onChange={ctx.setSymptoms} error={errors.symptoms} />

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Age</label>
          <Input
            type="number"
            min={1}
            max={119}
            placeholder="Enter your age"
            value={ctx.age ?? ""}
            onChange={(e) => ctx.setAge(e.target.value ? Number(e.target.value) : null)}
            className={errors.age ? "border-destructive" : ""}
          />
          {errors.age && <p className="text-sm text-destructive mt-1">{errors.age}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
          <div className="flex gap-3">
            <Input
              type="number"
              min={1}
              placeholder="How long?"
              value={ctx.duration.value || ""}
              onChange={(e) =>
                ctx.setDuration({ ...ctx.duration, value: Number(e.target.value) })
              }
              className={`flex-1 ${errors.duration ? "border-destructive" : ""}`}
            />
            <Select
              value={ctx.duration.unit}
              onValueChange={(v) => ctx.setDuration({ ...ctx.duration, unit: v as DurationUnit })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.duration && <p className="text-sm text-destructive mt-1">{errors.duration}</p>}
        </div>

        <SeveritySelector value={ctx.severity} onChange={ctx.setSeverity} error={errors.severity} />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-6 text-base rounded-xl"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default SymptomInput;
