import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.75rem)] items-center justify-center overflow-hidden bg-[#0f0f0f] px-4">
      {/* Background: subtle emerald radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(52,211,153,0.07),transparent)]"
        aria-hidden
      />
      {/* Corner grid decoration */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Eyebrow */}
        <span className="yh-animate-up inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 yh-glow-pulse" />
          New Arrivals — Spring 2025
        </span>

        <h1 className="yh-animate-up yh-delay-1 mt-7 text-5xl font-black tracking-tight text-white sm:text-7xl">
          Shop with{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-green-500 bg-clip-text text-transparent yh-hero-shine">
            intention.
          </span>
        </h1>

        <p className="yh-animate-up yh-delay-2 mx-auto mt-6 max-w-md text-base leading-relaxed text-zinc-500">
          Grove curates only what's worth your attention — fewer products,
          higher standards, zero filler.
        </p>

        <div className="yh-animate-up yh-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-8 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-lg shadow-emerald-900/30 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-800/40"
          >
            Browse Catalog
            <span aria-hidden>↗</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-8 py-3 text-sm font-bold uppercase tracking-widest text-zinc-400 transition duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            Our Philosophy
          </Link>
        </div>
      </div>
    </section>
  );
}
