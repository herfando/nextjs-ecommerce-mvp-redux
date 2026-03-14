import { ApiProduct, ApiProductsResponse, Product } from './productTypes';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');

  const data: ApiProductsResponse = await res.json();

  const products: Product[] = data.products.map((p: ApiProduct) => ({
    id: p.id,
    title: p.title,
    price: `$${p.price.toFixed(2)}`,
    rating: p.rating.toFixed(1),
    stock: p.stock,
    thumbnail: p.thumbnail,
  }));

  return products;
};
