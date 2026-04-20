"use client";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

function ProductsView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const selectedCategory = searchParams.get("category") ?? "";
  const selectedBrand = searchParams.get("brand") ?? "";

  const setQuery = useCallback(
    (key: "category" | "brand", value: string) => {
      const p = new URLSearchParams(searchParams.toString());
      if (value) p.set(key, value);
      else p.delete(key);
      const q = p.toString();
      router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    setLoadError(null);
    fetch("https://dummyjson.com/products?limit=100")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch the catalog");
        return r.json();
      })
      .then((data) => {
        setProducts(data.products as Product[]);
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoadError(e.message);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((x) => x.category))].sort(),
    [products]
  );
  const brands = useMemo(
    () =>
      [...new Set(products.map((x) => x.brand).filter(Boolean) as string[])].sort(),
    [products]
  );

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedBrand) result = result.filter((p) => p.brand === selectedBrand);
    return result;
  }, [products, selectedCategory, selectedBrand]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#0f0f0f] px-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-emerald-500" />
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
          Loading catalog…
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-lg bg-[#0f0f0f] px-4 py-20 text-center">
        <p className="font-semibold text-emerald-400">{loadError}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 transition hover:bg-white/10"
        >
          Try again
        </button>
      </div>
    );
  }

  const selectClass =
    "rounded-xl border border-white/[0.08] bg-[#1a1a1a] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-300 shadow-sm transition hover:border-white/15 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/15";

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="yh-animate-up">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-emerald-500">
              Grove Market
            </p>
            <h1 className="mt-1.5 text-4xl font-black tracking-tight text-white">
              Full Catalog
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              {products.length} items · {categories.length} categories
            </p>
          </div>
          <Link
            href="/products/new"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-emerald-400 transition hover:bg-emerald-500/20"
          >
            + List an Item
          </Link>
        </div>

        {/* Filters */}
        <div className="yh-animate-up yh-delay-1 mb-8 flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setQuery("category", e.target.value)}
            className={selectClass}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setQuery("brand", e.target.value)}
            className={selectClass}
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {(selectedCategory || selectedBrand) && (
            <button
              type="button"
              onClick={() => router.push(pathname, { scroll: false })}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-500 transition hover:border-white/15 hover:text-zinc-300"
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Count */}
        <p className="yh-animate-up yh-delay-2 mb-8 text-xs font-semibold uppercase tracking-widest text-zinc-700">
          Showing{" "}
          <span className="text-emerald-400">{filtered.length}</span> results
          {(selectedCategory || selectedBrand) && (
            <span className="ml-2 text-zinc-800">
              · {selectedCategory || "any"} · {selectedBrand || "any"}
            </span>
          )}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={`yh-animate-up ${
                i % 3 === 0 ? "yh-delay-1" : i % 3 === 1 ? "yh-delay-2" : "yh-delay-3"
              }`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsFallback() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#0f0f0f] px-4">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-emerald-500" />
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
        Preparing filters…
      </p>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsView />
    </Suspense>
  );
}
