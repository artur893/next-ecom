import BaseIcon, { IconProps } from "../BaseIcon";

export default function ShieldCheckIcon({
  color = "#4ADE80",
  ...props
}: IconProps) {
  return (
    <BaseIcon strokeWidth={1.5} viewBox="0 0 24 24" color={color} {...props}>
      <path d="M15.0003 10L11.0003 14.0001L9.00021 12M13.0695 20.5996C16.8625 18.8285 19.1656 13.8644 19.8122 9.46233C20.0323 7.96332 19.1442 6.57203 17.7891 5.89446L13.7891 3.89446C12.6629 3.3314 11.3375 3.3314 10.2113 3.89446L6.21134 5.89446C4.85621 6.57203 3.96808 7.96333 4.18825 9.46233C4.8348 13.8644 7.1379 18.8285 10.9309 20.5996C11.6077 20.9156 12.3927 20.9156 13.0695 20.5996Z" />
    </BaseIcon>
  );
}
