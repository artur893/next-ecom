import { prisma } from "@/lib/prisma";
import {
  ProductCard,
  Checkbox,
  Input,
  Select,
  FilterSection,
} from "@/app/components/ui";
import { ChevronDownIcon, ArrowRightIcon } from "@/app/components/icons";

const CATEGORY_FILTERS = [
  "Mouse",
  "Headphone",
  "Keyboard",
  "Monitor",
  "Webcam",
];

export default async function ProductList({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categoryId = category ? Number(category) : undefined;

  const products = await prisma.product.findMany({
    where: categoryId ? { categoryId } : undefined,
    include: { category: true },
  });

  return (
    <div className="flex gap-10">
      <aside className="w-64 shrink-0">
        <div className="pb-6 mb-6">
          <FilterSection title="Category">
            <div className="flex flex-col gap-3">
              <Checkbox label="All" defaultChecked />
              {CATEGORY_FILTERS.map((name) => (
                <Checkbox key={name} label={name} />
              ))}
            </div>
          </FilterSection>
        </div>

        <FilterSection title="Price">
          <div className="flex flex-col gap-3">
            <Input
              type="number"
              min={0}
              step="0.01"
              placeholder="Min Price"
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              rightIcon={
                <span className="flex items-center gap-1 text-paragraph-s">
                  USD
                </span>
              }
            />
            <Input
              type="number"
              min={0}
              step="0.01"
              placeholder="Max Price"
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              rightIcon={
                <span className="flex items-center gap-1 text-paragraph-s">
                  USD
                </span>
              }
            />
          </div>
        </FilterSection>
      </aside>

      <div className="w-px -my-10 bg-gray-800" />

      <section className="flex-1">
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-paragraph-m font-semibold">Sort by</span>
            <Select className="w-36">
              <option>Latest</option>
              <option>Price: Ascending</option>
              <option>Price: Descending</option>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-paragraph-m font-semibold">Show</span>
            <Select className="w-20">
              <option>6</option>
              <option>12</option>
              <option>24</option>
            </Select>
          </div>
        </div>

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
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`h-9 w-9 rounded-md text-paragraph-s ${
                  page === 2
                    ? "bg-primary-500 text-neutral-900"
                    : "text-neutral-100"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-neutral-300">...</span>
            {[40, 41, 42].map((page) => (
              <button
                key={page}
                type="button"
                className="h-9 w-9 rounded-md text-paragraph-s text-neutral-100"
              >
                {page}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-md border border-gray-700 px-4 py-2 text-paragraph-s"
            >
              <ArrowRightIcon width={16} height={16} className="rotate-180" />
              Previous
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md border border-gray-700 px-4 py-2 text-paragraph-s"
            >
              Next
              <ArrowRightIcon width={16} height={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
