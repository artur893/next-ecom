import BaseIcon, { IconProps } from "../BaseIcon";

export default function MinusIcon(props: IconProps) {
  return (
    <BaseIcon strokeWidth={1.5} viewBox="0 0 24 24" {...props}>
      <path d="M4 12H20" />
    </BaseIcon>
  );
}
