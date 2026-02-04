import type { Question } from "@/lib/questions";
import { CodeBlock } from "./ui/code-block";

type SolutionPanelProps = {
  question: Question;
};

export function SolutionPanel({ question }: SolutionPanelProps) {
  return (
    <section className="flex flex-col gap-6">
      <header className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80 p-8 shadow-xl shadow-sky-900/10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Prompt</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-50 lg:text-4xl">{question.title}</h1>
        <p className="mt-4 text-base text-slate-300">{question.prompt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full bg-slate-800 px-3 py-1 font-semibold text-slate-100">Answer: {question.answer}</span>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">Because: {question.justification}</span>
        </div>
      </header>

      <div className="space-y-5">
        {question.steps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-7 shadow-inner shadow-black/20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Step {index + 1}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-50">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{step.detail}</p>
            {step.code ? <CodeBlock code={step.code} className="mt-4" /> : null}
          </article>
        ))}
      </div>

      <aside className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-7">
        <h2 className="text-lg font-semibold text-slate-100">Key insights</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {question.insights.map((insight) => (
            <li key={insight} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </aside>

      {question.related.length ? (
        <aside className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-7">
          <h2 className="text-lg font-semibold text-slate-100">Explore next</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-300">
            {question.related.map((relatedId) => (
              <span key={relatedId} className="rounded-full border border-slate-700 px-3 py-1">
                {relatedId}
              </span>
            ))}
          </div>
        </aside>
      ) : null}
    </section>
  );
}
