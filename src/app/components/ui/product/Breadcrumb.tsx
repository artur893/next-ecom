import Link from "next/link";
import { ChevronRightIcon } from "@/app/components/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-paragraph-m font-medium">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-neutral-400">
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? "text-neutral-100" : "text-neutral-400"}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRightIcon
                width={16}
                height={16}
                className="text-neutral-400"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
