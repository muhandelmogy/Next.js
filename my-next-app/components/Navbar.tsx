"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Catalog" },
    { href: "/about", label: "Our Story" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Main bar — dark with very subtle bottom border glow */}
      <div className="bg-[#0f0f0f]/95 backdrop-blur-lg border-b border-white/[0.06]">
        <nav className="mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
          <Logo variant="onDark" href="/" />

          {/* Desktop: pill-group nav */}
          <ul className="hidden items-center gap-1 md:flex rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative inline-flex h-8 items-center rounded-full px-4 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                      active
                        ? "bg-emerald-500/20 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.25)]"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-[1.5px] left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-emerald-400/60" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 transition duration-200 hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:text-emerald-300 sm:inline-flex"
            >
              Sign In
            </Link>

            {/* Mobile toggle — text-based, no icon box */}
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-widest text-zinc-400 transition hover:text-white md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer — slides down, full-width panel */}
      <div
        className={`absolute w-full bg-[#111]/98 backdrop-blur-xl md:hidden border-b border-white/[0.06] transition-all duration-300 ease-out ${
          open ? "max-h-72 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-6 gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 border-t border-white/[0.06]">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold uppercase tracking-widest text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
