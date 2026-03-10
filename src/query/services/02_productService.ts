// services/productService.ts
import { Product } from '@/query/types/02_productType';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};
