import { CheckIcon } from "../icons";

export default function SuccessCheck() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-success-500">
      <CheckIcon width={32} height={32} className="text-success-500" />
    </div>
  );
}
