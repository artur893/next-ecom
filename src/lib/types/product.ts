export interface ProductListItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  category: { name: string };
}

export interface ProductListResponse {
  products: ProductListItem[];
  total: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  category: { name: string };
  brand: { name: string } | null;
}
