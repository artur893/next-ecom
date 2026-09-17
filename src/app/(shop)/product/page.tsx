import {
  ProductGrid,
  Pagination,
  CategoryPriceFilters,
  SortAndShowControls,
} from "@/app/components/ui";
import { getProducts } from "@/data/getProducts";
import { getCategories } from "@/data/getCategories";
import { buildProductFilterParams } from "@/lib/productQuery";

const DEFAULT_LIMIT = 9;

export default async function ProductList({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const limit = params.limit ? Number(params.limit) : DEFAULT_LIMIT;
  const currentPage = params.page ? Number(params.page) : 1;
  const offset = (currentPage - 1) * limit;

  const query = buildProductFilterParams(params);
  query.set("limit", String(limit));
  if (offset) query.set("offset", String(offset));

  const [{ products, total }, categories] = await Promise.all([
    getProducts(query),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  function buildPageHref(page: number) {
    const query = buildProductFilterParams(params);
    if (params.limit) query.set("limit", params.limit);
    if (page > 1) query.set("page", String(page));
    const qs = query.toString();
    return `/product${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <aside className="w-64 shrink-0">
        <CategoryPriceFilters categories={categories} />
      </aside>

      <div className="h-px bg-gray-800 lg:-my-10 lg:h-auto lg:w-px" />

      <section className="flex-1">
        <SortAndShowControls />
        <ProductGrid products={products} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          buildPageHref={buildPageHref}
        />
      </section>
    </div>
  );
}
