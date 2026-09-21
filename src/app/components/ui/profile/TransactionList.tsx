import { BagIcon } from "@/app/components/icons";

export interface TransactionEntry {
  id: number;
  createdAt: string;
  invoiceNumber: string;
  productNames: string[];
}

function formatTransactionDate(value: string) {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function TransactionList({
  transactions,
}: {
  transactions: TransactionEntry[];
}) {
  return (
    <div className="min-w-0 flex-1">
      <span className="block w-1/2 border-b-2 border-primary-500 pb-4 text-center text-paragraph-l font-medium text-primary-500">
        Transaction
      </span>

      {transactions.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="rounded-md border border-gray-800 bg-neutral-900 p-6"
            >
              <div className="flex items-center gap-3">
                <BagIcon width={26} height={26} className="shrink-0" />
                <span className="text-paragraph-m text-neutral-300">
                  {formatTransactionDate(transaction.createdAt)}
                </span>
              </div>

              <p className="mt-4 text-paragraph-l text-[#FCFCFC]">
                Your order nr {transaction.invoiceNumber}
              </p>

              <ul className="mt-2 list-disc pl-10 text-paragraph-m text-[#FCFCFC]">
                {transaction.productNames.map((name, index) => (
                  <li key={`${transaction.id}-${index}`}>{name}</li>
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
