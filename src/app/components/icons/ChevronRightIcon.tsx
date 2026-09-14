import BaseIcon, { IconProps } from "./BaseIcon";

export default function ChevronRightIcon(props: IconProps) {
  return (
    <BaseIcon strokeWidth={1.5} {...props}>
      <path d="M9 6L15 12L9 18" />
    </BaseIcon>
  );
}
