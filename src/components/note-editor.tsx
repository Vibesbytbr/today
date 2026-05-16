"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

interface NoteEditorProps {
  initialValue?: string;
  onSave: (note: string) => Promise<void>;
  onClose: () => void;
}

export function NoteEditor({
  initialValue = "",
  onSave,
  onClose,
}: NoteEditorProps) {
  const [note, setNote] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(note);
      setSaved(true);
      setTimeout(onClose, 1200);
    } catch {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className="mt-4 p-4 rounded-xl bg-white border border-warm-200"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-warm-700">Your note</label>
        <button
          onClick={onClose}
          className="text-warm-400 hover:text-warm-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full min-h-[80px] p-3 text-sm rounded-lg border border-warm-200 bg-warm-50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
        disabled={saving || saved}
      />
      <div className="mt-2">
        {saved ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-sage-600 font-medium">
            <Check className="w-4 h-4" />
            Saved
          </span>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving || !note.trim()}
            className="px-4 py-2 rounded-lg bg-sage-500 text-white text-sm font-medium hover:bg-sage-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
