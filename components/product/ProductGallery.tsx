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
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
        <img
          src={images[currentImageIndex]}
          alt={`${name} - Vue ${currentImageIndex + 1}`}
          className="w-full h-full object-cover object-center"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
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
          {originalPrice && price && originalPrice > price && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
              -{discount}%
            </span>
          )}
        </div>
        
        {/* Navigation des images */}
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-5 w-5 text-gray-900" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-5 w-5 text-gray-900" />
        </button>
      </div>
      
      {/* Miniatures */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              currentImageIndex === index ? 'border-sky-500' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${name} - Miniature ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
