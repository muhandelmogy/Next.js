"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProduct, type ProductCreateInput } from "@/lib/api";
import { saveCreatedProductLocally } from "@/lib/created-product-storage";

const defaultForm: ProductCreateInput = {
  title: "",
  description: "",
  price: 0,
  brand: "",
  category: "",
  stock: 0,
  thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
};

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProductCreateInput>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const created = await createProduct({
        title: form.title.trim(),
        description: form.description?.trim() || "—",
        price: form.price,
        brand: form.brand?.trim() || "Generic",
        category: form.category?.trim() || "general",
        stock: form.stock,
        thumbnail: form.thumbnail?.trim() || defaultForm.thumbnail,
      });
      saveCreatedProductLocally(created);
      router.push(`/products/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not list this product.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15";

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="mx-auto max-w-xl px-6 py-14 sm:px-8">
        <div className="mb-10">
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-emerald-400"
          >
            ← Back to Catalog
          </Link>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white">
            List a Product
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Fill in the details — we'll add it to the catalog right away.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="title" placeholder="Product title *" required value={form.title} onChange={handleChange} className={inputClass} />
          <textarea name="description" placeholder="Description" rows={4} value={form.description} onChange={handleChange} className={inputClass} />
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="number" name="price" placeholder="Price ($)" min={0} step="0.01" value={form.price === 0 ? "" : form.price} onChange={handleChange} className={inputClass} />
            <input type="number" name="stock" placeholder="Stock qty" min={0} value={form.stock === 0 ? "" : form.stock} onChange={handleChange} className={inputClass} />
          </div>
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className={inputClass} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className={inputClass} />
          <input name="thumbnail" placeholder="Thumbnail URL" type="url" value={form.thumbnail} onChange={handleChange} className={inputClass} />

          {error && (
            <p className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-2.5 text-sm text-emerald-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 rounded-full bg-emerald-500 py-3 text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-emerald-900/25 transition hover:bg-emerald-400 disabled:opacity-50"
          >
            {saving ? "Listing…" : "Publish Product →"}
          </button>
        </form>
      </div>
    </div>
  );
}
