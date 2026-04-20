"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0f0f0f] px-4 py-16 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.06),transparent_60%)]"
        aria-hidden
      />
      <p className="relative text-[0.65rem] font-bold uppercase tracking-[0.35em] text-zinc-600">
        System Error
      </p>
      <h1 className="relative text-8xl font-black text-white">500</h1>
      <div className="relative h-px w-16 bg-emerald-500/40" />
      <h2 className="relative text-xl font-black tracking-tight text-white">
        Something broke on our end
      </h2>
      <p className="relative max-w-md text-sm leading-relaxed text-zinc-600">
        {error.message || "An unexpected error occurred. Our team has been notified."}
      </p>
      <div className="relative flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-emerald-500 px-7 py-2.5 text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-emerald-900/25 transition hover:bg-emerald-400"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/[0.08] bg-white/[0.04] px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition hover:border-white/15 hover:text-white"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
