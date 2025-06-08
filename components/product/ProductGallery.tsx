import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  originalPrice?: number;
  price?: number;
}

export default function ProductGallery({ 
  images, 
  name, 
  isNew, 
  isBestSeller, 
  originalPrice,
  price 
}: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Calculer la réduction si le prix original est fourni
  const discount = originalPrice && price 
    ? Math.round((1 - price / originalPrice) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="
        aspect-[4/5] bg-background-light/50 backdrop-blur-sm
        border border-accent-light/10 rounded-sm overflow-hidden relative
        group
      ">
        <img
          src={images[currentImageIndex]}
          alt={`${name} - Vue ${currentImageIndex + 1}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/20" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {isNew && (
            <span className="
              inline-flex items-center px-4 py-1
              bg-background-light/80 backdrop-blur-sm
              border border-accent-light/20 rounded-sm
              font-display text-xs tracking-wider text-accent
              shadow-sm shadow-accent/5
            ">
              Nouveau
            </span>
          )}
          {isBestSeller && (
            <span className="
              inline-flex items-center px-4 py-1
              bg-accent/10 backdrop-blur-sm
              border border-accent-light/20 rounded-sm
              font-display text-xs tracking-wider text-accent-light
              shadow-sm shadow-accent/5
            ">
              Best-seller
            </span>
          )}
          {originalPrice && price && originalPrice > price && (
            <span className="
              inline-flex items-center px-4 py-1
              bg-background-light/80 backdrop-blur-sm
              border border-accent-light/20 rounded-sm
              font-display text-xs tracking-wider text-accent
              shadow-sm shadow-accent/5
            ">
              -{discount}%
            </span>
          )}
        </div>
        
        {/* Navigation des images */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevImage}
            className="
              p-3 rounded-sm
              bg-background-light/80 backdrop-blur-sm
              border border-accent-light/20
              text-text-primary hover:text-accent
              transition-all duration-300 hover:border-accent-light/40
              transform hover:-translate-x-1
            "
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextImage}
            className="
              p-3 rounded-sm
              bg-background-light/80 backdrop-blur-sm
              border border-accent-light/20
              text-text-primary hover:text-accent
              transition-all duration-300 hover:border-accent-light/40
              transform hover:translate-x-1
            "
            aria-label="Image suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Miniatures */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`
              aspect-square rounded-sm overflow-hidden
              border transition-all duration-300
              ${currentImageIndex === index
                ? 'border-accent-light/40 ring-1 ring-accent-light/20'
                : 'border-accent-light/10 hover:border-accent-light/20'
              }
            `}
          >
            <div className="w-full h-full relative group">
              <img
                src={image}
                alt={`${name} - Miniature ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/20" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
