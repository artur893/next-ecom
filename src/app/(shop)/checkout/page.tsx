import { redirect } from "next/navigation";
import { Breadcrumb, AddressSection, CheckoutView } from "@/app/components/ui";
import { ApplePayIcon, ShieldCheckIcon } from "@/app/components/icons";
import { getAddresses } from "@/data/getAddresses";
import { getCart } from "@/data/getCart";

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

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/home" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <CheckoutView items={items}>
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
      </CheckoutView>
    </div>
  );
}
