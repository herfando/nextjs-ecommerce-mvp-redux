import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

interface DetailState {
  item: DetailProduct | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DetailState = {
  item: null,
  isLoading: false,
  error: null,
};

// 🟢 Optional: fetch detail dari API kalau user buka langsung lewat URL
export const fetchProductDetail = createAsyncThunk(
  'detail/fetchProductDetail',
  async (id: number) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch detail');
    return (await res.json()) as DetailProduct;
  }
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.item = null;
      state.error = null;
      state.isLoading = false;
    },
    // 🟢 Tambahin ini biar bisa dispatch(setDetail(product))
    setDetail: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.item = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load detail';
        state.isLoading = false;
      });
  },
});

export const { clearDetail, setDetail } = detailSlice.actions; // ✅ ini penting
export default detailSlice.reducer;
