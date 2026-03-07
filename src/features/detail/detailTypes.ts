// detailTypes.ts

// ============================
// Product DETAIL
// ⬇️ dibuat KOMPATIBEL dengan Product (list)
// ============================
export interface DetailProduct {
  id: number;

  // dari Product & Detail
  name: string;
  price: number;

  // bisa kosong saat dari list
  description?: string;
  category?: string;
  brand?: string;
  stock?: number;

  // image support (list & detail)
  thumbnail?: string;
  images?: string[];
}

// ============================
// Detail Slice State
// ============================
export interface DetailState {
  item: DetailProduct | null;
  isLoading: boolean;
  error: string | null;
}
