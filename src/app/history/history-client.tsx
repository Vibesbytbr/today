"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { HistoryList } from "@/components/history-list";
import { FilterBar } from "@/components/filter-bar";
import { getUnlockedDays } from "@/lib/prompts-data";
import { getResponses, getStartDate } from "@/lib/storage";
import type { PromptWithResponse } from "@/types";

export function HistoryClient() {
  const [filter, setFilter] = useState("all");

  const prompts = useMemo((): PromptWithResponse[] => {
    const start = getStartDate();
    if (!start) return [];

    const days = getUnlockedDays(start);
    const responses = getResponses();

    return days.map(({ prompt, dateKey, date }) => {
      const r = responses[dateKey];
      return {
        id: `prompt-${dateKey}`,
        date: date.toISOString(),
        actionPrompt: prompt.actionPrompt,
        scriptureRef: prompt.scriptureRef,
        scriptureText: prompt.scriptureText,
        sortOrder: prompt.sortOrder,
        userResponse: r
          ? {
              id: `resp-${dateKey}`,
              userId: "",
              promptId: `prompt-${dateKey}`,
              status: r.status,
              note: r.note,
              createdAt: date.toISOString(),
              updatedAt: date.toISOString(),
            }
          : null,
      };
    });
  }, []);

  const filtered = prompts.filter((p) => {
    if (filter === "all") return true;
    if (filter === "none") return !p.userResponse?.status;
    return p.userResponse?.status === filter;
  });

  return (
    <motion.div
      className="max-w-lg mx-auto px-5 pt-20 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-warm-400 hover:text-warm-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-light text-warm-800">Your History</h1>
      </div>

      <div className="mb-5">
        <FilterBar current={filter} onChange={setFilter} />
      </div>

      {prompts.length === 0 ? (
        <p className="text-warm-400 text-sm text-center py-12">
          Come back tomorrow to start your history.
        </p>
      ) : (
        <HistoryList prompts={filtered} />
      )}
    </motion.div>
  );
}
