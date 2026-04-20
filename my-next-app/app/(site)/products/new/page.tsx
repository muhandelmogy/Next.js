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
      setError(err instanceof Error ? err.message : "Could not create product.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="text-sm font-semibold text-neutral-400 transition hover:text-white"
          >
            ← Back to products
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white">
            Add product
          </h1>
          {/* BUG FIX: was an empty <p> tag — removed it */}
          <p className="mt-2 text-sm text-neutral-500">
            Fill in the details below to add a new product to the catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="title" placeholder="Title *" required value={form.title} onChange={handleChange} className={inputClass} />
          <textarea name="description" placeholder="Description" rows={4} value={form.description} onChange={handleChange} className={inputClass} />
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="number" name="price" placeholder="Price" min={0} step="0.01" value={form.price === 0 ? "" : form.price} onChange={handleChange} className={inputClass} />
            <input type="number" name="stock" placeholder="Stock" min={0} value={form.stock === 0 ? "" : form.stock} onChange={handleChange} className={inputClass} />
          </div>
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className={inputClass} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className={inputClass} />
          <input name="thumbnail" placeholder="Thumbnail URL" type="url" value={form.thumbnail} onChange={handleChange} className={inputClass} />

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-950/30 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 rounded-lg bg-red-600 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/25 transition hover:bg-red-500 disabled:opacity-50"
          >
            {saving ? "Creating…" : "Create product"}
          </button>
        </form>
      </div>
    </div>
  );
}
