"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
}

export function AuthModal({ isOpen, onClose, action }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-warm-100 text-warm-400"
        >
          <X className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-semibold text-warm-800 mt-2">
          {action === "save-note"
            ? "Save your thoughts"
            : action === "mark-status"
            ? "Track your journey"
            : "Join the journey"}
        </h2>
        <p className="text-warm-500 mt-2 text-sm leading-relaxed">
          {action === "save-note"
            ? "Create an account to save notes and look back on what God has been teaching you."
            : "Sign up to track which prompts resonated with you and see your growth over time."}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href="/login"
            className="w-full py-2.5 rounded-xl bg-sage-500 text-white font-medium text-sm hover:bg-sage-600 transition-colors"
          >
            Sign up free
          </a>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-warm-200 text-warm-600 text-sm font-medium hover:bg-warm-50 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
