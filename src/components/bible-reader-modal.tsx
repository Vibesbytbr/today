"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import {
  getTranslations,
  getOsisBookId,
  getBibleChapterUrl,
  type TranslationId,
} from "@/lib/book-ids";
import { cn } from "@/lib/cn";

interface BibleReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  passageRef: string;
}

function renderVerseParts(parts: unknown[]): string {
  return parts
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && "text" in part) {
        const p = part as { text: string; poem?: number };
        const prefix = p.poem ? '<span class="block ml-4">' : "";
        const suffix = p.poem ? "</span>" : "";
        return `${prefix}${p.text}${suffix}`;
      }
      if (
        part &&
        typeof part === "object" &&
        "lineBreak" in (part as Record<string, unknown>)
      ) {
        return "<br>";
      }
      return "";
    })
    .join(" ");
}

function renderChapterContent(content: unknown[]): string {
  return content
    .map((item) => {
      if (!item || typeof item !== "object") return "";
      const i = item as Record<string, unknown>;
      if (i.type === "heading") {
        const text = Array.isArray(i.content) ? i.content[0] : "";
        return `<h3 class="font-semibold text-warm-800 text-lg mt-6 mb-3">${text}</h3>`;
      }
      if (i.type === "verse") {
        const verseNum = i.number ?? "";
        const parts = Array.isArray(i.content) ? i.content : [];
        return `<p class="mb-2 leading-relaxed"><sup class="text-warm-400 text-xs mr-1 select-none">${verseNum}</sup>${renderVerseParts(parts)}</p>`;
      }
      if (i.type === "line_break") return "<br>";
      return "";
    })
    .join("\n");
}

function parseRef(
  ref: string
): { book: string; chapter: string; verse: string } | null {
  const match = ref.match(/^(\d?\s?\w+)\s+(\d+):(\d+)/i);
  if (!match) return null;
  return { book: match[1].trim(), chapter: match[2], verse: match[3] };
}

function formatBookName(raw: string): string {
  const booksMap: Record<string, string> = {
    "1 samuel": "1 Samuel",
    "2 samuel": "2 Samuel",
    "1 kings": "1 Kings",
    "2 kings": "2 Kings",
    "1 chronicles": "1 Chronicles",
    "2 chronicles": "2 Chronicles",
    "1 corinthians": "1 Corinthians",
    "2 corinthians": "2 Corinthians",
    "1 thessalonians": "1 Thessalonians",
    "2 thessalonians": "2 Thessalonians",
    "1 timothy": "1 Timothy",
    "2 timothy": "2 Timothy",
    "1 peter": "1 Peter",
    "2 peter": "2 Peter",
    "1 john": "1 John",
    "2 john": "2 John",
    "3 john": "3 John",
  };
  return booksMap[raw.toLowerCase()] || raw;
}

export function BibleReaderModal({
  isOpen,
  onClose,
  passageRef,
}: BibleReaderModalProps) {
  const [translation, setTranslation] = useState<TranslationId>("BSB");
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTranslations, setShowTranslations] = useState(false);
  const fetchId = useRef(0);

  const parsed = useMemo(() => parseRef(passageRef), [passageRef]);
  const displayBook = parsed ? formatBookName(parsed.book) : "";
  const displayChapter = parsed?.chapter ?? "";
  const displayVerse = parsed?.verse ?? "";

  useEffect(() => {
    if (!isOpen || !parsed) return;

    const id = ++fetchId.current;
    const bookId = getOsisBookId(parsed.book);

    if (!bookId) {
      setError("Could not find this book");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setContent(null);

    fetch(
      getBibleChapterUrl(translation, bookId, parseInt(parsed.chapter))
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (id !== fetchId.current) return;
        const html = renderChapterContent(data.chapter.content);
        setContent(html);
      })
      .catch(() => {
        if (id !== fetchId.current) return;
        setError("Could not load this passage. Try another translation.");
      })
      .finally(() => {
        if (id !== fetchId.current) return;
        setLoading(false);
      });
  }, [isOpen, passageRef, translation, parsed]);

  const translations = getTranslations();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-warm-100">
              <div>
                <h2 className="text-lg font-semibold text-warm-800">
                  {displayBook} {displayChapter}
                </h2>
                {displayVerse && (
                  <p className="text-sm text-warm-500">
                    Verse {displayVerse} highlighted
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-warm-100 text-warm-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative px-4 pt-3 pb-2">
              <button
                onClick={() => setShowTranslations(!showTranslations)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-warm-200 text-sm text-warm-700 bg-warm-50 hover:bg-warm-100"
              >
                {translations.find((t) => t.id === translation)?.name ??
                  translation}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {showTranslations && (
                <div className="absolute top-12 left-4 z-10 bg-white border border-warm-200 rounded-xl shadow-lg overflow-hidden">
                  {translations.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTranslation(t.id);
                        setShowTranslations(false);
                      }}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-warm-50 transition-colors",
                        t.id === translation
                          ? "bg-sage-50 text-sage-700 font-medium"
                          : "text-warm-700"
                      )}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-2">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="w-6 h-6 border-2 border-sage-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {error && (
                <p className="text-ember-600 text-center py-8 text-sm">
                  {error}
                </p>
              )}
              {content && (
                <div
                  className="prose-scripture text-warm-800 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: content.replace(
                      new RegExp(
                        `verse-${displayVerse}\\b|data-verse="${displayVerse}"`,
                        "g"
                      ),
                      (match) =>
                        `${match} class="bg-amber-100 rounded px-0.5 font-medium"`
                    ),
                  }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
