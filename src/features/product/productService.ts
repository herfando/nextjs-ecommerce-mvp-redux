// productService.ts
import { ApiProduct, Product } from './productTypes';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/products`);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  return data.products.map((p: ApiProduct) => ({
    id: p.id,
    img: p.thumbnail,
    title: p.title,
    price: `$${p.price.toFixed(2)}`,
    rating: p.rating.toFixed(1),
    sold: `${p.stock} sold`,
    store: 'Global Market',
    category: p.category,
    description: p.description,
  }));
};
