// searchSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { SearchState } from './searchTypes';
import { fetchSearchResultsAPI } from './searchService';
import type { RootState } from '@/app/store';

// Async thunk
export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (query: string) => {
    return await fetchSearchResultsAPI(query);
  }
);

// Initial state
const initialState: SearchState = {
  query: '',
  results: [],
  status: 'idle',
};

// Slice
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
