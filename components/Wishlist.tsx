import React from 'react';
import { X, Heart as HeartFilled, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
}

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (id: number) => void;
  onMoveToCart: (item: WishlistItem) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ 
  isOpen, 
  onClose, 
  items: wishlistItems, 
  onRemoveItem, 
  onMoveToCart 
}) => {

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
        
        {/* Panneau de la wishlist */}
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Ma liste d'envies</h2>
                  <button
                    type="button"
                    className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-8">
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <HeartFilled className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Votre liste d'envies est vide</h3>
                      <p className="mt-1 text-sm text-gray-500">Ajoutez des articles à votre liste d'envies pour les enregistrer.</p>
                      <div className="mt-6">
                        <button
                          onClick={onClose}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          Découvrir nos produits
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {wishlistItems.map((item) => (
                          <li key={item.id} className="py-6 flex">
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
                                  <p className="ml-4">{item.price.toFixed(2)} €</p>
                                </div>
                                {item.originalPrice && (
                                  <p className="text-sm text-gray-500 line-through">
                                    {item.originalPrice.toFixed(2)} €
                                  </p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.color} · Taille {item.size}
                                </p>
                              </div>
                              <div className="flex-1 flex items-end justify-between mt-2">
                                <button
                                  type="button"
                                  onClick={() => onRemoveItem(item.id)}
                                  className="font-medium text-sm text-gray-600 hover:text-red-600 flex items-center"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  <span>Supprimer</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onMoveToCart(item)}
                                  className="font-medium text-sm text-sky-600 hover:text-sky-500 flex items-center"
                                >
                                  <ShoppingBag className="h-4 w-4 mr-1" />
                                  <span>Ajouter au panier</span>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {wishlistItems.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="mt-6">
                    <Link
                      href="/shop"
                      className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700"
                    >
                      Voir tous les produits
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
