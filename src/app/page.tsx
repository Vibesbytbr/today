"use client";

import { useEffect, useState, useCallback } from "react";
import { TodayAnimation } from "@/components/today-animation";
import { PromptCard } from "@/components/prompt-card";
import type { DailyPrompt, UserResponse } from "@/types";

export default function Home() {
  const [animationDone, setAnimationDone] = useState(false);
  const [prompt, setPrompt] = useState<DailyPrompt | null>(null);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPrompt = useCallback(async () => {
    try {
      const res = await fetch("/api/prompt/today");
      const data = await res.json();
      if (data.prompt) {
        setPrompt(data.prompt);
        setUserResponse(data.userResponse ?? null);
      }
    } catch (e) {
      console.error("Failed to fetch prompt:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompt();
  }, [fetchPrompt]);

  const handleAnimationDone = useCallback(() => {
    setAnimationDone(true);
  }, []);

  return (
    <>
      {!animationDone && <TodayAnimation onDone={handleAnimationDone} />}

      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center pb-16">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-sage-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : prompt ? (
          <PromptCard prompt={prompt} userResponse={userResponse} />
        ) : (
          <p className="text-warm-400 text-sm">
            Could not load today&rsquo;s prompt.
          </p>
        )}
      </div>
    </>
  );
}
