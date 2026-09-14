import { forwardRef, InputHTMLAttributes } from "react";

type ToggleProps = InputHTMLAttributes<HTMLInputElement>;

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <label className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center">
        <input
          ref={ref}
          type="checkbox"
          className={`peer sr-only ${className}`}
          {...props}
        />
        <span className="absolute inset-0 rounded-full border border-gray-700 bg-base-shark transition-colors" />
        <span className="relative left-1 h-4 w-4 rounded-full bg-neutral-400 transition-transform peer-checked:translate-x-5 peer-checked:bg-primary-500" />
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
export default Toggle;
