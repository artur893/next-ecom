import { Breadcrumb, CartView } from "@/app/components/ui";
import { getCart } from "@/data/getCart";

export default async function Cart() {
  const items = await getCart();

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/home" }, { label: "Cart" }]} />
      <CartView items={items} />
    </div>
  );
}
