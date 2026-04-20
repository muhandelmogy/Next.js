export default function AboutPage() {
  const blocks = [
    {
      title: "Our Mission",
      body: "Cut through the noise. We hand-pick every item so you don't have to scroll through thousands of mediocre options.",
      icon: "◎",
    },
    {
      title: "Our Vision",
      body: "A market you can trust — clean presentation, honest descriptions, prices that make sense.",
      icon: "◈",
    },
    {
      title: "Our Standard",
      body: "If we wouldn't buy it ourselves, it doesn't make the catalog. That's the whole filter.",
      icon: "◆",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <span className="yh-animate-up inline-block rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-emerald-400">
            About Grove
          </span>
          <h1 className="yh-animate-up yh-delay-1 mt-6 text-5xl font-black tracking-tight text-white">
            We built the store{" "}
            <span className="text-emerald-400">we wanted.</span>
          </h1>
          <p className="yh-animate-up yh-delay-2 mt-5 text-base leading-relaxed text-zinc-500">
            Most online shops are overwhelming. Grove is the opposite — a
            deliberate, tightly curated space for people who value quality
            over quantity.
          </p>
        </div>

        {/* Divider */}
        <div className="my-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-zinc-700">
            What drives us
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-3">
          {blocks.map((b, i) => (
            <div
              key={b.title}
              className={`rounded-2xl border border-white/[0.07] bg-[#161616] p-8 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-500/20 yh-animate-up ${
                i === 0 ? "yh-delay-1" : i === 1 ? "yh-delay-2" : "yh-delay-3"
              }`}
            >
              <span className="mb-5 inline-block text-2xl text-emerald-400">
                {b.icon}
              </span>
              <h3 className="text-base font-black uppercase tracking-wider text-white">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
