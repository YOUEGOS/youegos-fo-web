import { useState } from 'react';
import { Check, Truck, Shield } from 'lucide-react';
import type { ProductDTO } from '@/types';

interface ProductInfoProps {
  product: ProductDTO;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
  selectedColor: number;
  setSelectedColor: (color: number) => void;
  selectedSize: number;
  setSelectedSize: (size: number) => void;
  quantity: number;
  setQuantity: (value: number) => void;
}

export default function ProductInfo({
  product,
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
  // Animation feedback ajout au panier
  const [isAdded, setIsAdded] = useState(false);
  // Calculer la réduction si le prix original est fourni
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="mt-8 lg:mt-0 space-y-8">
      {/* En-tête */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-4">
          <div className="h-px w-12 bg-accent/50"></div>
          <span className="font-display text-accent tracking-wider text-sm uppercase">
            {product.categoryName || 'Collection Premium'}
          </span>
          <div className="h-px w-12 bg-accent/50"></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-display text-text-primary">{product.name}</h1>
        
        {/* Prix et réduction */}
        <div className="flex items-baseline gap-4">
          <span className="text-2xl font-display text-text-primary">
            {product.price.toFixed(2)} €
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-lg text-text-secondary/50 line-through font-sans">
                {product.originalPrice.toFixed(2)} €
              </span>
              <span className="
                px-3 py-1 rounded-sm text-xs font-display tracking-wider
                bg-background-light/50 backdrop-blur-sm
                border border-accent-light/20
                text-accent
              ">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div className="space-y-6">
        <p className="text-text-secondary font-sans leading-relaxed">{product.description}</p>

        {/* Services */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Truck className="h-5 w-5" />, text: "Livraison express offerte" },
            { icon: <Shield className="h-5 w-5" />, text: "Retours gratuits sous 30 jours" }
          ].map((service, index) => (
            <div 
              key={index}
              className="
                flex items-center gap-3 p-4
                bg-background-light/50 backdrop-blur-sm
                border border-accent-light/10 rounded-sm
                group transition-all duration-300 hover:border-accent-light/20
              "
            >
              <div className="text-accent-light transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
              <p className="text-sm text-text-secondary font-sans">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Couleurs */}
      <div className="space-y-4">
        <h3 className="font-display text-text-primary">Couleur</h3>
        <div className="flex gap-3">
          {Array.from(new Map(
            product.variants?.map(v => [v.color.id, v.color]) || []
          ).values()).map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`
                w-12 h-12 rounded-sm
                border-2 transition-all duration-300
                ${selectedColor === color.id
                  ? 'border-accent ring-1 ring-accent/20'
                  : 'border-accent-light/10 hover:border-accent-light/20'
                }
              `}
              title={color.name}
            >
              <div
                className="w-full h-full rounded-sm"
                style={{ backgroundColor: color.hexCode }}
              />
            </button>
          ))} 
        </div>
      </div>
      
      {/* Tailles */}
      <div className="space-y-4">
        <h3 className="font-display text-text-primary">Taille</h3>
        <div className="grid grid-cols-4 gap-3">
          {Array.from(new Map(
            product.variants?.map(v => [v.size.id, v.size]) || []
          ).values()).map((size) => {
            const variant = product.variants?.find(
              v => v.color.id === selectedColor && v.size.id === size.id
            );
            const isAvailable = variant?.available ?? false;

            return (
              <button
                key={size.id}
                onClick={() => isAvailable && setSelectedSize(size.id)}
                disabled={!isAvailable}
                className={`
                  py-3 font-display text-sm tracking-wider uppercase
                  border rounded-sm transition-all duration-300
                  ${selectedSize === size.id
                    ? 'bg-accent/10 text-accent border-accent-light/20'
                    : isAvailable
                      ? 'text-text-secondary border-accent-light/10 hover:border-accent-light/20'
                      : 'text-text-secondary/30 border-accent-light/5 cursor-not-allowed'
                  }
                `}
              >
                {size.name}
              </button>
            );
          })}          
        </div>
      </div>
      
      {/* Quantité */}
      <div className="space-y-4">
        <h3 className="font-display text-text-primary">Quantité</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="
              w-10 h-10 rounded-sm
              border border-accent-light/20
              text-text-primary hover:text-accent
              transition-all duration-300
              hover:border-accent-light/40
            "
          >
            -
          </button>
          <span className="font-display text-text-primary w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="
              w-10 h-10 rounded-sm
              border border-accent-light/20
              text-text-primary hover:text-accent
              transition-all duration-300
              hover:border-accent-light/40
            "
          >
            +
          </button>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={() => {
            onAddToCart();
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
          }}
          className={`
            flex-1 px-8 py-4 rounded-sm font-display
            transition-all duration-300
            ${isAdded
              ? 'bg-accent-light text-text-primary border border-accent-light'
              : 'bg-accent hover:bg-accent-light text-text-primary border border-accent hover:border-accent-light'
            }
            shadow-sm shadow-accent/10 hover:shadow-md hover:shadow-accent/20
          `}
        >
          {isAdded ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="h-5 w-5" />
              Ajouté au panier
            </span>
          ) : (
            'Ajouter au panier'
          )}
        </button>
       {/* <button
          onClick={onToggleWishlist}
          className={`
            p-4 rounded-sm
            border transition-all duration-300
            ${isWishlisted
              ? 'border-accent-light/40 text-accent'
              : 'border-accent-light/20 text-text-secondary hover:text-accent hover:border-accent-light/40'
            }
          `}
        >
          <svg
            className="h-6 w-6 transition-colors"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {isWishlisted ? 'Retirer de la liste de souhaits' : 'Ajouter à la liste de souhaits'}
        </button> */}
      </div>
    </div>
  );
}
