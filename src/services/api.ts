import type { TriagePayload, FollowUpResponse, AnswerPayload, TriageResult, HistoryEntry } from "@/types/triage";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const triageApi = {
  start: (payload: TriagePayload) =>
    request<FollowUpResponse>("/triage/start", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  answer: (payload: AnswerPayload) =>
    request<TriageResult>("/triage/answer", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  history: () => request<HistoryEntry[]>("/triage/history"),
};
