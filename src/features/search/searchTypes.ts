// searchTypes.ts
export interface SearchItem {
  id: number;
  img: string;
  title: string;
  price: string;
  rating: string;
  sold: string;
  store: string;
  category?: string;
  description?: string;
}

export interface SearchState {
  query: string;
  results: SearchItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
