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
      setFetchError("Invalid product id");
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
    if (!confirm("Are you sure you want to delete this product?")) return;
    if (isSessionOnly) {
      clearCreatedProductLocally(Number(id));
      router.push("/products");
      return;
    }
    setActionError(null);
    try {
      await deleteProduct(Number(id));
      alert("Product deleted!");
      router.push("/products");
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const inputClass =
    "rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20";

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-neutral-950 px-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
        <p className="text-sm font-medium text-neutral-500">Loading…</p>
      </div>
    );
  }

  if (fetchError || !product) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <p className="font-semibold text-white">{fetchError ?? "Product not found"}</p>
          <p className="mt-3 text-sm text-neutral-500">
            New products from &quot;Add product&quot; are not stored by DummyJSON
            for GET — add again and we&apos;ll keep a copy in your session.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            All products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="yh-animate-up mb-8 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-neutral-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </button>

        {isSessionOnly && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-3 text-sm text-neutral-300">
            <strong className="text-red-400">Session-only product.</strong> DummyJSON
            does not expose this id on GET after create — you&apos;re seeing the
            copy saved in your browser. Edit/Update on the server is disabled.
          </div>
        )}

        {actionError && (
          <p className="mb-6 rounded-lg border border-red-500/20 bg-red-950/20 px-4 py-3 text-sm text-red-400">
            {actionError}
          </p>
        )}

        <div className="yh-animate-up grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900 shadow-xl">
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
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={handleUpdate} className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500">
                    Save (PUT)
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="w-fit rounded-full border border-white/10 bg-neutral-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-300">
                  {product.category}
                </span>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  {product.title}
                </h1>
                <p className="text-neutral-500">Brand: {product.brand}</p>
                <p className="text-4xl font-black text-red-400">${product.price}</p>
                <p className="leading-relaxed text-neutral-400">{product.description}</p>
                <p className="text-sm text-neutral-500">
                  ⭐ {product.rating ?? "—"} · Stock: {product.stock ?? "—"}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {!isSessionOnly && (
                    <button type="button" onClick={() => setEditing(true)} className="rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                      Edit
                    </button>
                  )}
                  <button type="button" onClick={handleDelete} className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500">
                    {isSessionOnly ? "Remove from session" : "Delete"}
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
