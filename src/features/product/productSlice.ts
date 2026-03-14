import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsState, Product } from './productTypes';
import { getProducts } from './productService';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => await getProducts()
);

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

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
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
        state.isLoading = false;
      });
  },
});

export default productsSlice.reducer;
