// searchService.ts
import type { SearchItem } from './searchTypes';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchSearchResultsAPI = async (
  query: string
): Promise<SearchItem[]> => {
  const url = query.trim()
    ? `${API_BASE}/products/search?q=${query}`
    : `${API_BASE}/products`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await res.json();

  return data.products.map((p: any) => ({
    id: p.id,
    img: p.thumbnail,
    title: p.title,
    price: `$${p.price.toFixed(2)}`,
    rating: p.rating.toFixed(1),
    sold: `${p.stock} sold`,
    store: 'Global Market',
    category: p.category,
    description: p.description,
  })) as SearchItem[];
};
