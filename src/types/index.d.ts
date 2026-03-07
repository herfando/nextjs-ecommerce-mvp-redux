// ----------------------------
// Product
// ----------------------------
export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  stock?: number;
  category?: string;
};

// ----------------------------
// User
// ----------------------------
export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

// ----------------------------
// Cart Item
// ----------------------------
export type CartItem = {
  product: Product;
  quantity: number;
};

// ----------------------------
// Filter / Search
// ----------------------------
export type ProductFilter = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};

// ----------------------------
// Middleware types (optional, untuk zustand persist/devtools)
// ----------------------------
export type SetState<T> = (partial: T | ((state: T) => T)) => void;
export type GetState<T> = () => T;

// ----------------------------
// Asset imports (CSS/Images)
// ----------------------------
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
