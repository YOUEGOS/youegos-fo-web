import Link from 'next/link';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  reviewCount?: number;
  showAddToCart?: boolean;
  showWishlist?: boolean;
  className?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isBestSeller = false,
  rating,
  reviewCount,
  showAddToCart = true,
  showWishlist = true,
  className = ''
}: ProductCardProps) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round((1 - price / originalPrice) * 100) 
    : 0;

  return (
    <div className={`group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="relative overflow-hidden">
        {/* Lien vers la page du produit */}
        <Link href={`/shop/${id}`} className="block">
          <div className="aspect-square bg-gray-100">
            <Image
              src={image}
              alt={name}
              width={400}
              height={400}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isNew && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-sky-700 shadow-sm">
              Nouveauté
            </span>
          )}
          {isBestSeller && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-600 text-white">
              Best-seller
            </span>
          )}
          {hasDiscount && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {showAddToCart && (
            <button 
              className="w-full py-2 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Implémenter l'ajout au panier
                console.log('Ajouter au panier:', id);
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Ajouter au panier</span>
            </button>
          )}
          
          {showWishlist && (
            <button 
              className="mt-2 w-full py-2 bg-transparent text-white font-medium rounded-md border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Implémenter l'ajout à la liste de souhaits
                console.log('Ajouter aux favoris:', id);
              }}
            >
              <Heart className="h-4 w-4" />
              <span>Favoris</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {category && (
          <p className="text-xs text-gray-500 mb-1">{category}</p>
        )}
        
        <Link href={`/shop/${id}`}>
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10 hover:text-sky-600 transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-start justify-between mt-2">
          <div className="min-w-0">
            {hasDiscount ? (
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                  {price.toFixed(2)} €
                </span>
                <span className="text-sm text-gray-500 line-through whitespace-nowrap">
                  {originalPrice?.toFixed(2)} €
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                {price.toFixed(2)} €
              </span>
            )}
          </div>
          
          {rating !== undefined && reviewCount !== undefined && (
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">
                ({reviewCount})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
