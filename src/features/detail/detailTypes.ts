export interface DetailProduct {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  brand?: string;
  stock?: number;
  thumbnail?: string;
  images?: string[];
}
