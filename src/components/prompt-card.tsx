"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ActionButtons } from "./action-buttons";
import { NoteEditor } from "./note-editor";
import { BibleReaderModal } from "./bible-reader-modal";
import { AuthModal } from "./auth-modal";
import type { DailyPrompt, PromptStatus, UserResponse } from "@/types";

interface PromptCardProps {
  prompt: DailyPrompt;
  userResponse: UserResponse | null;
}

export function PromptCard({ prompt, userResponse }: PromptCardProps) {
  const { data: session } = useSession();
  const [status, setStatus] = useState<PromptStatus | null>(
    (userResponse?.status as PromptStatus) ?? null
  );
  const [note, setNote] = useState(userResponse?.note ?? "");
  const [showNote, setShowNote] = useState(false);
  const [showBible, setShowBible] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authAction, setAuthAction] = useState("");
  const [saving, setSaving] = useState(false);

  const promptDate = new Date(prompt.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const saveResponse = useCallback(
    async (data: { status?: PromptStatus | null; note?: string }) => {
      if (!session?.user?.id) return;
      setSaving(true);
      try {
        await fetch(`/api/respond/${prompt.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error("Failed to save", e);
      } finally {
        setSaving(false);
      }
    },
    [session, prompt.id]
  );

  const handleStatusChange = (newStatus: PromptStatus) => {
    if (!session?.user?.id) {
      setAuthAction("mark-status");
      setShowAuth(true);
      return;
    }
    const next = status === newStatus ? null : newStatus;
    setStatus(next);
    saveResponse({ status: next });
  };

  const handleSaveNote = () => {
    if (!session?.user?.id) {
      setAuthAction("save-note");
      setShowAuth(true);
      return;
    }
    setShowNote(true);
  };

  const handleNoteSave = (newNote: string) => {
    setNote(newNote);
    saveResponse({ note: newNote });
  };

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
          onSaveNote={handleSaveNote}
        />

        {showNote && (
          <NoteEditor
            initialValue={note}
            onSave={handleNoteSave}
            onClose={() => setShowNote(false)}
          />
        )}

        {saving && (
          <p className="text-xs text-warm-400 mt-3 text-center">Saving...</p>
        )}

        {!session?.user?.id && (
          <p className="text-xs text-warm-400/70 mt-10 text-center">
            Sign up to save notes and track your journey
          </p>
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

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        action={authAction}
      />
    </>
  );
}
