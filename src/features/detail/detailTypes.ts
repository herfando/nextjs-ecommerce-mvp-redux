export interface Dimensions {
  width: number;
  height: number;
  depth: number; // sesuai Mongo Atlas
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Meta {
  [key: string]: any;
}

export interface DetailProduct {
  _id: string;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface DetailState {
  item: DetailProduct | null;
  isLoading: boolean;
  error: string | null;
}
