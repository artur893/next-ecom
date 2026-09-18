import { redirect } from "next/navigation";
import {
  Breadcrumb,
  OrderItemCard,
  AddressSection,
  OrderSummary,
} from "@/app/components/ui";
import { ApplePayIcon, ShieldCheckIcon } from "@/app/components/icons";
import { getAddresses } from "@/data/getAddresses";
import { getCart } from "@/data/getCart";

const PRODUCT_PROTECTION_PRICE = 1;
const SHIPPING_PRICE = 5;
const SHIPPING_INSURANCE = 6;
const SERVICE_FEES = 0.5;

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const selectedIds = params.items
    ?.split(",")
    .map(Number)
    .filter((id) => !isNaN(id));

  const [cart, addresses] = await Promise.all([getCart(), getAddresses()]);

  const items = selectedIds
    ? cart.filter((item) => selectedIds.includes(item.id))
    : cart;

  if (items.length === 0) {
    redirect("/cart");
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const productTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/home" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="mt-6 flex flex-col gap-8 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">
          <h1 className="text-heading-6 font-medium text-[#FCFCFC]">
            Your Order
          </h1>
          <div className="mt-4 flex flex-col gap-6">
            {items.map((item) => (
              <OrderItemCard
                key={item.id}
                item={item}
                protectionPrice={PRODUCT_PROTECTION_PRICE}
              />
            ))}
          </div>

          <div className="mt-10">
            <AddressSection addresses={addresses} />
          </div>

          <div className="mt-10">
            <h2 className="text-heading-6 font-medium text-[#FCFCFC]">
              Shipping
            </h2>
            <div className="mt-4 flex items-center gap-3 rounded-md border border-gray-800 bg-neutral-900 p-4">
              <ShieldCheckIcon width={24} height={24} />
              <span className="text-paragraph-m font-medium text-[#FCFCFC]">
                NexusHub Courier
              </span>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-heading-6 font-medium text-[#FCFCFC]">
              Payment Method
            </h2>
            <div className="mt-4 flex items-center gap-3 rounded-md border border-gray-800 bg-neutral-900 p-4">
              <ApplePayIcon />
              <span className="text-paragraph-m font-medium text-[#FCFCFC]">
                Apple Pay
              </span>
            </div>
          </div>
        </div>

        <OrderSummary
          itemCount={itemCount}
          productPrice={productTotal}
          productProtection={PRODUCT_PROTECTION_PRICE}
          shippingPrice={SHIPPING_PRICE}
          shippingInsurance={SHIPPING_INSURANCE}
          serviceFees={SERVICE_FEES}
          grandTotal={productTotal}
        />
      </div>
    </div>
  );
}
