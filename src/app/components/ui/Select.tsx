import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "@/app/components/icons";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = "", children, ...props }, ref) => {
    return (
      <div>
        {label && <label className="text-lg">{label}</label>}
        <div className={`relative ${label ? "mt-4" : ""}`}>
          <select
            ref={ref}
            className={`w-full appearance-none p-3 pr-10 rounded-md bg-base-shark text-white border ${
              error ? "border-danger-500" : "border-gray-700"
            } ${className}`}
            {...props}
          >
            {children}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute inset-y-0 right-3 my-auto text-neutral-300" />
        </div>
        {error && <p className="text-danger-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
