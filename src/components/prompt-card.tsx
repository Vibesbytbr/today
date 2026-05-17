"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ActionButtons } from "./action-buttons";
import { NoteEditor } from "./note-editor";
import { BibleReaderModal } from "./bible-reader-modal";
import { saveResponse } from "@/lib/storage";
import type { PromptSeed } from "@/lib/prompts-data";
import type { SavedResponse } from "@/lib/storage";
import type { PromptStatus } from "@/types";

interface PromptCardProps {
  prompt: PromptSeed;
  initialResponse?: SavedResponse | null;
}

export function PromptCard({ prompt, initialResponse }: PromptCardProps) {
  const [status, setStatus] = useState<PromptStatus | null>(
    initialResponse?.status ?? null
  );
  const [note, setNote] = useState(initialResponse?.note ?? "");
  const [showNote, setShowNote] = useState(false);
  const [showBible, setShowBible] = useState(false);

  const dateKey = new Date().toISOString().slice(0, 10);

  const handleStatusChange = useCallback(
    (newStatus: PromptStatus) => {
      const next = status === newStatus ? null : newStatus;
      setStatus(next);
      saveResponse(dateKey, { status: next });
    },
    [status, dateKey]
  );

  const handleNoteSave = useCallback(
    async (newNote: string) => {
      setNote(newNote);
      saveResponse(dateKey, { note: newNote });
    },
    [dateKey]
  );

  const promptDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <motion.div
        className="w-full max-w-lg mx-auto px-5 pt-16 md:pt-24"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-semibold text-warm-900 leading-snug tracking-tight text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {prompt.actionPrompt}
        </motion.h1>

        <motion.div
          className="mt-12 md:mt-14 bg-warm-100/60 rounded-2xl px-6 md:px-8 py-8 md:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <p className="prose-scripture text-lg md:text-xl text-warm-800 leading-relaxed text-center">
            &ldquo;{prompt.scriptureText}&rdquo;
          </p>
        </motion.div>

        <motion.div
          className="mt-4 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={() => setShowBible(true)}
            className="inline-flex items-center gap-1.5 text-sm text-warm-400 hover:text-sage-600 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{prompt.scriptureRef}</span>
          </button>
        </motion.div>

        <ActionButtons
          currentStatus={status}
          onStatusChange={handleStatusChange}
          onSaveNote={() => setShowNote(true)}
        />

        {showNote && (
          <NoteEditor
            initialValue={note}
            onSave={handleNoteSave}
            onClose={() => setShowNote(false)}
          />
        )}

        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm text-warm-400/60 italic">Come back tomorrow.</p>
          <p className="text-xs text-warm-300/50 mt-2">{promptDate}</p>
        </motion.div>
      </motion.div>

      <BibleReaderModal
        isOpen={showBible}
        onClose={() => setShowBible(false)}
        passageRef={prompt.scriptureRef}
      />
    </>
  );
}
