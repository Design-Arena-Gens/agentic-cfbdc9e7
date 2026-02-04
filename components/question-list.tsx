"use client";

import { useMemo } from "react";
import type { Question } from "@/lib/questions";

type QuestionListProps = {
  questions: Question[];
  activeId: string;
  onSelect: (id: string) => void;
  searchTerm: string;
};

const difficultyPalette: Record<Question["difficulty"], string> = {
  beginner: "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/20",
  intermediate: "bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-400/20",
  advanced: "bg-rose-500/10 text-rose-300 ring-1 ring-inset ring-rose-400/20"
};

export function QuestionList({ questions, activeId, onSelect, searchTerm }: QuestionListProps) {
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return questions;
    const lowered = searchTerm.toLowerCase();
    return questions.filter((question) => {
      return (
        question.title.toLowerCase().includes(lowered) ||
        question.summary.toLowerCase().includes(lowered) ||
        question.tags.some((tag) => tag.toLowerCase().includes(lowered))
      );
    });
  }, [questions, searchTerm]);

  return (
    <div className="space-y-2">
      {filtered.map((question) => {
        const isActive = question.id === activeId;
        return (
          <button
            key={question.id}
            type="button"
            onClick={() => onSelect(question.id)}
            className={`w-full rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
              isActive ? "ring-2 ring-sky-400" : "hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-100">{question.title}</h3>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${difficultyPalette[question.difficulty]}`}>
                {question.difficulty}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300/80">{question.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        );
      })}
      {!filtered.length && (
        <div className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
          No questions match your search yet.
        </div>
      )}
    </div>
  );
}
