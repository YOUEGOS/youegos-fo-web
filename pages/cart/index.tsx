import React from 'react';
import { NextPage } from 'next';
import { ShoppingBag, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/store';
import { removeFromCart, updateCartQuantity } from '@/store/features/cartSlice';

const Cart = dynamic(() => import('../../components/Cart'), { 
  ssr: false,
  loading: () => (
    <div className="
      flex items-center justify-center
      min-h-[400px]
      text-text-secondary
      animate-pulse
    ">
      <ShoppingBag className="w-8 h-8 text-accent-light/20" />
    </div>
  )
});

const CartPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.2; // 20% TVA
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <Layout 
      title="Mon Panier - YOUEGOS"
      description="Gérez votre panier d'achats YOUEGOS"
    >
      <main className="min-h-screen bg-background">
        {/* En-tête avec message de connexion */}
        <div className="bg-background-light/5 border-b border-accent-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              {false && (
                <p className="text-sm text-text-secondary">
                  <Link
                    href="/auth/login"
                    className="
                      group
                      inline-flex items-center gap-2
                      text-accent hover:text-accent-light
                      transition-colors duration-300
                    "
                  >
                    <User className="
                      h-4 w-4
                      transition-transform duration-300
                      group-hover:scale-110
                    " />
                    <span>Connectez-vous</span>
                  </Link>
                  <span className="ml-2">pour synchroniser votre panier sur tous vos appareils</span>
                </p>
              )}
              
              <div className="flex items-center gap-6">
                <span className="text-sm font-display text-text-primary">
                  {cartItems.length} article{cartItems.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="
            relative
            bg-gradient-to-br from-background-light/10 to-background/10
            backdrop-blur-xl
            border border-accent-light/10
            overflow-hidden
            group/cart
            rounded-sm
          ">
            {/* Effet de brillance sur la bordure */}
            <div className="
              absolute inset-0
              bg-gradient-to-r from-accent-light/0 via-accent-light/10 to-accent-light/0
              opacity-0 group-hover/cart:opacity-100
              transition-opacity duration-500
              pointer-events-none
            "/>

            {/* En-tête */}
            <div className="p-8 border-b border-accent-light/10">
              <h1 className="
                font-display text-3xl
                bg-gradient-to-r from-text-primary via-accent to-text-primary
                bg-clip-text text-transparent
              ">
                Mon Panier
              </h1>
            </div>

            {/* Liste des produits */}
            {cartItems.length === 0 ? (
              <div className="relative flex flex-col items-center justify-center py-16 text-center">
                <ShoppingBag className="w-16 h-16 text-accent-light/20" />
                <h3 className="mt-4 font-display text-xl bg-gradient-to-r from-accent-light to-accent-dark bg-clip-text text-transparent">
                  Votre panier est vide
                </h3>
                <p className="mt-2 text-text-secondary">
                  Commencez votre shopping pour ajouter des articles
                </p>
                <Link 
                  href="/shop" 
                  className="
                    mt-8
                    group
                    inline-flex items-center gap-2
                    px-6 py-3
                    text-text-secondary hover:text-accent
                    transition duration-300
                  "
                >
                  <ArrowLeft className="
                    h-5 w-5
                    transition-transform duration-300
                    group-hover:-translate-x-2
                  " />
                  <span className="font-display">Continuer mes achats</span>
                </Link>
              </div>
            ) : (
              <div className="flow-root px-8 py-6">
                <ul className="-my-6 divide-y divide-background-light/10">
                  {cartItems.map((item) => (
                    <li key={`${item.productId}-${item.variantId}`} className="
                      py-6 flex
                      group
                      hover:bg-background-light/5
                      transition duration-300
                    ">
                      {/* Image du produit */}
                      <div className="
                        relative flex-shrink-0
                        w-24 h-24
                        rounded-sm
                        overflow-hidden
                        border border-background-light/20
                        group-hover:border-accent-light/20
                        transition duration-300
                      ">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="
                            w-full h-full
                            object-center object-cover
                            group-hover:scale-110
                            transition duration-500
                          " 
                        />
                      </div>

                      {/* Détails du produit */}
                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="
                              font-display text-lg
                              bg-gradient-to-r from-accent-light to-accent-dark
                              bg-clip-text text-transparent
                              group-hover:from-accent-dark group-hover:to-accent-light
                              transition duration-300
                            ">
                              {item.name}
                            </h4>
                          </div>
                          <p className="ml-4 text-text-primary">
                            {(item.price * item.quantity).toFixed(2)} €
                          </p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          {/* Quantité */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                dispatch(updateCartQuantity({
                                  productId: item.productId,
                                  variantId: item.variantId,
                                  quantity: Math.max(1, item.quantity - 1)
                                }));
                              }}
                              className="
                                p-1
                                text-text-secondary hover:text-accent
                                transition duration-300
                              "
                              disabled={item.quantity <= 1}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center text-text-secondary">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                dispatch(updateCartQuantity({
                                  productId: item.productId,
                                  variantId: item.variantId,
                                  quantity: item.quantity + 1
                                }));
                              }}
                              className="
                                p-1
                                text-text-secondary hover:text-accent
                                transition duration-300
                              "
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Supprimer */}
                          <button
                            onClick={() => {
                              dispatch(removeFromCart({
                                productId: item.productId,
                                variantId: item.variantId
                              }));
                            }}
                            className="
                              font-medium text-sm
                              text-text-secondary hover:text-accent
                              transition duration-300
                            "
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Résumé et actions */}
          {cartItems.length > 0 && (
            <div className="
              mt-8
              flex flex-col lg:flex-row justify-between
              gap-8
            ">
              {/* Actions de navigation */}
              <div className="lg:flex-1">
                <Link 
                  href="/shop" 
                  className="
                    group
                    inline-flex items-center gap-2
                    px-6 py-3
                    text-text-secondary hover:text-accent
                    transition duration-300
                  "
                >
                  <ArrowLeft className="
                    h-5 w-5
                    transition-transform duration-300
                    group-hover:-translate-x-2
                  " />
                  <span className="font-display">Continuer mes achats</span>
                </Link>
              </div>

              {/* Résumé de la commande */}
              <div className="
                w-full lg:w-96
                p-6
                bg-gradient-to-br from-background-light/5 to-transparent
                border border-accent-light/10
                rounded-sm
              ">
                <div className="space-y-4">
                  <h2 className="font-display text-xl text-text-primary">
                    Résumé de la commande
                  </h2>

                  <div className="space-y-2">
                    <div className="flex justify-between text-text-secondary">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>TVA (20%)</span>
                      <span>{tax.toFixed(2)} €</span>
                    </div>
                    <div className="
                      flex justify-between items-baseline
                      pt-4 mt-4
                      border-t border-accent-light/10
                    ">
                      <span className="font-display text-text-primary">Total</span>
                      <span className="
                        font-display text-2xl
                        bg-gradient-to-r from-accent-light to-accent-dark
                        bg-clip-text text-transparent
                      ">
                        {total.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="
                      relative
                      w-full
                      inline-flex items-center justify-center gap-3
                      px-8 py-4 mt-6
                      bg-gradient-to-r from-accent-dark via-accent to-accent-light
                      text-background font-display
                      overflow-hidden
                      group/checkout
                      rounded-sm
                    "
                  >
                    {/* Effet de brillance */}
                    <div className="
                      absolute inset-0
                      bg-gradient-to-r from-white/0 via-white/20 to-white/0
                      translate-x-[-200%] group-hover/checkout:translate-x-[200%]
                      transition-transform duration-1000
                    "/>
                    <span>Passer la commande</span>
                    <ShoppingBag className="
                      h-5 w-5
                      transition-transform duration-300
                      group-hover/checkout:scale-110
                    " />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default CartPage;
