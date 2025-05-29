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


  const renderCartContent = () => (
    <>
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {!isPageView && (
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Mon panier</h2>
            <button
              type="button"
              className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Votre panier est vide</h3>
            <p className="mt-1 text-sm text-gray-500">Commencez par ajouter des articles à votre panier.</p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={onClose}
              >
                Découvrir nos produits
              </Link>
            </div>
          </div>
        ) : (
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartItems.map((item) => (
  <li key={item.productId + '-' + item.variantId} className="py-6 flex">
    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-center object-cover"
      />
    </div>

    <div className="ml-4 flex-1 flex flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <p className="ml-4">{(item.price * item.quantity).toFixed(2)} €</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {item.color} · Taille {item.size}
        </p>
        <p className="text-sm font-medium text-gray-900 mt-1">
          {item.price.toFixed(2)} €
        </p>
      </div>
      <div className="flex-1 flex items-end justify-between mt-2">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-sm">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => removeItem(item.productId, item.variantId)}
          className="font-medium text-red-600 hover:text-red-500"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  </li>
))}
            </ul>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="space-y-3">
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
              <p>Total</p>
              <p>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} €</p>
            </div>
          </div>
          
          {!isPageView && (
            <div className="mt-6">
              <Link
                href="/checkout"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700"
              >
                Passer la commande
              </Link>
            </div>
          )}
          
          {!isPageView && (
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                ou{' '}
                <button
                  type="button"
                  className="text-sky-600 font-medium hover:text-sky-500"
                  onClick={onClose}
                >
                  Continuer mes achats<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );

  if (isPageView) {
    return renderCartContent();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
        
        {/* Panier */}
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              {renderCartContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
