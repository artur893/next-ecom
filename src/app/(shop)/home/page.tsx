import {
  CategoryCarousel,
  CategorySection,
  CATEGORY_CARD_SIZE,
  HorizontalScrollSection,
  ProductCard,
  Card,
} from "@/app/components/ui";
import { getCategories } from "@/data/getCategories";
import { getBrands } from "@/data/getBrands";
import { getRecommendedProducts } from "@/data/getRecommendedProducts";

export default async function Home() {
  const [categories, recommendedProducts, brands] = await Promise.all([
    getCategories(),
    getRecommendedProducts(),
    getBrands(),
  ]);

  return (
    <>
      <div className="hidden md:block">
        <CategoryCarousel categories={categories} />
      </div>
      <CategorySection categories={categories} />

      <HorizontalScrollSection title="Recomendation">
        {recommendedProducts.map((product) => (
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
      </HorizontalScrollSection>

      <HorizontalScrollSection title="Brand">
        {brands.map((brand) => (
          <Card
            key={brand.id}
            image={brand.logoUrl}
            label={brand.name}
            className={CATEGORY_CARD_SIZE}
          />
        ))}
      </HorizontalScrollSection>
    </>
  );
}
