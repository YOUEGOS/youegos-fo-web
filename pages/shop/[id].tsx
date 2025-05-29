import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import { addToCart } from '@/store/features/cartSlice';
import { getProductWithVariant } from '@/store/features/productDetailSlice';

const ProductDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(state => state.productDetail);

  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Récupère l'id produit et variantId depuis l'URL (ou query string)
  const productId = Number(router.query.id);
  const variantId = Number(router.query.variantId) || 0;
  useEffect(() => {
    if (productId) {
      dispatch(getProductWithVariant({ productId, variantId }));
    }
  }, [productId, variantId, dispatch]);

  // Sélectionne la première variante disponible à l'arrivée ou quand le produit change
  useEffect(() => {
    if (product?.variants?.length) {
      const firstAvailableVariant = product.variants.find(variant => variant.available);
      if (firstAvailableVariant) {
        setSelectedColor(firstAvailableVariant.color.id);
        setSelectedSize(firstAvailableVariant.size.id);
      }
    }
  }, [product]);

  // Trouver la variante sélectionnée
  const selectedVariant = product?.variants?.find(
    v => v.color.id === selectedColor && v.size.id === selectedSize
  );

  // Correction : utilise l'action addToCart importée
  const handleAddToCart = () => {
    if (!product) return;
    const selectedVariant = product.variants?.find(
      v => v.color.id === selectedColor && v.size.id === selectedSize
    );
    if (!selectedVariant) return;
    dispatch(addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: product.price,
      quantity,
      image: selectedVariant.images?.[0]?.imageUrl || product.mainImageUrl,
      color: selectedVariant.color.name,
      size: selectedVariant.size.name,
    }));
  };


  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Ici, vous pourriez ajouter une logique pour mettre à jour la liste de souhaits côté serveur
  };

  if (loading) return <div>Chargement…</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!product) return <div>Produit introuvable</div>;

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
              images={(() => {
                const selectedVariant = product.variants?.find(
                  v => v.color.id === selectedColor && v.size.id === selectedSize
                );
                if (selectedVariant && selectedVariant.images && selectedVariant.images.length > 0) {
                  return selectedVariant.images.map(img => img.imageUrl);
                }
                return product.commonImages?.map(image => image.imageUrl) || [];
              })()}
              name={product.name}
              isNew={product.isNew}
              isBestSeller={product.isBestSeller}
              originalPrice={product.originalPrice}
              price={product.price}
            />

            {/* Détails du produit */}
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={isWishlisted}
              selectedColor={selectedColor}
              setSelectedColor={(color: string | number) => setSelectedColor(parseInt(color.toString()))}
              selectedSize={selectedSize}
              setSelectedSize={(size: string | number) => setSelectedSize(parseInt(size.toString()))}
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
