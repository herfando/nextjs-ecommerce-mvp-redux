// query/types/03_storeType.ts
export interface StoreInput {
  storeName: string;
  storeDomain?: string;
  city?: string;
  postalCode?: string;
  address?: string;
}

export interface StoreResponse {
  _id: string;
  storeName: string;
  storeDomain: string;
  city: string;
  postalCode: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
