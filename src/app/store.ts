import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/product/productSlice';
import searchReducer from '@/features/search/searchSlice';
import cartReducer from '@/features/cart/cartSlice';
import detailReducer from '@/features/detail/detailSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
    cart: cartReducer,
    detail: detailReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
