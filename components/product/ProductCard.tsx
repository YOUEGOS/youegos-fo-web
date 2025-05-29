import Link from 'next/link';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  variantId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  reviewCount?: number;
  showWishlist?: boolean;
  className?: string;
}

export default function ProductCard({
  id,
  variantId,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isBestSeller = false,
  rating,
  reviewCount,
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
        <Link href={{
      pathname: `/shop/${id}`,
      query: { variantId }
    }} className="block">
          <div className="aspect-square bg-gray-100">
            <Image
              src={image}
              alt={name}
              width={400}
              height={400}
              className="w-full h-full object-cover object-center transition-transform duration-300"
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

        {/**
        // Bouton wishlist fixe, toujours visible
        {showWishlist && (
          <button
            className="absolute bottom-3 right-3 z-20 rounded-full bg-white shadow-lg p-2 flex items-center justify-center border border-gray-200 hover:bg-sky-50 active:scale-95 transition-all duration-150"
            style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
            aria-label="Ajouter aux favoris"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implémenter l'ajout à la liste de souhaits
              console.log('Ajouter aux favoris:', id);
            }}
          >
            <Heart className="h-5 w-5 text-pink-500" fill="none" />
          </button>
        )}
        */}
      </div>
      
      <div className="p-4">
        {category && (
          <p className="text-xs text-gray-500 mb-1">{category}</p>
        )}
        
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
