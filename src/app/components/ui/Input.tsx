import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, rightIcon, className = "", ...props },
    ref,
  ) => {
    return (
      <div>
        {label && <label className="text-lg">{label}</label>}
        <div className={`relative ${label ? "mt-4" : ""}`}>
          <input
            ref={ref}
            className={`w-full p-3 rounded-md bg-base-shark text-white border ${
              error ? "border-danger-500" : "border-gray-700"
            } ${rightIcon ? "pr-12" : ""} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center text-neutral-300">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className="text-danger-500 text-xs mt-1 min-h-4">
            {error ?? <span className="text-neutral-100">{helperText}</span>}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
