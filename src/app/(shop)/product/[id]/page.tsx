import Image from "next/image";
import { AddToCartButton } from "@/app/components/ui";
import { getProduct } from "@/data/getProduct";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  return (
    <section className="mt-16 flex gap-12">
      <div className="relative h-100 w-100 shrink-0 rounded-md bg-base-white">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="400px"
            className="object-contain p-10"
          />
        )}
      </div>
      <div>
        <span className="inline-block rounded bg-primary-500 px-2 py-1 text-paragraph-xs font-medium text-neutral-900">
          {product.category.name}
        </span>
        <h1 className="mt-4 text-heading-4 font-semibold">{product.name}</h1>
        {product.brand && (
          <p className="mt-2 text-paragraph-s text-neutral-300">
            Brand: {product.brand.name}
          </p>
        )}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-heading-6 font-semibold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-paragraph-m text-neutral-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="mt-6 max-w-md text-paragraph-m text-neutral-300">
          {product.description}
        </p>
        <div className="mt-8">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </section>
  );
}
