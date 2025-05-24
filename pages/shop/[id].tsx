import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';

// Types
type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  colors: { name: string; value: string; available: boolean }[];
  sizes: { name: string; available: boolean }[];
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Données de démonstration
const product: Product = {
  id: 1,
  name: 'Chemise Oversize YOUEGOS',
  price: 39.99,
  originalPrice: 49.99,
  description: 'Notre chemise oversize YOUEGOS allie confort et style. Conçue dans un coton biologique de qualité supérieure, elle offre un ajustement décontracté parfait pour un look urbain et tendance.',
  details: [
    '100% coton biologique certifié',
    'Tissu respirant et doux',
    'Coupe oversize moderne',
    'Col classique avec boutons en nacre',
    'Fabriqué en France'
  ],
  colors: [
    { name: 'Noir', value: '#000000', available: true },
    { name: 'Blanc', value: '#FFFFFF', available: true },
    { name: 'Bleu marine', value: '#1E3A8A', available: true }
  ],
  sizes: [
    { name: 'S', available: true },
    { name: 'M', available: true },
    { name: 'L', available: true },
    { name: 'XL', available: false }
  ],
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ],
  isNew: true,
  isBestSeller: true,

};

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sélectionner automatiquement la première couleur et taille disponibles
  useEffect(() => {
    if (product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0].name);
    }
    if (product.sizes.length > 0 && !selectedSize) {
      const availableSize = product.sizes.find(size => size.available);
      if (availableSize) setSelectedSize(availableSize.name);
    }
  }, []);

  const handleAddToCart = () => {
    // Logique d'ajout au panier
    console.log('Ajout au panier :', { 
      id: product.id, 
      color: selectedColor, 
      size: selectedSize, 
      quantity 
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Ici, vous pourriez ajouter une logique pour mettre à jour la liste de souhaits côté serveur
  };

  return (
    <Layout 
      title={`${product.name} - YOUEGOS`}
      description={product.description}
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Fil d'Ariane */}
          <nav className="flex items-center text-sm text-gray-500 mb-8">
            <Link 
              href="/shop" 
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour à la boutique
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Galerie d'images */}
            <ProductGallery 
              images={product.images}
              name={product.name}
              isNew={product.isNew}
              isBestSeller={product.isBestSeller}
              originalPrice={product.originalPrice}
              price={product.price}
            />

            {/* Détails du produit */}
            <ProductInfo
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              description={product.description}

              colors={product.colors}
              sizes={product.sizes}
              onAddToCart={handleAddToCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={isWishlisted}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
