import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDTO } from '@/types';
import { fetchProductWithVariant } from '@/services/productDetailService';

interface ProductDetailState {
  product: ProductDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

export const getProductWithVariant = createAsyncThunk(
  'productDetail/getProductWithVariant',
  async ({ productId, variantId }: { productId: number; variantId: number }, thunkAPI) => {
    try {
      return await fetchProductWithVariant(productId, variantId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Erreur lors du chargement du produit');
    }
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductWithVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductWithVariant.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductWithVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productDetailSlice.reducer;
