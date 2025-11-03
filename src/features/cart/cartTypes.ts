// cartTypes.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

export interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
