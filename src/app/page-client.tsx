"use client";

import { useState, useEffect, useCallback } from "react";
import { TodayAnimation } from "@/components/today-animation";
import { PromptCard } from "@/components/prompt-card";
import { getResponse, getStartDate, setStartDate } from "@/lib/storage";
import { getTodayPrompt, formatDateKey } from "@/lib/prompts-data";
import type { PromptSeed } from "@/lib/prompts-data";
import type { SavedResponse } from "@/lib/storage";

export function PageClient() {
  const [animationDone, setAnimationDone] = useState(false);
  const [prompt, setPrompt] = useState<PromptSeed | null>(null);
  const [initialResponse, setInitialResponse] = useState<SavedResponse | null>(null);

  useEffect(() => {
    setPrompt(getTodayPrompt());
    setInitialResponse(getResponse(formatDateKey(new Date())));
    if (!getStartDate()) {
      setStartDate(formatDateKey(new Date()));
    }
  }, []);

  const handleAnimationDone = useCallback(() => {
    setAnimationDone(true);
  }, []);

  return (
    <>
      {!animationDone && <TodayAnimation onDone={handleAnimationDone} />}

      <div className="min-h-screen flex items-center justify-center pb-16">
        {animationDone && prompt && (
          <PromptCard prompt={prompt} initialResponse={initialResponse} />
        )}
      </div>
    </>
  );
}
