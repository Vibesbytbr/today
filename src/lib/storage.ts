export interface SavedResponse {
  status: "DONE" | "HARD" | "NOT_RELEVANT" | null;
  note: string | null;
}

const STORAGE_KEY = "today_responses";

export function getResponses(): Record<string, SavedResponse> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getResponse(dateKey: string): SavedResponse | null {
  return getResponses()[dateKey] ?? null;
}

export function saveResponse(
  dateKey: string,
  data: Partial<SavedResponse>
): void {
  if (typeof window === "undefined") return;
  const all = getResponses();
  all[dateKey] = { ...(all[dateKey] ?? { status: null, note: null }), ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function clearResponses(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
