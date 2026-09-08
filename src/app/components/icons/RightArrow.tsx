import BaseIcon, { IconProps } from "./BaseIcon";

export default function RightArrowIcon(props: IconProps) {
  return (
    <>
      <BaseIcon {...props}>
        <path d="M20 12L4 12M14 6L20 12L14 18" />
      </BaseIcon>
    </>
  );
}
