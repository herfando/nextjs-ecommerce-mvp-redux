export interface Product {
  id: number;
  img: string;
  title: string;
  price: string;
  rating: string;
  sold: string;
  store: string;
  category?: string;
  description?: string;
}

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  rating: number;
  stock: number;
}

export interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}
