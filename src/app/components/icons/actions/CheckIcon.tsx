import BaseIcon, { IconProps } from "../BaseIcon";

export default function CheckIcon(props: IconProps) {
  return (
    <BaseIcon strokeWidth={2.5} {...props}>
      <path d="M5 13L9 17L19 7" />
    </BaseIcon>
  );
}
