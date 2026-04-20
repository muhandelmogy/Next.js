import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161616] shadow-lg transition duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/25 hover:shadow-emerald-950/40 hover:shadow-xl">
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-800">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={320}
          height={240}
          className="h-[220px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
        />
        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-md border border-emerald-500/20 bg-black/70 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-5">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-zinc-100">
          {product.title}
        </h3>
        <p className="text-[0.7rem] font-medium uppercase tracking-widest text-zinc-600">
          {product.brand}
        </p>
        <div className="flex items-center justify-between pt-1">
          <p className="text-xl font-black text-white">
            <span className="mr-0.5 text-sm font-semibold text-emerald-400">$</span>
            {product.price}
          </p>
          {product.rating && (
            <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-zinc-500">
              <span className="text-emerald-500">★</span>
              {product.rating}
            </span>
          )}
        </div>
        <Link
          href={`/products/${product.id}`}
          className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-300 transition duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
        >
          View Item
          <span className="text-emerald-500 transition group-hover:translate-x-0.5" aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
