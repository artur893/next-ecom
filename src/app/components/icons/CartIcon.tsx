import React from "react";
import IconProps from "@/lib/types/IconProps";

const CartIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = "currentColor",
  className = "",
}) => {
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
      <g transform="translate(2, 2)">
        <path d="M3.53571 2.75H16.9751C18.3403 2.75 19.3042 4.08739 18.8725 5.38246L17.2058 10.3825C16.9336 11.1991 16.1693 11.75 15.3085 11.75H4.82142M15.75 14.75H6.98459C5.98929 14.75 5.14545 14.0181 5.00469 13.0328L4.82142 11.75L3.53571 2.75L3.49531 2.46716C3.35455 1.48186 2.51071 0.75 1.51541 0.75H0.75M15.75 14.75C14.6454 14.75 13.75 15.6454 13.75 16.75C13.75 17.8546 14.6454 18.75 15.75 18.75C16.8546 18.75 17.75 17.8546 17.75 16.75C17.75 15.6454 16.8546 14.75 15.75 14.75ZM9.75 16.75C9.75 17.8546 8.85457 18.75 7.75 18.75C6.64543 18.75 5.75 17.8546 5.75 16.75C5.75 15.6454 6.64543 14.75 7.75 14.75C8.85457 14.75 9.75 15.6454 9.75 16.75Z" />
      </g>
    </svg>
  );
};

export default CartIcon;
