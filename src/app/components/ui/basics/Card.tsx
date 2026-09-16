import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  icon?: ReactNode;
  image?: string | null;
  label: string;
  href?: string;
  className?: string;
}

export default function Card({
  icon,
  image,
  label,
  href,
  className = "",
}: CardProps) {
  const content = (
    <>
      {icon}
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={label} className="h-16 w-auto max-w-[70%]" />
      )}
      <h3 className="mt-2 text-heading-6 font-medium">{label}</h3>
    </>
  );

  const baseClassName = `flex flex-col items-center justify-center gap-3 rounded-md border border-[#616674] bg-neutral-900 ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {content}
      </Link>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}
