'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import { useProducts } from '@/query/hooks/useProducts';
import type { Product } from '@/query/hooks/useProducts';

interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
  filteredProducts: Product[];
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const { data: allProducts = [], isLoading } = useProducts();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return allProducts;
    return allProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allProducts]);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, filteredProducts, isLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
}
