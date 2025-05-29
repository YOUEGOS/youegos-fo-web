import { configureStore } from '@reduxjs/toolkit';
import featuredProductsReducer from './features/featuredProductsSlice';
import productsReducer from './features/productsSlice';
import productDetailReducer from './features/productDetailSlice';
import cartReducer from './features/cartSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    // Vos reducers iront ici
    featuredProducts: featuredProductsReducer,
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
  },
});

// Types pour le state global
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;