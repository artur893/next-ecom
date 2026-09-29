import { BagIcon } from "@/components/icons";
import { OrderListItem } from "@/types/order";

function formatTransactionDate(value: string) {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function TransactionList({
  orders,
}: {
  orders: OrderListItem[];
}) {
  return (
    <div className="min-w-0 flex-1">
      <span className="block w-1/2 border-b-2 border-primary-500 pb-4 text-center text-paragraph-l font-medium text-primary-500">
        Transaction
      </span>

      {orders.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-md border border-gray-800 bg-neutral-900 p-6"
            >
              <div className="flex items-center gap-3">
                <BagIcon width={26} height={26} className="shrink-0" />
                <span className="text-paragraph-m text-neutral-300">
                  {formatTransactionDate(order.createdAt)}
                </span>
              </div>

              <p className="mt-4 text-paragraph-l text-[#FCFCFC]">
                Your order nr {order.invoiceNumber}
              </p>

              <ul className="mt-2 list-disc pl-10 text-paragraph-m text-[#FCFCFC]">
                {order.items.map((item) => (
                  <li key={item.id}>{item.product.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-paragraph-m text-neutral-400">
          You don&apos;t have any transactions yet.
        </p>
      )}
    </div>
  );
}
