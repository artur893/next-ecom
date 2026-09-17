import {
  Breadcrumb,
  ProductGallery,
  ProductDescription,
  ProductPurchasePanel,
} from "@/app/components/ui";
import { ShieldCheckIcon } from "@/app/components/icons";
import { getProduct } from "@/data/getProduct";
import { getEstimatedDeliveryRange } from "@/lib/deliveryDate";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  const deliveryRange = getEstimatedDeliveryRange();

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Product", href: "/product" },
          { label: product.name },
        ]}
      />

      <section className="mt-6 flex flex-wrap items-start gap-8 xl:flex-nowrap">
        <ProductGallery images={product.images} name={product.name} />

        <div className="basis-full md:hidden" aria-hidden="true" />

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

        <div className="basis-full xl:hidden" aria-hidden="true" />

        <ProductPurchasePanel
          productId={product.id}
          price={product.price}
          stock={product.stock}
        />
      </section>
    </div>
  );
}
