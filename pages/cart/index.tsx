import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

// Chargement dynamique du composant Cart (SSR désactivé car utilise window)
const Cart = dynamic(() => import('../../components/Cart'), { 
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  )
});

const CartPage: React.FC = () => {
  return (
    <Layout 
      title="Mon Panier - YOUEGOS"
      description="Votre panier d'achat YOUEGOS"
    >
      <div>
        {/* En-tête avec style cohérent */}
        <div className="relative w-full bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-left">
              <h1 className="text-2xl font-medium text-gray-700">
                Mon panier
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Les articles dans le panier ne sont pas réservés. 
                <Link href="/login" className="text-sky-600 hover:text-sky-700 ml-1">
                  Connectez-vous
                </Link> pour emporter votre panier partout avec vous !
              </p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Cart isPageView={true} />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <Link 
              href="/shop" 
              className="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continuer mes achats
            </Link>
            
            <div className="w-full sm:w-auto">
              <Link
                href="/checkout"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Passer la commande
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
              
              <p className="mt-2 text-center text-sm text-gray-500">
                ou{' '}
                <Link href="/shop" className="font-medium text-sky-600 hover:text-sky-500">
                  continuer vos achats
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
