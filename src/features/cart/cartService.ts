// cartService.ts
import { CartItem } from './cartTypes';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const res = await fetch(`${API_BASE}/products?limit=5`);

  if (!res.ok) {
    throw new Error('Failed to fetch cart products');
  }

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
