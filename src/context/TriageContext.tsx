import React, { createContext, useContext, useState, useCallback } from "react";
import type { SeverityLevel, Duration, TriageResult } from "@/types/triage";

interface TriageState {
  sessionId: string | null;
  symptoms: string[];
  age: number | null;
  duration: Duration;
  severity: SeverityLevel | null;
  questions: string[];
  answers: { question: string; answer: string }[];
  result: TriageResult | null;
}

interface TriageContextType extends TriageState {
  setSymptoms: (s: string[]) => void;
  setAge: (a: number | null) => void;
  setDuration: (d: Duration) => void;
  setSeverity: (s: SeverityLevel | null) => void;
  setSessionId: (id: string) => void;
  setQuestions: (q: string[]) => void;
  setAnswers: (a: { question: string; answer: string }[]) => void;
  setResult: (r: TriageResult | null) => void;
  reset: () => void;
}

const initial: TriageState = {
  sessionId: null,
  symptoms: [],
  age: null,
  duration: { value: 1, unit: "days" },
  severity: null,
  questions: [],
  answers: [],
  result: null,
};

const TriageContext = createContext<TriageContextType | undefined>(undefined);

export const TriageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TriageState>(initial);

  const update = <K extends keyof TriageState>(key: K) =>
    (val: TriageState[K]) => setState((s) => ({ ...s, [key]: val }));

  const reset = useCallback(() => setState(initial), []);

  return (
    <TriageContext.Provider
      value={{
        ...state,
        setSymptoms: update("symptoms"),
        setAge: update("age"),
        setDuration: update("duration"),
        setSeverity: update("severity"),
        setSessionId: update("sessionId"),
        setQuestions: update("questions"),
        setAnswers: update("answers"),
        setResult: update("result"),
        reset,
      }}
    >
      {children}
    </TriageContext.Provider>
  );
};

export const useTriage = () => {
  const ctx = useContext(TriageContext);
  if (!ctx) throw new Error("useTriage must be used within TriageProvider");
  return ctx;
};
