// types/product.ts

export interface Image {
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
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

  images: Image[];
}

// mapping highlight hero
export const highlightTextMap: Record<string, string> = {
  beauty: 'Beauty Essentials',
  fragrances: 'Feel Fresh Everyday',
  skincare: 'Self-Care Essentials',
  groceries: 'Fresh Deals Today',
  smartphones: 'Top Gadget This Week',
  laptops: 'Powerful Devices for You',
  'home-decoration': 'Decorate Your Space',
  'mens-shirts': "Stylish Men's Apparel",
  'mens-shoes': 'Step Up Your Style',
  'mens-watches': 'Luxury in Time',
  'womens-dresses': 'Elegant Women’s Wear',
  'womens-shoes': 'Perfect Steps for Her',
  'womens-watches': 'Chic Accessories',
};
