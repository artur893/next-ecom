"use client";
import Button from "../basics/Button";
import { useAddToCart } from "./useAddToCart";

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
