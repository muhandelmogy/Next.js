import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0f0f0f] px-4 py-20 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.05),transparent_60%)]"
        aria-hidden
      />
      <p className="relative text-[0.65rem] font-bold uppercase tracking-[0.35em] text-zinc-600">
        Lost your way?
      </p>
      <h1 className="relative text-8xl font-black text-white">404</h1>
      <div className="relative h-px w-16 bg-emerald-500/40" />
      <h2 className="relative text-xl font-black tracking-tight text-white">
        Nothing here
      </h2>
      <p className="relative max-w-sm text-sm leading-relaxed text-zinc-600">
        This page doesn&apos;t exist or may have been moved. Head back to the catalog.
      </p>
      <Link
        href="/"
        className="relative rounded-full bg-emerald-500 px-8 py-3 text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400"
      >
        Return Home
      </Link>
    </div>
  );
}
