export type SeverityLevel = "mild" | "moderate" | "severe" | "extreme";
export type DurationUnit = "hours" | "days" | "weeks";
export type RiskLevel = "low" | "medium" | "high" | "emergency";

export interface Duration {
  value: number;
  unit: DurationUnit;
}

export interface TriagePayload {
  symptoms: string[];
  age: number;
  duration: Duration;
  severity: SeverityLevel;
}

export interface FollowUpResponse {
  sessionId: string;
  questions: string[];
}

export interface AnswerPayload {
  sessionId: string;
  answers: { question: string; answer: string }[];
}

export interface TriageResult {
  riskLevel: RiskLevel;
  recommendation: string;
  possibleConditions: string[];
  confidence: number;
}

export interface HistoryEntry {
  id: string;
  date: string;
  symptoms: string[];
  riskLevel: RiskLevel;
  result: TriageResult;
}
