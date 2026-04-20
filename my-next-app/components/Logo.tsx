import Link from "next/link";

type LogoProps = {
  variant?: "onDark" | "onLight";
  showWordmark?: boolean;
  href?: string | null;
  className?: string;
};

export default function Logo({
  variant = "onDark",
  showWordmark = true,
  href = "/",
  className = "",
}: LogoProps) {
  const isDark = variant === "onDark";
  const nameClass = isDark ? "text-white" : "text-zinc-950";
  const tagClass = isDark ? "text-emerald-400" : "text-emerald-600";

  const content = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* Hexagonal mark */}
      <span
        className="relative grid h-9 w-9 shrink-0 place-items-center transition duration-300 group-hover:scale-105"
        aria-hidden
      >
        <svg viewBox="0 0 36 36" fill="none" className="absolute inset-0 h-full w-full">
          <path
            d="M18 2 L32 10 L32 26 L18 34 L4 26 L4 10 Z"
            fill="rgba(52,211,153,0.12)"
            stroke="#34d399"
            strokeWidth="1.5"
          />
        </svg>
        <span className="relative text-[0.6rem] font-black tracking-widest text-emerald-400">
          GR
        </span>
      </span>

      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`text-sm font-black tracking-[0.15em] uppercase ${nameClass}`}>
            Grove
          </span>
          <span className={`text-[0.55rem] font-semibold uppercase tracking-[0.3em] ${tagClass}`}>
            Market
          </span>
        </span>
      )}
    </span>
  );

  const wrapClass =
    "group inline-flex rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

  if (href) {
    return (
      <Link href={href} className={wrapClass}>
        {content}
      </Link>
    );
  }

  return <span className={`group ${wrapClass}`}>{content}</span>;
}
