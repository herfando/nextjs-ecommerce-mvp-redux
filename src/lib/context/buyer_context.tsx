'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../../query/types';

type BuyerContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

const BuyerContext = createContext<BuyerContextType | undefined>(undefined);

export function BuyerProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  return (
    <BuyerContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </BuyerContext.Provider>
  );
}

export const useBuyer = () => {
  const context = useContext(BuyerContext);
  if (!context) throw new Error('useBuyer must be used within BuyerProvider');
  return context;
};
