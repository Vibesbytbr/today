"use client";

import { useState, useCallback, useEffect } from "react";
import { TodayAnimation } from "@/components/today-animation";
import { PromptCard } from "@/components/prompt-card";
import type { DailyPrompt, UserResponse } from "@/types";

interface PageClientProps {
  prompt: DailyPrompt | null;
  userResponse: UserResponse | null;
}

export function PageClient({
  prompt: initialPrompt,
  userResponse: initialResponse,
}: PageClientProps) {
  const [animationDone, setAnimationDone] = useState(false);
  const [prompt, setPrompt] = useState<DailyPrompt | null>(initialPrompt);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(
    initialResponse
  );

  useEffect(() => {
    if (!initialPrompt) {
      fetch("/api/prompt/today")
        .then((res) => res.json())
        .then((data) => {
          if (data.prompt) {
            setPrompt(data.prompt);
            setUserResponse(data.userResponse ?? null);
          }
        })
        .catch((e) => console.error("Failed to fetch prompt:", e));
    }
  }, [initialPrompt]);

  const handleAnimationDone = useCallback(() => {
    setAnimationDone(true);
  }, []);

  return (
    <>
      {!animationDone && <TodayAnimation onDone={handleAnimationDone} />}

      <div className="min-h-screen flex items-center justify-center pb-16">
        {animationDone &&
          (prompt ? (
            <PromptCard prompt={prompt} userResponse={userResponse} />
          ) : (
            <p className="text-warm-400 text-sm">
              Could not load today&rsquo;s prompt.
            </p>
          ))}
      </div>
    </>
  );
}
