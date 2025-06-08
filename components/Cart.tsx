import React from 'react';
import { X, ShoppingBag, Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCartQuantity, removeFromCart } from '@/store/features/cartSlice';

interface CartProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPageView?: boolean;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, isPageView }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  const updateQuantity = (productId: number, variantId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ productId, variantId, quantity: newQuantity }));
  };

  const removeItem = (productId: number, variantId: number) => {
    dispatch(removeFromCart({ productId, variantId }));
  };

  return (
    <div>
      
    </div>
  )
};

export default Cart;
