import BaseIcon, { IconProps } from "./BaseIcon";

export default function UpArrowIcon(props: IconProps) {
  return (
    <>
      <BaseIcon {...props}>
        <path d="M20 15L12 7L4 15" />
      </BaseIcon>
    </>
  );
}
