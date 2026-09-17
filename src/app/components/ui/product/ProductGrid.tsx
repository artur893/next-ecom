import ProductCard from "./ProductCard";
import { ProductListItem } from "@/lib/types/product";

export default function ProductGrid({
  products,
}: {
  products: ProductListItem[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
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
  );
}
