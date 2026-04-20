import Link from "next/link";

// BUG FIX: was min-h-[60vh] with no background — this renders in root layout
// (no Navbar/Footer), so it needs to fill the full screen with its own bg.
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-950 px-4 py-20 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(127,29,29,0.12),_transparent_60%)]"
        aria-hidden
      />
      <p className="relative text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
        Not found
      </p>
      <h1 className="relative text-7xl font-black text-white">404</h1>
      <h2 className="relative text-2xl font-bold text-neutral-300">
        Page not found
      </h2>
      <p className="relative max-w-sm text-sm leading-relaxed text-neutral-500">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="relative rounded-lg bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:-translate-y-0.5 hover:bg-red-500"
      >
        Go home
      </Link>
    </div>
  );
}
