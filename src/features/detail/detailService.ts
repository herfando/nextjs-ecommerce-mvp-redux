// detailService.ts
import { DetailProduct } from './detailTypes';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchDetailProduct = async (
  id: number
): Promise<DetailProduct> => {
  const res = await fetch(`${API_BASE}/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch detail');
  }

  return (await res.json()) as DetailProduct;
};
