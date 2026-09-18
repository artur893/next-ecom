import { Breadcrumb, CartView, CartItemData } from "@/app/components/ui";

const MOCK_ITEMS: CartItemData[] = [
  {
    id: 1,
    name: "Rexus Xierra X16",
    categoryName: "Mouse",
    price: 25.99,
    quantity: 10,
    image: "https://images.morele.net/i1064/4143406_14_i1064.jpg",
  },
  {
    id: 2,
    name: "Logitech G213 Prodigy",
    categoryName: "Keyboard",
    price: 49.99,
    quantity: 1,
    image: "https://images.morele.net/i1064/14439473_0_i1064.jpg",
  },
];

export default function Cart() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/home" }, { label: "Cart" }]} />
      <CartView items={MOCK_ITEMS} />
    </div>
  );
}
