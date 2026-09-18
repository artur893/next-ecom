import {
  Breadcrumb,
  OrderItemCard,
  AddressSection,
  OrderSummary,
} from "@/app/components/ui";
import { ApplePayIcon, ShieldCheckIcon } from "@/app/components/icons";
import { CartItem } from "@/lib/types/cart";
import { getAddresses } from "@/data/getAddresses";

const MOCK_ITEM: CartItem = {
  id: 1,
  quantity: 10,
  product: {
    id: 1,
    name: "Rexus Xierra X16",
    category: { name: "Mouse" },
    price: 25.99,
    images: ["https://images.morele.net/i1064/4143406_14_i1064.jpg"],
  },
};

const PRODUCT_PROTECTION_PRICE = 1;
const SHIPPING_PRICE = 5;
const SHIPPING_INSURANCE = 6;
const SERVICE_FEES = 0.5;

export default async function Checkout() {
  const addresses = await getAddresses();
  const productTotal = MOCK_ITEM.product.price * MOCK_ITEM.quantity;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/home" },
          { label: "Product", href: "/product" },
          { label: MOCK_ITEM.product.name, href: `/product/${MOCK_ITEM.product.id}` },
          { label: "Checkout" },
        ]}
      />

      <div className="mt-6 flex flex-col gap-8 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">
          <h1 className="text-heading-6 font-medium text-[#FCFCFC]">
            Your Order
          </h1>
          <div className="mt-4">
            <OrderItemCard
              item={MOCK_ITEM}
              protectionPrice={PRODUCT_PROTECTION_PRICE}
            />
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
          itemCount={MOCK_ITEM.quantity}
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
