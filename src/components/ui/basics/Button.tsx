import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import Link from "next/link";

type ButtonSize = "xs" | "s" | "m" | "l" | "xl" | "xxl";
type ButtonVariant = "solid" | "outline" | "text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
}

const sizeMap = {
  xs: "text-xs px-5 py-[6px]",
  s: "text-sm px-5 py-2",
  m: "text-sm px-5 py-[10px]",
  l: "text-base px-5 py-3",
  xl: "text-base px-5 py-[14px]",
  xxl: "text-lg px-5 py-4",
};

const variantMap = {
  solid:
    "bg-primary-400 text-neutral-900 border-none hover:bg-primary-500 active:bg-primary-500 disabled:bg-primary-300",
  outline:
    "text-primary-400 border border-primary-400 hover:text-primary-500 hover:border-primary-500 active:text-primary-500 active:border-primary-500 disabled:text-primary-300 disabled:border-primary-300",
  text: "text-primary-400 border-none hover:text-primary-500 active:text-primary-500 disabled:text-primary-300",
};

const base =
  "flex justify-center items-center rounded-md transition-colors duration-200 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "m",
      variant = "solid",
      leftIcon,
      rightIcon,
      className,
      type = "button",
      href,
      ...props
    },
    ref,
  ) => {
    const sizeClass = sizeMap[size];
    const variantClass = variantMap[variant];
    const content = (
      <>
        {leftIcon && <span className="mr-3.5">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-3.5">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={`${base} ${sizeClass} ${variantClass} ${className}`}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={`${base} ${sizeClass} ${variantClass} ${className}`}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
