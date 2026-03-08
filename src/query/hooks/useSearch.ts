'use client';

import { useState, useMemo } from 'react';
import { useProducts } from './useProducts';
import type { Product } from './useProducts';

/**
 * Hook global pencarian produk
 * Bisa dipakai di semua navbar dan halaman katalog
 */
export function useSearch(limit?: number) {
  const { data: allProducts = [], isLoading } = useProducts(limit);
  const [query, setQuery] = useState('');

  // Ubah input pencarian
  const handleSearchChange = (value: string) => {
    setQuery(value);
  };

  // Filter produk berdasarkan nama/title
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return allProducts;
    return allProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allProducts]);

  return {
    query,
    setQuery: handleSearchChange,
    filteredProducts,
    isLoading,
  };
}
