// detailService.ts
import { DetailProduct } from './detailTypes';

export const fetchDetailProduct = async (
  id: number
): Promise<DetailProduct> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch detail');
  return (await res.json()) as DetailProduct;
};
