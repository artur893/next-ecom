import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { CheckIcon } from "@/app/components/icons";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="flex items-start gap-2 text-gray-300 text-sm">
          <div className="relative mt-1 h-5 w-5 shrink-0">
            <input
              ref={ref}
              type="checkbox"
              className={`peer h-5 w-5 appearance-none rounded-md border bg-base-shark checked:border-primary-500 checked:bg-primary-500 ${
                error ? "border-danger-500" : "border-gray-700"
              } ${className}`}
              {...props}
            />
            <CheckIcon
              width={14}
              height={14}
              className="pointer-events-none absolute inset-0 m-auto hidden text-neutral-900 peer-checked:block"
            />
          </div>
          {label && <span className="text-neutral-100">{label}</span>}
        </label>
        {error && <p className="text-danger-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
