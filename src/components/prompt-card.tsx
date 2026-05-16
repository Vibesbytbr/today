"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, LogOut } from "lucide-react";
import { ActionButtons } from "./action-buttons";
import { NoteEditor } from "./note-editor";
import { BibleReaderModal } from "./bible-reader-modal";
import { AuthModal } from "./auth-modal";
import { getDayOfYear } from "@/lib/prompt-cycle";
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

  const dayOfYear = getDayOfYear(new Date(prompt.date));
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
        className="w-full max-w-lg mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-5xl font-semibold text-warm-900 leading-snug tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {prompt.actionPrompt}
          </motion.h1>
        </div>

        <motion.div
          className="bg-white rounded-2xl border border-warm-200 p-6 md:p-8 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb-6">
            <p className="prose-scripture text-xl md:text-2xl text-warm-800 leading-relaxed italic">
              &ldquo;{prompt.scriptureText}&rdquo;
            </p>
          </div>

          <button
            onClick={() => setShowBible(true)}
            className="group inline-flex items-center gap-1.5 text-sm text-warm-500 hover:text-sage-600 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>{prompt.scriptureRef}</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

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
            <p className="text-xs text-warm-400 mt-2 text-center">
              Saving...
            </p>
          )}

          {!session?.user?.id && (
            <p className="text-xs text-warm-400 mt-6 text-center border-t border-warm-100 pt-5">
              Sign up to save notes and track your journey
            </p>
          )}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-warm-400">
            Day {dayOfYear} of 365
          </p>
          <p className="text-xs text-warm-400 mt-1">
            {promptDate}
          </p>
          {session?.user && (
            <button
              onClick={() => signOut()}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-warm-400 hover:text-warm-600 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              Sign out
            </button>
          )}
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
