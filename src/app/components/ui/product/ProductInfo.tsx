import { ShieldCheckIcon } from "@/app/components/icons";
import { ProductDetail } from "@/lib/types/product";
import ProductDescription from "./ProductDescription";

export default function ProductInfo({
  product,
  deliveryRange,
}: {
  product: ProductDetail;
  deliveryRange: string;
}) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-8 md:w-106.75 xl:h-125">
      <div>
        <h1 className="text-heading-5 font-medium text-[#FCFCFC]">
          {product.name}
        </h1>
        <span className="mt-4 inline-block rounded bg-primary-500 px-2 py-1 text-paragraph-s font-medium text-primary-100">
          {product.category.name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-heading-4 font-medium text-[#FCFCFC]">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-paragraph-m text-neutral-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      <ProductDescription description={product.description} />

      <div>
        <span className="block text-paragraph-l font-medium text-neutral-300">
          Shipping Available
        </span>
        <div className="mt-3 inline-flex items-start gap-3 rounded-md border border-[#FCFCFC] px-4 py-3">
          <ShieldCheckIcon width={24} height={24} className="shrink-0" />
          <div>
            <p className="text-paragraph-m font-medium text-[#FCFCFC]">
              NexusHub Courier
            </p>
            <p className="text-paragraph-m text-neutral-100">
              Estimated arrival {deliveryRange}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
