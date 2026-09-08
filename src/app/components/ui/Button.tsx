import { ReactNode } from "react";

type ButtonSize = "xs" | "s" | "m" | "l" | "xl" | "xxl";
type ButtonVariant = "solid" | "outline";

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  solid: "bg-primary-500 border-none",
  outline: "text-primary-500 border border-primary-500 ",
};

const base =
  "flex items-center rounded-md hover:scale-105 transition-transform duration-200";

export default function Button({
  children,
  size = "m",
  variant = "solid",
  leftIcon,
  rightIcon,
  className,
  onClick,
}: ButtonProps) {
  const sizeClass = sizeMap[size];
  const variantClass = variantMap[variant];
  return (
    <button
      onClick={onClick}
      className={`${base} ${sizeClass} ${variantClass} ${className}`}
    >
      {leftIcon && <span className="mr-3.5">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-3.5">{rightIcon}</span>}
    </button>
  );
}
