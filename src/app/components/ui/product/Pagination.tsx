import Link from "next/link";
import { ArrowRightIcon } from "@/app/components/icons";
import { getPageNumbers } from "@/lib/pagination";

export default function Pagination({
  currentPage,
  totalPages,
  buildPageHref,
}: {
  currentPage: number;
  totalPages: number;
  buildPageHref: (page: number) => string;
}) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1 text-neutral-300">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={buildPageHref(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-md text-paragraph-s ${
                page === currentPage
                  ? "bg-primary-500 text-neutral-900"
                  : "text-neutral-100"
              }`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={buildPageHref(Math.max(1, currentPage - 1))}
          aria-disabled={currentPage === 1}
          className={`flex items-center gap-2 rounded-md border border-gray-700 px-4 py-2 text-paragraph-s ${
            currentPage === 1 ? "pointer-events-none opacity-40" : ""
          }`}
        >
          <ArrowRightIcon width={16} height={16} className="rotate-180" />
          Previous
        </Link>
        <Link
          href={buildPageHref(Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          className={`flex items-center gap-2 rounded-md border border-gray-700 px-4 py-2 text-paragraph-s ${
            currentPage === totalPages ? "pointer-events-none opacity-40" : ""
          }`}
        >
          Next
          <ArrowRightIcon width={16} height={16} />
        </Link>
      </div>
    </div>
  );
}
