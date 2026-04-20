"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, updateProduct, deleteProduct } from "@/lib/api";
import {
  loadCreatedProductLocally,
  clearCreatedProductLocally,
} from "@/lib/created-product-storage";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSessionOnly, setIsSessionOnly] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ title: "", price: 0, description: "" });
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const pid = Number(id);
    if (Number.isNaN(pid)) {
      setFetchError("Invalid product ID");
      setLoading(false);
      return;
    }
    let cancelled = false;
    setFetchError(null);

    async function load() {
      try {
        const remote = await getProductById(pid);
        if (cancelled) return;
        if (remote) {
          setProduct(remote);
          setEditData({ title: remote.title, price: remote.price, description: remote.description });
          setIsSessionOnly(false);
          return;
        }
        const local = loadCreatedProductLocally(pid);
        if (cancelled) return;
        if (local) {
          setProduct(local);
          setEditData({ title: local.title, price: local.price, description: local.description });
          setIsSessionOnly(true);
          return;
        }
        setFetchError("Product not found");
      } catch (e) {
        if (!cancelled) setFetchError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    setLoading(true);
    load();
    return () => { cancelled = true; };
  }, [id]);

  const handleUpdate = async () => {
    if (isSessionOnly) return;
    setActionError(null);
    try {
      const updated = await updateProduct(Number(id), editData);
      setProduct((prev) => (prev ? { ...prev, ...updated } : prev));
      setEditing(false);
      alert("Product updated!");
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Remove this product from the catalog?")) return;
    if (isSessionOnly) {
      clearCreatedProductLocally(Number(id));
      router.push("/products");
      return;
    }
    setActionError(null);
    try {
      await deleteProduct(Number(id));
      alert("Product removed.");
      router.push("/products");
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const inputClass =
    "rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15";

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#0f0f0f] px-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-emerald-500" />
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">Loading…</p>
      </div>
    );
  }

  if (fetchError || !product) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <p className="font-black text-white">{fetchError ?? "Product not found"}</p>
          <p className="mt-3 text-sm text-zinc-600">
            Items added via &quot;List a Product&quot; are session-only. Re-list the item and we&apos;ll save a local copy.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-emerald-500 px-7 py-2.5 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-400"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="yh-animate-up mb-10 text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-emerald-400"
        >
          ← Back
        </button>

        {isSessionOnly && (
          <div className="mb-8 rounded-2xl border border-emerald-500/15 bg-emerald-950/10 px-5 py-4 text-sm text-zinc-400">
            <strong className="text-emerald-400">Session-only item.</strong> This product was created locally and won&apos;t persist across refreshes. Edit/update on the server is disabled.
          </div>
        )}

        {actionError && (
          <p className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3 text-sm text-emerald-400">
            {actionError}
          </p>
        )}

        <div className="yh-animate-up grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161616] shadow-xl">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={560}
              height={420}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            {editing && !isSessionOnly ? (
              <div className="flex flex-col gap-4">
                <input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className={inputClass} placeholder="Title" />
                <input type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: +e.target.value })} className={inputClass} placeholder="Price" />
                <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className={`${inputClass} min-h-[120px]`} rows={4} placeholder="Description" />
                <div className="flex flex-wrap gap-3 pt-2">
                  <button type="button" onClick={handleUpdate} className="rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-400">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition hover:text-white">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="w-fit rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-400">
                  {product.category}
                </span>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  {product.title}
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                  by {product.brand}
                </p>
                <p className="text-5xl font-black text-white">
                  <span className="text-xl font-semibold text-emerald-400">$</span>
                  {product.price}
                </p>
                <p className="leading-relaxed text-zinc-500">{product.description}</p>
                <p className="text-xs font-semibold text-zinc-700">
                  ★ {product.rating ?? "—"} &nbsp;·&nbsp; {product.stock ?? "—"} in stock
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {!isSessionOnly && (
                    <button type="button" onClick={() => setEditing(true)} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition hover:border-emerald-500/30 hover:text-emerald-300">
                      Edit
                    </button>
                  )}
                  <button type="button" onClick={handleDelete} className="rounded-full border border-red-500/20 bg-red-950/20 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 transition hover:bg-red-950/40">
                    {isSessionOnly ? "Remove" : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
