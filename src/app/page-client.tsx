"use client";

import { useState, useCallback } from "react";
import { TodayAnimation } from "@/components/today-animation";
import { PromptCard } from "@/components/prompt-card";
import type { PromptSeed } from "@/lib/prompts-data";

interface PageClientProps {
  prompt: PromptSeed;
}

export function PageClient({ prompt }: PageClientProps) {
  const [animationDone, setAnimationDone] = useState(false);

  const handleAnimationDone = useCallback(() => {
    setAnimationDone(true);
  }, []);

  return (
    <>
      {!animationDone && <TodayAnimation onDone={handleAnimationDone} />}

      <div className="min-h-screen flex items-center justify-center pb-16">
        {animationDone && <PromptCard prompt={prompt} />}
      </div>
    </>
  );
}
