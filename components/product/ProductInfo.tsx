import { useState } from 'react';
import { Star, Check, Truck, Shield } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  colors: { name: string; value: string; available: boolean }[];
  sizes: { name: string; available: boolean }[];
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (value: number | ((prev: number) => number)) => void;
}

export default function ProductInfo({
  name,
  price,
  originalPrice,
  description,
  colors,
  sizes,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity
}: ProductInfoProps) {
  // Calculer la réduction si le prix original est fourni
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <div className="mt-8 lg:mt-0">
      <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
      
      {/* Prix et avis */}
      <div className="mt-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-semibold text-gray-800">
            {price.toFixed(2)} €
          </span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="ml-3 text-lg text-gray-500 line-through">
                {originalPrice.toFixed(2)} €
              </span>
              <span className="ml-2 text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">
                -{discount}%
              </span>
            </>
          )}
        </div>
        

      </div>
      
      {/* Description */}
      <div className="mt-6">
        <p className="text-gray-700">{description}</p>
      </div>
      
      {/* Couleurs */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Couleur</h3>
        <div className="mt-2 flex space-x-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => color.available && setSelectedColor(color.name)}
              disabled={!color.available}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                selectedColor === color.name
                  ? 'border-sky-500 ring-2 ring-offset-2 ring-sky-200'
                  : 'border-transparent hover:border-gray-300'
              } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={`${color.name}${!color.available ? ' (Rupture de stock)' : ''}`}
            >
              <div
                className="w-8 h-8 rounded-full border border-gray-200"
                style={{ backgroundColor: color.value }}
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Tailles */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Taille</h3>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size.name}
              type="button"
              onClick={() => size.available && setSelectedSize(size.name)}
              disabled={!size.available}
              className={`py-3 px-1 border rounded-md text-sm font-medium text-center ${
                selectedSize === size.name
                  ? 'bg-sky-50 border-sky-500 text-sky-700 ring-1 ring-sky-500'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } ${!size.available ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
            >
              {size.name}
            </button>
          ))}
        </div>
        <button className="mt-2 text-sm text-sky-600 hover:text-sky-500">
          Guide des tailles
        </button>
      </div>
      
      {/* Quantité améliorée */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Quantité</h3>
          <span className="text-xs text-gray-500">
            {quantity} {quantity > 1 ? 'articles' : 'article'}
          </span>
        </div>
        <div className="mt-2 flex items-center">
          <button
            type="button"
            onClick={() => setQuantity((prev: number) => Math.max(1, prev - 1))}
            disabled={quantity <= 1}
            className={`p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors ${
              quantity <= 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
            aria-label="Diminuer la quantité"
          >
            <svg 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
          
          <div className="relative flex-1 max-w-[80px] mx-1">
            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1 && value <= 99) {
                  setQuantity(value);
                } else if (e.target.value === '') {
                  setQuantity(1);
                }
              }}
              onBlur={(e) => {
                if (e.target.value === '' || parseInt(e.target.value, 10) < 1) {
                  setQuantity(1);
                }
              }}
              className="w-full text-center border-t border-b border-gray-300 py-2 text-sm font-medium focus:ring-1 focus:ring-sky-500 focus:border-sky-500 rounded-none"
              aria-label="Quantité"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-gray-500 text-xs opacity-0 select-none">
                {quantity}
              </span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setQuantity((prev: number) => Math.min(99, prev + 1))}
            disabled={quantity >= 99}
            className={`p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors ${
              quantity >= 99 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
            aria-label="Augmenter la quantité"
          >
            <svg 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        {quantity === 99 && (
          <p className="mt-1 text-xs text-amber-600">Quantité maximale atteinte</p>
        )}
      </div>
      
      {/* Boutons d'action */}
      <div className="mt-8 space-y-3">
        <button
          onClick={onAddToCart}
          className="w-full flex items-center justify-center bg-sky-600 py-4 px-6 border border-transparent rounded-lg text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Ajouter au panier
        </button>
        <button
          onClick={onToggleWishlist}
          className={`w-full flex items-center justify-center py-3 px-6 border rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors ${
            isWishlisted
              ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg 
            className={`h-5 w-5 mr-2 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} 
            viewBox="0 0 24 24" 
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {isWishlisted ? 'Retirer de la liste de souhaits' : 'Ajouter à la liste de souhaits'}
        </button>
      </div>
      
      {/* Livraison et garantie */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-sky-500">
              <Truck className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Livraison rapide</p>
              <p className="text-sm text-gray-500">Expédition sous 24-48h. Livraison offerte dès 50€ d'achat.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-sky-500">
              <Shield className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Paiement sécurisé</p>
              <p className="text-sm text-gray-500">Paiement 100% sécurisé par carte bancaire, PayPal ou virement.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-sky-500">
              <Check className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Satisfait ou remboursé</p>
              <p className="text-sm text-gray-500">30 jours pour changer d'avis, échange et retour gratuits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
