"use client";

import type { PromptStatus } from "@/types";

interface FilterBarProps {
  current: string;
  onChange: (filter: string) => void;
}

const filters = [
  { value: "all", label: "All" },
  { value: "DONE", label: "Done" },
  { value: "HARD", label: "Hard" },
  { value: "NOT_RELEVANT", label: "Not Relevant" },
  { value: "none", label: "No Response" },
];

export function FilterBar({ current, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            current === f.value
              ? "bg-sage-500 text-white"
              : "bg-white text-warm-600 border border-warm-200 hover:bg-warm-50"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
