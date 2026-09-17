"use client";
import Button from "../basics/Button";
import { useAddToCart } from "@/hooks/useAddToCart";

export default function AddToCartButton({
  productId,
}: {
  productId: number;
}) {
  const addToCart = useAddToCart();

  return (
    <Button onClick={() => addToCart(productId)} className="font-medium">
      Add to Cart
    </Button>
  );
}
