import BaseIcon, { IconProps } from "./BaseIcon";

export default function CloseIcon(props: IconProps) {
  return (
    <BaseIcon strokeWidth={1.5} {...props}>
      <path d="M18 6L6 18M6 6L18 18" />
    </BaseIcon>
  );
}
