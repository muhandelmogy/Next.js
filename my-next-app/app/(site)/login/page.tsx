"use client";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logged in as: ${form.email}`);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center bg-neutral-950 px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(127,29,29,0.2),_transparent_55%)]"
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-neutral-900 p-10 shadow-2xl shadow-black/60 yh-animate-up">
        <div className="mb-8 flex justify-center">
          <Logo variant="onDark" href="/" />
        </div>
        <h2 className="text-center text-2xl font-black text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Sign in to your account
        </p>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
