"use client";

import { motion } from "framer-motion";
import { Bookmark, Check, Flame } from "lucide-react";
import { cn } from "@/lib/cn";
import type { PromptStatus } from "@/types";

interface ActionButtonsProps {
  currentStatus: PromptStatus | null;
  onStatusChange: (status: PromptStatus) => void;
  onSaveNote: () => void;
}

export function ActionButtons({
  currentStatus,
  onStatusChange,
  onSaveNote,
}: ActionButtonsProps) {
  return (
    <motion.div
      className="mt-8 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <button
        onClick={() => onStatusChange("DONE")}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200",
          currentStatus === "DONE"
            ? "bg-sage-500 text-white shadow-sm"
            : "bg-sage-500/10 text-sage-700 hover:bg-sage-500/20"
        )}
      >
        <Check className="w-4 h-4" />
        I did this
      </button>

      <div className="flex gap-3">
        <button
          onClick={() => onStatusChange("HARD")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            currentStatus === "HARD"
              ? "bg-ember-500 text-white shadow-sm"
              : "border border-warm-200 text-warm-600 hover:bg-warm-100"
          )}
        >
          <Flame className="w-4 h-4" />
          This was hard
        </button>

        <button
          onClick={onSaveNote}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border border-warm-200 text-warm-600 hover:bg-warm-100"
        >
          <Bookmark className="w-4 h-4" />
          Save note
        </button>
      </div>

      <div className="flex justify-center pt-1">
        <button
          onClick={() => onStatusChange("NOT_RELEVANT")}
          className={cn(
            "text-xs transition-colors duration-200",
            currentStatus === "NOT_RELEVANT"
              ? "text-warm-500 font-medium"
              : "text-warm-400 hover:text-warm-500"
          )}
        >
          Not for me
        </button>
      </div>
    </motion.div>
  );
}
