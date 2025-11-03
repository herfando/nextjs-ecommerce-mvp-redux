// detailTypes.ts
export interface DetailProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  rating: number;
}

export interface DetailState {
  item: DetailProduct | null;
  isLoading: boolean;
  error: string | null;
}
