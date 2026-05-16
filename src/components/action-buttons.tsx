"use client";

import { motion } from "framer-motion";
import { Book, Bookmark, Check, Flame } from "lucide-react";
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
  const buttons: Array<{
    value: PromptStatus;
    label: string;
    icon: typeof Check;
    activeClass: string;
  }> = [
    {
      value: "DONE",
      label: "I did this",
      icon: Check,
      activeClass: "bg-sage-500 text-white border-sage-500",
    },
    {
      value: "HARD",
      label: "This was hard",
      icon: Flame,
      activeClass: "bg-ember-500 text-white border-ember-500",
    },
    {
      value: "NOT_RELEVANT",
      label: "Not for me",
      icon: Book,
      activeClass: "bg-warm-300 text-warm-800 border-warm-300",
    },
  ];

  return (
    <motion.div
      className="flex flex-wrap gap-3 mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {buttons.map((btn) => {
        const Icon = btn.icon;
        const isActive = currentStatus === btn.value;
        return (
          <button
            key={btn.value}
            onClick={() => onStatusChange(btn.value)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full border border-warm-200 text-sm font-medium transition-all duration-200 hover:shadow-sm",
              isActive
                ? btn.activeClass
                : "bg-white text-warm-700 hover:bg-warm-100"
            )}
          >
            <Icon className="w-4 h-4" />
            {btn.label}
          </button>
        );
      })}
      <button
        onClick={onSaveNote}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-warm-200 text-sm font-medium transition-all duration-200 bg-white text-warm-700 hover:bg-warm-100 hover:shadow-sm"
      >
        <Bookmark className="w-4 h-4" />
        Save Note
      </button>
    </motion.div>
  );
}
