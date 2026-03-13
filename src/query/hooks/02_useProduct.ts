// hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/query/services/02_productService';
import { Product } from '@/query/types/02_productType';

export const useProduct = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 60, // 1 jam
  });
};
