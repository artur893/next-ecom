import Button from "../basics/Button";

export default function OrderSummary({
  itemCount,
  productPrice,
  productProtection,
  shippingPrice,
  shippingInsurance,
  serviceFees,
  grandTotal,
  onPayNow,
  isPaying,
}: {
  itemCount: number;
  productPrice: number;
  productProtection: number;
  shippingPrice: number;
  shippingInsurance: number;
  serviceFees: number;
  grandTotal: number;
  onPayNow: () => void;
  isPaying: boolean;
}) {
  return (
    <div className="w-full shrink-0 rounded-md border border-gray-800 bg-neutral-900 p-6 xl:max-w-90">
      <h2 className="text-paragraph-l font-medium text-[#FCFCFC]">
        Total Product
      </h2>

      <div className="mt-4 flex flex-col gap-4">
        <SummaryRow
          label={`Total Product Price (${itemCount} Item)`}
          value={productPrice}
        />
        <SummaryRow
          label="Total Product Protection"
          value={productProtection}
        />
        <SummaryRow label="Total Shipping Price" value={shippingPrice} />
        <SummaryRow label="Shipping Insurance" value={shippingInsurance} />
      </div>

      <div className="mt-4 border-t border-gray-800 pt-4">
        <h3 className="text-paragraph-m font-medium text-[#FCFCFC]">
          Transaction Fees
        </h3>
        <div className="mt-4">
          <SummaryRow label="Service Fees" value={serviceFees} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
        <span className="text-paragraph-l font-medium text-neutral-300">
          Grand total
        </span>
        <span className="text-heading-5 font-medium text-[#FCFCFC]">
          ${grandTotal.toFixed(2)}
        </span>
      </div>

      <Button
        onClick={onPayNow}
        disabled={isPaying}
        size="xl"
        className="mt-6 w-full font-medium"
      >
        {isPaying ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-paragraph-m text-neutral-300">{label}</span>
      <span className="text-paragraph-m font-medium text-[#FCFCFC]">
        ${value.toFixed(2)}
      </span>
    </div>
  );
}
