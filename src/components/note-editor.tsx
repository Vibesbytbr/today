"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface NoteEditorProps {
  initialValue?: string;
  onSave: (note: string) => void;
  onClose: () => void;
}

export function NoteEditor({ initialValue = "", onSave, onClose }: NoteEditorProps) {
  const [note, setNote] = useState(initialValue);

  return (
    <motion.div
      className="mt-4 p-4 rounded-xl bg-white border border-warm-200"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-warm-700">Your note</label>
        <button onClick={onClose} className="text-warm-400 hover:text-warm-600">
          <X className="w-4 h-4" />
        </button>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full min-h-[80px] p-3 text-sm rounded-lg border border-warm-200 bg-warm-50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
      />
      <button
        onClick={() => onSave(note)}
        className="mt-2 px-4 py-2 rounded-lg bg-sage-500 text-white text-sm font-medium hover:bg-sage-600 transition-colors"
      >
        Save
      </button>
    </motion.div>
  );
}
