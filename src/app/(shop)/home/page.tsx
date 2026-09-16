import { prisma } from "@/lib/prisma";
import {
  CategoryCarousel,
  CategorySection,
  HorizontalScrollSection,
  ProductCard,
  Card,
} from "@/app/components/ui";

function pickRandom<T>(items: T[], count: number) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function getRecommendedProducts() {
  const categories = await prisma.category.findMany({
    include: { products: { include: { brand: true } } },
  });

  const oneProductPerCategory = categories
    .filter((category) => category.products.length > 0)
    .map((category) => pickRandom(category.products, 1)[0]);

  const remainingSlots = 6 - oneProductPerCategory.length;
  const usedIds = new Set(oneProductPerCategory.map((p) => p.id));
  const allProducts = categories.flatMap((category) => category.products);
  const extraPool = allProducts.filter((p) => !usedIds.has(p.id));
  const extras =
    remainingSlots > 0 ? pickRandom(extraPool, remainingSlots) : [];

  const categoryNameById = new Map(categories.map((c) => [c.id, c.name]));

  return [...oneProductPerCategory, ...extras].map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    categoryName: categoryNameById.get(product.categoryId) ?? "",
    image: product.images[0],
  }));
}

export default async function Home() {
  const [categories, recommendedProducts, brands] = await Promise.all([
    prisma.category.findMany(),
    getRecommendedProducts(),
    prisma.brand.findMany(),
  ]);

  return (
    <>
      <CategoryCarousel categories={categories} />
      <CategorySection categories={categories} />

      <HorizontalScrollSection title="Recomendation">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </HorizontalScrollSection>

      <HorizontalScrollSection title="Brand">
        {brands.map((brand) => (
          <Card
            key={brand.id}
            image={brand.logoUrl}
            label={brand.name}
            className="w-38 h-33 shrink-0 lg:w-49 lg:h-41.5 xl:w-55 xl:h-47.5"
          />
        ))}
      </HorizontalScrollSection>
    </>
  );
}
