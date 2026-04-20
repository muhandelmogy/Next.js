export default function AboutPage() {
  const blocks = [
    {
      title: "Mission",
      body: "Make shopping straightforward — clarity first, noise never.",
      icon: "🎯",
    },
    {
      title: "Vision",
      body: "A storefront people trust: sharp visuals, honest catalog, no gimmicks.",
      icon: "🔭",
    },
    {
      title: "Values",
      body: "Quality, transparency, and respect for your time.",
      icon: "💎",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="yh-animate-up inline-block rounded-full border border-white/10 bg-blue-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
            About
          </span>
          <h1 className="yh-animate-up yh-delay-1 mt-5 text-4xl font-black tracking-tight text-white">
            me Store
          </h1>
          {/* BUG FIX: was an empty paragraph — now has real content */}
          <p className="yh-animate-up yh-delay-2 mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-400">
            A curated online store built on simplicity, trust, and a love for
            great products.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {blocks.map((b, i) => (
            <div
              key={b.title}
              className={`rounded-2xl border border-white/[0.08] bg-blue-500/5 p-8 shadow-md transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg hover:shadow-black/40 yh-animate-up ${
                i === 0 ? "yh-delay-1" : i === 1 ? "yh-delay-2" : "yh-delay-3"
              }`}
            >
              <span className="mb-4 inline-block text-2xl">{b.icon}</span>
              <h3 className="text-lg font-bold text-white">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
