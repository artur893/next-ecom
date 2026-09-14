import { ReactNode } from "react";

export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  viewBox?: string;
  children?: ReactNode;
}

export default function BaseIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  viewBox = "0 0 24 24",
  children,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}
