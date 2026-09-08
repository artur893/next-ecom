import { ReactNode } from "react";

export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  children?: ReactNode;
}

export default function BaseIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  className = "",
  children,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}
