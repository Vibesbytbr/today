export interface DailyPrompt {
  id: string;
  date: string;
  actionPrompt: string;
  scriptureRef: string;
  scriptureText: string;
  sortOrder: number;
}

export interface UserResponse {
  id: string;
  userId: string;
  promptId: string;
  status: "DONE" | "HARD" | "NOT_RELEVANT" | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PromptWithResponse extends DailyPrompt {
  userResponse: UserResponse | null;
}

export type PromptStatus = "DONE" | "HARD" | "NOT_RELEVANT";
