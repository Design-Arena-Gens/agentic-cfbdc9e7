"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { QuestionList } from "@/components/question-list";
import { SolutionPanel } from "@/components/solution-panel";
import { questions } from "@/lib/questions";

export default function HomePage() {
  const defaultQuestion = questions[0];
  const [activeId, setActiveId] = useState(defaultQuestion.id);
  const [searchTerm, setSearchTerm] = useState("");

  const activeQuestion = useMemo(() => {
    return questions.find((question) => question.id === activeId) ?? defaultQuestion;
  }, [activeId, defaultQuestion]);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 pb-20 lg:flex-row">
      <div className="absolute inset-x-10 top-40 z-[-1] hidden h-[400px] rounded-full bg-sky-500/10 blur-3xl lg:block" />
      <div className="absolute inset-x-10 top-80 z-[-1] h-[320px] rounded-full bg-purple-500/10 blur-3xl" />

      <aside className="w-full shrink-0 basis-80 lg:max-w-xs">
        <div className="sticky top-10 space-y-6 lg:max-h-[80vh] lg:overflow-y-auto lg:pr-1">
          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Agentic Playbook
            </p>
            <h2 className="text-2xl font-semibold text-slate-100">
              Choose a question to reveal a guided solution
            </h2>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search problems, tags, approaches"
                className="w-full rounded-full border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                type="search"
                autoComplete="off"
              />
            </div>
          </header>
          <QuestionList
            questions={questions}
            activeId={activeId}
            onSelect={setActiveId}
            searchTerm={searchTerm}
          />
        </div>
      </aside>

      <section className="w-full flex-1 pb-10">
        <SolutionPanel question={activeQuestion} />
      </section>
    </main>
  );
}
