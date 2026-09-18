import { Button, SuccessCheck } from "@/app/components/ui";
import ProductImageFrame from "@/app/components/ui/product/ProductImageFrame";
import { getOrder } from "@/data/getOrder";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function OrderConfirmation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(Number(id));

  return (
    <div className="mx-auto mt-16 max-w-140">
      <div className="rounded-md border border-gray-800 bg-neutral-900 p-8">
        <div className="flex flex-col items-center text-center">
          <SuccessCheck />
          <h1 className="mt-6 text-heading-5 font-medium text-[#FCFCFC]">
            Thanks for Your Order!
          </h1>
          <p className="mt-2 text-paragraph-s text-neutral-400">
            {order.invoiceNumber}
          </p>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6">
          <span className="text-paragraph-m font-medium text-[#FCFCFC]">
            Transaction Date
          </span>
          <p className="mt-2 text-paragraph-m text-neutral-300">
            {dateFormatter.format(new Date(order.createdAt))}
          </p>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6">
          <span className="text-paragraph-m font-medium text-[#FCFCFC]">
            Payment Method
          </span>
          <p className="mt-2 text-paragraph-m text-neutral-300">
            {order.paymentMethod}
          </p>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6">
          <span className="text-paragraph-m font-medium text-[#FCFCFC]">
            Shipping Method
          </span>
          <p className="mt-2 text-paragraph-m text-neutral-300">
            {order.shippingMethod}
          </p>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6">
          <span className="text-paragraph-m font-medium text-[#FCFCFC]">
            Your Order
          </span>

          <div className="mt-3 flex flex-col gap-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-4 rounded-md border border-gray-800 p-4 xs:flex-row xs:items-stretch"
              >
                <ProductImageFrame
                  src={item.product.images[0]}
                  alt={item.product.name}
                  sizes="172px"
                  className="h-34.5 w-43 shrink-0"
                  innerClassName="p-2"
                />

                <div className="flex w-full min-w-0 flex-1 flex-col">
                  <p className="text-heading-7 font-medium text-[#FCFCFC]">
                    {item.product.name}
                  </p>
                  <span className="mt-2 inline-block w-fit rounded bg-primary-500 px-2 py-1 text-paragraph-s font-medium text-primary-100">
                    {item.product.category.name}
                  </span>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-heading-6 font-medium text-[#FCFCFC]">
                      ${item.price.toFixed(2)}
                    </p>
                    <span className="text-paragraph-l font-medium text-[#FCFCFC]">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-gray-800 pt-6">
          <SummaryRow
            label={`Total Product Price (${order.items.reduce((sum, item) => sum + item.quantity, 0)} Item)`}
            value={order.productTotal}
          />
          <SummaryRow
            label="Total Product Protection"
            value={order.productProtection}
          />
          <SummaryRow label="Total Shipping Price" value={order.shippingPrice} />
          <SummaryRow
            label="Shipping Insurance"
            value={order.shippingInsurance}
          />
        </div>

        <div className="mt-4 border-t border-gray-800 pt-4">
          <h2 className="text-paragraph-m font-medium text-[#FCFCFC]">
            Transaction Fees
          </h2>
          <div className="mt-4">
            <SummaryRow label="Service Fees" value={order.serviceFees} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
          <span className="text-paragraph-l font-medium text-neutral-300">
            Grand total
          </span>
          <span className="text-heading-5 font-medium text-[#FCFCFC]">
            ${order.grandTotal.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-paragraph-m text-neutral-300">Status</span>
          <span className="rounded bg-[#295B40] px-3 py-1 text-paragraph-s font-medium text-success-100">
            {order.status}
          </span>
        </div>

        <Button href="/home" size="xl" className="mt-6 w-full font-medium">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 xs:flex-row xs:items-center xs:justify-between xs:gap-0">
      <span className="text-paragraph-m text-neutral-300">{label}</span>
      <span className="text-paragraph-m font-medium text-[#FCFCFC]">
        ${value.toFixed(2)}
      </span>
    </div>
  );
}
