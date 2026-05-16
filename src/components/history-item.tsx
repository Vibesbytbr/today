"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { BibleReaderModal } from "./bible-reader-modal";
import type { PromptWithResponse } from "@/types";
import { cn } from "@/lib/cn";

interface HistoryItemProps {
  prompt: PromptWithResponse;
}

const statusConfig = {
  DONE: { label: "Done", class: "bg-sage-100 text-sage-700" },
  HARD: { label: "Hard", class: "bg-ember-100 text-ember-700" },
  NOT_RELEVANT: {
    label: "Not Relevant",
    class: "bg-warm-100 text-warm-600",
  },
} as const;

export function HistoryItem({ prompt }: HistoryItemProps) {
  const [showBible, setShowBible] = useState(false);
  const response = prompt.userResponse;
  const statusInfo = response?.status
    ? statusConfig[response.status as keyof typeof statusConfig]
    : null;

  return (
    <>
      <div className="bg-white rounded-xl border border-warm-100 p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-warm-400">
              {new Date(prompt.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-warm-800 font-medium mt-0.5">
              {prompt.actionPrompt}
            </p>
            <button
              onClick={() => setShowBible(true)}
              className="mt-1 inline-flex items-center gap-1 text-xs text-warm-400 hover:text-sage-600 transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              {prompt.scriptureRef}
            </button>
            {response?.note && (
              <p className="mt-2 text-sm text-warm-500 italic bg-warm-50 rounded-lg p-2.5">
                &ldquo;{response.note}&rdquo;
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            {statusInfo ? (
              <span
                className={cn(
                  "inline-block px-2.5 py-1 rounded-full text-xs font-medium",
                  statusInfo.class
                )}
              >
                {statusInfo.label}
              </span>
            ) : (
              <span className="inline-block px-2.5 py-1 rounded-full text-xs text-warm-400 bg-warm-50 border border-dashed border-warm-200">
                No response
              </span>
            )}
          </div>
        </div>
      </div>

      <BibleReaderModal
        isOpen={showBible}
        onClose={() => setShowBible(false)}
        passageRef={prompt.scriptureRef}
      />
    </>
  );
}
