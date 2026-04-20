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
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-950 px-4 py-16 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(127,29,29,0.15),_transparent_60%)]"
        aria-hidden
      />
      <p className="relative text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
        Error
      </p>
      <h1 className="relative text-7xl font-black text-red-500">500</h1>
      <h2 className="relative text-2xl font-bold text-white">
        Something went wrong
      </h2>
      <p className="relative max-w-md text-sm leading-relaxed text-neutral-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="relative flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/25 transition hover:-translate-y-0.5 hover:bg-red-500"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
