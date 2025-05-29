import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilteredProducts } from '@/services/productService';
import type { ProductCardDTO, ProductFilter, ProductsState } from '@/types';

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  filters: {}
};

export const fetchFilteredProducts = createAsyncThunk(
  'products/fetchFilteredProducts',
  async (filters: ProductFilter = {}) => {
    const response = await getFilteredProducts(filters);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setFilters, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
