export interface Product {
  id: number;
  title: string;
  price: string; // formatted string
  rating: string; // formatted string
  stock: number;
  thumbnail: string;
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

export interface ApiProductsResponse {
  products: ApiProduct[];
}

export interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}
