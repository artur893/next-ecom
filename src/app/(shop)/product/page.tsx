import Link from "next/link";
import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  ProductCard,
  CategoryPriceFilters,
  SortAndShowControls,
} from "@/app/components/ui";
import { ArrowRightIcon } from "@/app/components/icons";

const DEFAULT_LIMIT = 9;

interface ProductListResponse {
  products: {
    id: number;
    name: string;
    price: number;
    originalPrice: number | null;
    images: string[];
    category: { name: string };
  }[];
  total: number;
}

async function fetchProducts(query: URLSearchParams) {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const host = headerList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/product?${query.toString()}`,
    {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać listy produktów");
  }

  return (await response.json()) as ProductListResponse;
}

function getPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const keep = new Set(
    [1, 2, 3, total - 2, total - 1, total, current].filter(
      (page) => page >= 1 && page <= total,
    ),
  );
  const sorted = [...keep].sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) result.push("ellipsis");
    result.push(page);
    previous = page;
  }
  return result;
}

export default async function ProductList({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const limit = params.limit ? Number(params.limit) : DEFAULT_LIMIT;
  const currentPage = params.page ? Number(params.page) : 1;
  const offset = (currentPage - 1) * limit;

  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.minPrice) query.set("minPrice", params.minPrice);
  if (params.maxPrice) query.set("maxPrice", params.maxPrice);
  if (params.sort) query.set("sort", params.sort);
  query.set("limit", String(limit));
  if (offset) query.set("offset", String(offset));

  const [{ products, total }, categories] = await Promise.all([
    fetchProducts(query),
    prisma.category.findMany(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  function buildPageHref(page: number) {
    const query = new URLSearchParams();
    if (params.category) query.set("category", params.category);
    if (params.minPrice) query.set("minPrice", params.minPrice);
    if (params.maxPrice) query.set("maxPrice", params.maxPrice);
    if (params.sort) query.set("sort", params.sort);
    if (params.limit) query.set("limit", params.limit);
    if (page > 1) query.set("page", String(page));
    const qs = query.toString();
    return `/product${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex gap-10">
      <aside className="w-64 shrink-0">
        <CategoryPriceFilters categories={categories} />
      </aside>

      <div className="w-px -my-10 bg-gray-800" />

      <section className="flex-1">
        <SortAndShowControls />

        <div className="flex flex-wrap gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              categoryName={product.category.name}
              image={product.images[0]}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 text-neutral-300"
                >
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
                currentPage === totalPages
                  ? "pointer-events-none opacity-40"
                  : ""
              }`}
            >
              Next
              <ArrowRightIcon width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
