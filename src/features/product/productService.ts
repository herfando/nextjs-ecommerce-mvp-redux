import { ApiProduct, Product } from './productTypes';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://dummyjson.com/products?limit=0');
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
