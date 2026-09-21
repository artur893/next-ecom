export interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    images: string[];
    category: { name: string };
  };
}
