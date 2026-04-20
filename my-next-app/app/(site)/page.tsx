import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center overflow-hidden bg-neutral-950 px-4">
      {/* Animated gradient bg */}
      <div
        className="pointer-events-none absolute inset-0 yh-hero-shine bg-gradient-to-br from-red-950/25 via-neutral-950 to-black"
        aria-hidden
      />
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-red-900/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-red-950/10 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="yh-animate-up yh-delay-1 mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
          Discover products{" "}
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            you'll love.
          </span>
        </h1>
        <p className="yh-animate-up yh-delay-2 mx-auto mt-6 max-w-md text-base leading-relaxed text-neutral-400">
          Browse our collection of high-quality items carefully selected to meet
          your every need.
        </p>
        <div className="yh-animate-up yh-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition duration-200 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-800/50"
          >
            Shop now
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex rounded-lg border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition duration-200 hover:border-white/30 hover:bg-white/10"
          >
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}
