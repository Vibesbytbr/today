"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TodayAnimation({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const letters = "Today...".split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-warm-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-5xl md:text-7xl font-light tracking-wide text-warm-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
