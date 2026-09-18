export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    images: string[];
    category: { name: string };
  };
}

export interface Order {
  id: number;
  invoiceNumber: string;
  paymentMethod: string;
  shippingMethod: string;
  productTotal: number;
  productProtection: number;
  shippingPrice: number;
  shippingInsurance: number;
  serviceFees: number;
  grandTotal: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}
