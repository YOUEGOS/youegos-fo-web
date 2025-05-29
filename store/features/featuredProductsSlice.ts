import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLatestFeaturedProducts } from '@/services/featuredProductService';
import type { ProductCardDTO } from '@/types';

interface FeaturedProductsState {
  items: ProductCardDTO[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FeaturedProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFeaturedProducts = createAsyncThunk(
  'featuredProducts/fetchFeaturedProducts',
  async () => {
    const response = await getLatestFeaturedProducts();
    return response;
  }
);

const featuredProductsSlice = createSlice({
  name: 'featuredProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        console.log('Produits vedettes action:', action.payload);
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch featured products';
      });
  },
});

export default featuredProductsSlice.reducer;