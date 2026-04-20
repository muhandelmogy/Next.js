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
        if (!r.ok) throw new Error("Failed to load products");
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
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-neutral-950 px-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
        <p className="text-sm font-medium text-neutral-500">Loading products…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-lg bg-neutral-950 px-4 py-20 text-center">
        <p className="font-semibold text-red-400">{loadError}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="yh-animate-up">
            <h1 className="text-3xl font-black tracking-tight text-white">
              All products
            </h1>
            {/* BUG FIX: was just "results." — now shows real count */}
            <p className="mt-2 text-neutral-500">
              {products.length} items across {categories.length} categories
            </p>
          </div>
          <Link
            href="/products/new"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:-translate-y-0.5 hover:bg-red-500"
          >
            + Add product
          </Link>
        </div>

        {/* Filters */}
        <div className="yh-animate-up yh-delay-1 mb-8 flex flex-wrap items-center gap-3">
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setQuery("category", e.target.value)}
            className="rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:border-white/20 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            id="filter-brand"
            value={selectedBrand}
            onChange={(e) => setQuery("brand", e.target.value)}
            className="rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:border-white/20 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => router.push(pathname, { scroll: false })}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Clear filters
          </button>
        </div>

        {/* Count */}
        <p className="yh-animate-up yh-delay-2 mb-8 text-sm text-neutral-500">
          <span className="font-semibold text-white">{filtered.length}</span> products found
          {(selectedCategory || selectedBrand) && (
            <span className="ml-2 text-neutral-600">
              (category: {selectedCategory || "any"} · brand:{" "}
              {selectedBrand || "any"})
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
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-neutral-950 px-4">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
      <p className="text-sm font-medium text-neutral-500">Preparing filters…</p>
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
