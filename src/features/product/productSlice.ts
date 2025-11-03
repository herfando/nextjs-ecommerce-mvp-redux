// productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsState } from './productTypes';
import { getProducts } from './productService';

// Async thunk
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  return await getProducts();
});

// Initial state
const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
