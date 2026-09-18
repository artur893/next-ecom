import Button from "../basics/Button";

export default function CartSummary({
  itemCount,
  subtotal,
}: {
  itemCount: number;
  subtotal: number;
}) {
  return (
    <div className="ml-9 w-[calc(100%-2.25rem)] shrink-0 rounded-md border border-gray-800 bg-neutral-900 p-6 xl:ml-0 xl:w-full xl:max-w-90">
      <h2 className="text-paragraph-l font-medium text-[#FCFCFC]">
        Total Product
      </h2>

      <div className="mt-4 flex items-center justify-between border-b border-gray-800 pb-4">
        <span className="text-paragraph-m text-neutral-300">
          Total Product Price ({itemCount} Item)
        </span>
        <span className="text-paragraph-m font-medium text-[#FCFCFC]">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-paragraph-l font-medium text-neutral-300">
          Subtotal
        </span>
        <span className="text-heading-5 font-medium text-[#FCFCFC]">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      <Button size="xl" className="mt-6 w-full font-medium">
        Checkout
      </Button>
    </div>
  );
}
