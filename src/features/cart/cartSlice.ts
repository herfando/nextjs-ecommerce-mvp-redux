// cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from './cartTypes';
import { fetchCartItems } from './cartService';

// Async thunk
export const fetchCartFromAPI = createAsyncThunk('cart/fetchCart', async () => {
  return await fetchCartItems();
});

// Initial state
const initialState: CartState = {
  items: [],
  status: 'idle',
};

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((i) => i.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    increase: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrease: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 0) item.quantity -= 1;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartFromAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartFromAPI.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addToCart, increase, decrease, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
