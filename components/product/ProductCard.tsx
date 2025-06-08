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
    <div className={`group relative bg-background-light rounded-sm overflow-hidden border border-accent/10 hover:border-accent transition-all duration-300 ${className}`}>
      <div className="relative overflow-hidden">
        {/* Badge Nouveau ou Best-seller */}
        {(isNew || isBestSeller) && (
          <div className="absolute top-2 left-2 z-10">
            <span className="font-display text-xs px-3 py-1 bg-accent text-text-primary rounded-sm">
              {isNew ? 'Nouveau' : 'Best-seller'}
            </span>
          </div>
        )}
        
        {/* Lien vers la page du produit */}
        <Link href={{
          pathname: `/shop/${id}`,
          query: { variantId }
        }} className="block group-hover:opacity-90 transition-opacity duration-300">
          <div className="aspect-square bg-background">
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
            <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-display bg-accent/90 text-text-primary backdrop-blur-sm transition-colors duration-300 hover:bg-accent">
              Nouveauté
            </span>
          )}
          {isBestSeller && (
            <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-display bg-accent/90 text-text-primary backdrop-blur-sm transition-colors duration-300 hover:bg-accent">
              Best-seller
            </span>
          )}
          {hasDiscount && (
            <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-display bg-accent-dark/90 text-text-primary backdrop-blur-sm transition-colors duration-300 hover:bg-accent-dark">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Actions rapides */}
        {showWishlist && (
          <button
            className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-sm hover:bg-background transition-colors duration-200"
            aria-label="Ajouter aux favoris"
          >
            <Heart className="w-5 h-5 text-accent hover:text-accent-light transition-colors duration-200" />
          </button>
        )}

        {/* Informations produit */}
        <div className="p-6">
          {category && (
            <p className="font-sans text-sm text-text-dark mb-2 tracking-wide uppercase">{category}</p>
          )}
          <h3 className="font-display text-xl text-text-primary mb-3 leading-snug">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-sans text-lg font-medium text-text-primary">
                {price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
              {hasDiscount && (
                <span className="font-sans text-sm text-text-dark line-through">
                  {originalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="font-sans text-sm font-medium text-accent">
                -{discountPercentage}%
              </span>
            )}
          </div>
          
          {/* Note et avis */}
          {rating && (
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(rating) ? 'text-accent fill-current' : 'text-background-light'}`}
                  />
                ))}
              </div>
              {reviewCount && (
                <span className="font-sans text-sm text-text-dark">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
