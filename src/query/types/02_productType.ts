// types/product.ts
export interface Image {
  thumbnail: string;
}

export interface Product {
  _id: string;
  id: number;
  title: string;
  description: string;
  category: {
    name: string;
  };
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Record<string, any>;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: any[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Record<string, any>;
  images: Image[];
}

// ✅ export highlightTextMap supaya bisa diimport di Hero
export const highlightTextMap: Record<string, string> = {
  smartphones: 'Top Gadget This Week',
  laptops: 'Powerful Devices for You',
  fragrances: 'Feel Fresh Everyday',
  skincare: 'Self-Care Essentials',
  groceries: 'Fresh Deals Today',
  'home-decoration': 'Decorate Your Space',
  'mens-shirts': "Stylish Men's Apparel",
  'mens-shoes': 'Step Up Your Style',
  'mens-watches': 'Luxury in Time',
  'womens-dresses': 'Elegant Women’s Wear',
  'womens-shoes': 'Perfect Steps for Her',
  'womens-watches': 'Chic Accessories',
};
