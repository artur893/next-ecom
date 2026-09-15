import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/app/components/ui";

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
    <section className="mt-16">
      <h1 className="text-heading-4 font-semibold mb-8">Products</h1>
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
    </section>
  );
}
