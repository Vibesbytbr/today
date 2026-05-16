import type { PromptWithResponse } from "@/types";
import { HistoryItem } from "./history-item";

interface HistoryListProps {
  prompts: PromptWithResponse[];
}

export function HistoryList({ prompts }: HistoryListProps) {
  if (prompts.length === 0) {
    return (
      <p className="text-center text-warm-400 py-8 text-sm">
        No prompts yet. Come back tomorrow!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {prompts.map((prompt) => (
        <HistoryItem key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
