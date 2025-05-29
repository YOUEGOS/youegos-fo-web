import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('cart');
    if (data) return JSON.parse(data);
  }
  return [];
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: typeof window !== 'undefined' ? loadCartFromStorage() : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existing = state.items.find(
        i => i.productId === item.productId && i.variantId === item.variantId
      );
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      saveCartToStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<{ productId: number; variantId: number }>) {
      state.items = state.items.filter(
        i => !(i.productId === action.payload.productId && i.variantId === action.payload.variantId)
      );
      saveCartToStorage(state.items);
    },
    updateCartQuantity(state, action: PayloadAction<{ productId: number; variantId: number; quantity: number }>) {
      const item = state.items.find(
        i => i.productId === action.payload.productId && i.variantId === action.payload.variantId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage(state.items);
    },
    loadCart(state) {
      state.items = loadCartFromStorage();
    }
  }
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
