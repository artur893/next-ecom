import {
  Breadcrumb,
  ProductGallery,
  ProductInfo,
  ProductPurchasePanel,
} from "@/app/components/ui";
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

        <ProductInfo product={product} deliveryRange={deliveryRange} />

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
