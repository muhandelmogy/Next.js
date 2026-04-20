import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-blue-500 bg-neutral-900 shadow-md transition duration-300 ease-out hover:-translate-y-1 hover:border-neutral-600 hover:shadow-xl hover:shadow-black/40">
      <div className="relative overflow-hidden bg-blue-500">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className="h-[200px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-neutral-950/80 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-neutral-300 backdrop-blur-sm">
          {product.category}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-white">
          {product.title}
        </h3>
        <p className="text-xs text-neutral-500">{product.brand}</p>
        <p className="text-lg font-black text-red-400">${product.price}</p>
        <div className="pt-1">
          <Link
            href={`/products/${product.id}`}
            className="block rounded-lg border border-white/10 bg-white/5 py-2 text-center text-xs font-semibold text-white transition duration-200 hover:border-red-500/50 hover:bg-red-950/40 hover:text-red-300"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}
