"use client";

import { useState, useEffect, useCallback } from "react";
import { TodayAnimation } from "@/components/today-animation";
import { PromptCard } from "@/components/prompt-card";
import { getResponse, getStartDate, setStartDate } from "@/lib/storage";
import { formatDateKey } from "@/lib/prompts-data";
import type { PromptSeed } from "@/lib/prompts-data";

interface PageClientProps {
  prompt: PromptSeed;
}

export function PageClient({ prompt }: PageClientProps) {
  const [animationDone, setAnimationDone] = useState(false);
  const initialResponse = getResponse(formatDateKey(new Date()));

  useEffect(() => {
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
        {animationDone && (
          <PromptCard prompt={prompt} initialResponse={initialResponse} />
        )}
      </div>
    </>
  );
}
