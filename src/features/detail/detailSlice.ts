// detailSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DetailProduct, DetailState } from './detailTypes';
import { fetchDetailProduct } from './detailService';

export const fetchProductDetail = createAsyncThunk(
  'detail/fetchProductDetail',
  async (id: number) => await fetchDetailProduct(id)
);

const initialState: DetailState = {
  item: null,
  isLoading: false,
  error: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.item = null;
      state.isLoading = false;
      state.error = null;
    },
    setDetail: (state, action: PayloadAction<DetailProduct>) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetail.fulfilled,
        (state, action: PayloadAction<DetailProduct>) => {
          state.item = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load detail';
        state.isLoading = false;
      });
  },
});

export const { clearDetail, setDetail } = detailSlice.actions;
export default detailSlice.reducer;
