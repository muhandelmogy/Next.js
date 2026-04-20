export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a] py-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">
            © {new Date().getFullYear()} Grove Market
          </p>
          <p className="text-xs text-zinc-700 tracking-wide">
            Curated goods — no noise, no clutter.
          </p>
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-emerald-600/60">
            <span className="h-1 w-1 rounded-full bg-emerald-500/60" />
            Est. 2024
          </span>
        </div>
      </div>
    </footer>
  );
}
