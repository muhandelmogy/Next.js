"use client";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Welcome back: ${form.email}`);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-3.75rem)] items-center justify-center bg-[#0f0f0f] px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.06),transparent_55%)]"
        aria-hidden
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/[0.07] bg-[#141414] p-10 shadow-2xl shadow-black/60 yh-animate-up">
        <div className="mb-8 flex justify-center">
          <Logo variant="onDark" href="/" />
        </div>
        <h2 className="text-center text-2xl font-black tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-xs font-medium uppercase tracking-widest text-zinc-600">
          Sign in to your account
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            required
            autoComplete="email"
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-emerald-500 py-3 text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400"
          >
            Continue →
          </button>
        </form>

        <p className="mt-6 text-center text-[0.65rem] text-zinc-700">
          No account?{" "}
          <span className="cursor-pointer font-semibold text-emerald-500 hover:text-emerald-400 transition">
            Get started
          </span>
        </p>
      </div>
    </div>
  );
}
