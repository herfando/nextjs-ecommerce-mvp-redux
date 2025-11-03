// cartService.ts
import { CartItem, CartState } from './cartTypes';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const res = await fetch('https://dummyjson.com/products?limit=5');
  const data = await res.json();

  return data.products.map((p: any) => ({
    id: p.id,
    name: p.title,
    price: p.price,
    quantity: 0,
    category: p.category,
    image: p.thumbnail,
  }));
};
