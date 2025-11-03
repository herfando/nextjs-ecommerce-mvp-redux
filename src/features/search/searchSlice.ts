import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Product } from '@/features/product/productSlice';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (query: string) => {
    const url = query.trim()
      ? `https://dummyjson.com/products/search?q=${query}`
      : 'https://dummyjson.com/products';
    const res = await fetch(url);
    const data = await res.json();

    return data.products.map((p: any) => ({
      id: p.id,
      img: p.thumbnail,
      title: p.title,
      price: `$${p.price.toFixed(2)}`,
      rating: p.rating.toFixed(1),
      sold: `${p.stock} sold`,
      store: 'Global Market',
      category: p.category,
      description: p.description,
    })) as Product[];
  }
);

interface SearchState {
  query: string;
  results: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SearchState = {
  query: '',
  results: [],
  status: 'idle',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setQuery } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
