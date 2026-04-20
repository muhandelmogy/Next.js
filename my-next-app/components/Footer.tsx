export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-blue-500 py-8 text-center text-sm text-neutral-500">
      {/* BUG FIX: was border-neutral-200 (invisible on dark bg) — changed to border-white/[0.08] to match Navbar */}
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">ME Store</span>. All rights
        reserved.
      </p>
    </footer>
  );
}
