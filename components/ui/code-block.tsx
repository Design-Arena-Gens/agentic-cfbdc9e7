"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";

type CodeBlockProps = {
  code: string;
  className?: string;
};

export function CodeBlock({ code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trimEnd());
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  return (
    <div className={clsx("group/outer relative", className)}>
      <pre className="overflow-x-auto rounded-2xl border border-slate-800/70 bg-slate-950/90 p-5 text-sm leading-6 text-sky-100">
        <code>{code.trimEnd()}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/90 text-slate-200 opacity-0 shadow-sm transition group-hover/outer:opacity-100 hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        aria-label="Copy code snippet"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
