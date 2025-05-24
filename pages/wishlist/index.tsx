import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, ShoppingBag, X, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity?: number;
}

const WishlistPage: React.FC = () => {
  // Données de démonstration
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'T-shirt Oversize',
      price: 39.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      size: 'M',
      color: 'Noir',
      quantity: 1
    },
    {
      id: 2,
      name: 'Jean Slim',
      price: 89.90,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      size: '40',
      color: 'Bleu',
      quantity: 1
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleMoveToCart = (item: WishlistItem) => {
    // Logique pour déplacer vers le panier
    console.log('Déplacer vers le panier:', item);
    handleRemoveItem(item.id);
  };

  return (
    <Layout 
      title="Ma liste d'envies - YOUEGOS"
      description="Votre liste d'envies YOUEGOS"
    >
      <div>
        {/* En-tête */}
        <div className="relative w-full bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-left">
              <h1 className="text-2xl font-medium text-gray-700">
                Ma liste d'envies
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Retrouvez ici vos articles préférés
              </p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Votre liste d'envies est vide</h3>
                <p className="mt-2 text-gray-500">Ajoutez des articles à votre liste d'envies pour les enregistrer.</p>
                <div className="mt-6">
                  <Link
                    href="/shop"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Découvrir nos produits
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-64 w-full object-cover object-center"
                      />
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 focus:outline-none"
                          aria-label="Supprimer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.color} · Taille {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-base font-medium text-gray-900">
                            {item.price.toFixed(2)} €
                          </span>
                          {item.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {item.originalPrice.toFixed(2)} €
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
                        >
                          <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {wishlistItems.length > 0 && (
            <div className="mt-8">
              <Link 
                href="/shop" 
                className="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continuer mes achats
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
