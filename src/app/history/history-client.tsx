"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { HistoryList } from "@/components/history-list";
import { FilterBar } from "@/components/filter-bar";
import type { PromptWithResponse } from "@/types";

export function HistoryClient() {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState<PromptWithResponse[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/responses")
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data.prompts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = prompts.filter((p) => {
    if (filter === "all") return true;
    if (filter === "none") return !p.userResponse?.status;
    return p.userResponse?.status === filter;
  });

  return (
    <motion.div
      className="max-w-lg mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-warm-400 hover:text-warm-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-2xl font-light text-warm-900">Your History</h1>
      </div>

      <div className="mb-4">
        <FilterBar current={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-sage-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <HistoryList prompts={filtered} />
      )}

      {session?.user && (
        <div className="mt-8 text-right">
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1.5 text-xs text-warm-400 hover:text-warm-600 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            Sign out
          </button>
        </div>
      )}
    </motion.div>
  );
}
