import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Shield, Truck } from 'lucide-react';
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

  // Récupère l'id produit et variantId depuis l'URL
  const { id, variantId: urlVariantId } = router.query;
  const productId = id ? parseInt(id as string, 10) : 0;
  const initialVariantId = urlVariantId ? parseInt(urlVariantId as string, 10) : 0;

  useEffect(() => {
    if (productId && !isNaN(productId)) {
      dispatch(getProductWithVariant({ productId, variantId: initialVariantId }));
    }
  }, [productId, initialVariantId, dispatch]);

  // Sélectionne la première variante disponible à l'arrivée ou quand le produit change
  useEffect(() => {
    if (product?.variants?.length) {
      // Si on a un variantId dans l'URL, on essaie de le sélectionner
      if (initialVariantId) {
        const urlVariant = product.variants.find(v => v.id === initialVariantId && v.available);
        if (urlVariant) {
          setSelectedColor(urlVariant.color.id);
          setSelectedSize(urlVariant.size.id);
          return;
        }
      }

      // Sinon, on prend la première variante disponible
      const firstAvailableVariant = product.variants.find(variant => variant.available);
      if (firstAvailableVariant) {
        setSelectedColor(firstAvailableVariant.color.id);
        setSelectedSize(firstAvailableVariant.size.id);
      }
    }
  }, [product, initialVariantId]);

  // Trouver la variante sélectionnée et mettre à jour l'URL
  const selectedVariant = product?.variants?.find(
    v => v.color.id === selectedColor && v.size.id === selectedSize && v.available
  );

  useEffect(() => {
    if (selectedVariant) {
      router.replace(
        {
          pathname: router.pathname,
          query: { id: productId, variantId: selectedVariant.id }
        },
        undefined,
        { shallow: true }
      );
    }
  }, [selectedVariant, productId, router]);

  // Gestion de l'ajout au panier
  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

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

  // États de chargement et d'erreur
  if (loading) {
    return (
      <Layout title="Chargement - YOUEGOS">
        <div className="bg-background min-h-screen">
          {/* Hero section avec effet de chargement */}
          <div className="relative h-[40vh] overflow-hidden">
            <div className="absolute inset-0 bg-background-light/50 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
            {/* Fil d'Ariane squelette */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-32 h-4 bg-background-light/50 rounded-sm animate-pulse" />
              <div className="w-4 h-4 bg-accent/20 rounded-sm" />
              <div className="w-48 h-4 bg-background-light/50 rounded-sm animate-pulse" />
            </div>

            {/* Contenu principal squelette */}
            <div className="
              lg:grid lg:grid-cols-2 lg:gap-16
              bg-background-light/50 backdrop-blur-sm
              border border-accent-light/10 rounded-sm
              p-8 lg:p-12
            ">
              {/* Galerie squelette */}
              <div className="space-y-6">
                <div className="aspect-[4/5] bg-background-light/50 rounded-sm animate-pulse" />
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-background-light/50 rounded-sm animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Informations produit squelette */}
              <div className="space-y-8 mt-8 lg:mt-0">
                <div className="space-y-4">
                  <div className="w-32 h-4 bg-background-light/50 rounded-sm animate-pulse" />
                  <div className="w-64 h-8 bg-background-light/50 rounded-sm animate-pulse" />
                  <div className="w-48 h-6 bg-background-light/50 rounded-sm animate-pulse" />
                </div>

                <div className="space-y-4">
                  <div className="w-full h-24 bg-background-light/50 rounded-sm animate-pulse" />
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="h-16 bg-background-light/50 rounded-sm animate-pulse" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-32 h-4 bg-background-light/50 rounded-sm animate-pulse" />
                  <div className="flex gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-background-light/50 rounded-sm animate-pulse" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-32 h-4 bg-background-light/50 rounded-sm animate-pulse" />
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-10 bg-background-light/50 rounded-sm animate-pulse" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-32 h-4 bg-background-light/50 rounded-sm animate-pulse" />
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-background-light/50 rounded-sm animate-pulse" />
                    <div className="w-12 h-10 bg-background-light/50 rounded-sm animate-pulse" />
                    <div className="w-10 h-10 bg-background-light/50 rounded-sm animate-pulse" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="flex-1 h-14 bg-background-light/50 rounded-sm animate-pulse" />
                  <div className="w-14 h-14 bg-background-light/50 rounded-sm animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Erreur - YOUEGOS">
        <div className="
          min-h-[50vh] flex flex-col items-center justify-center
          bg-background text-text-primary
        ">
          <div className="
            max-w-md w-full mx-auto p-8
            bg-background-light/50 backdrop-blur-sm
            border border-accent-light/10 rounded-sm
            text-center space-y-4
          ">
            <h2 className="text-2xl font-display text-accent">Une erreur est survenue</h2>
            <p className="text-text-secondary">{error}</p>
            <Link 
              href="/shop"
              className="
                inline-flex items-center gap-2 mt-6
                px-6 py-3 rounded-sm
                bg-accent/10 hover:bg-accent/20
                border border-accent-light/20
                text-accent font-display
                transition-all duration-300
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la boutique
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Produit introuvable - YOUEGOS">
        <div className="
          min-h-[50vh] flex flex-col items-center justify-center
          bg-background text-text-primary
        ">
          <div className="
            max-w-md w-full mx-auto p-8
            bg-background-light/50 backdrop-blur-sm
            border border-accent-light/10 rounded-sm
            text-center space-y-4
          ">
            <h2 className="text-2xl font-display text-accent">Produit introuvable</h2>
            <p className="text-text-secondary">
              Le produit que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link 
              href="/shop"
              className="
                inline-flex items-center gap-2 mt-6
                px-6 py-3 rounded-sm
                bg-accent/10 hover:bg-accent/20
                border border-accent-light/20
                text-accent font-display
                transition-all duration-300
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la boutique
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${product.name} - YOUEGOS`}
      description={product.description}
    >
      <div className="bg-background min-h-screen">
        {/* Hero section avec overlay flou */}
        <div className="relative h-[40vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: `url(${product.mainImageUrl})`,
              filter: 'blur(10px) brightness(0.5)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          {/* Fil d'Ariane */}
          <nav className="flex items-center text-sm text-text-secondary mb-12">
            <Link 
              href="/shop" 
              className="
                flex items-center gap-2 group
                text-text-secondary hover:text-accent
                transition-colors duration-300
              "
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Retour à la boutique
            </Link>
            <span className="mx-3 text-accent/20">/</span>
            <span className="text-text-primary font-display">{product.name}</span>
          </nav>

          {/* Contenu principal */}
          <div className="
            lg:grid lg:grid-cols-2 lg:gap-16
            bg-background-light/50 backdrop-blur-sm
            border border-accent-light/10 rounded-sm
            p-8 lg:p-12
          ">
            {/* Galerie d'images */}
            <ProductGallery 
              images={(() => {
                // Récupérer les images de la variante sélectionnée
                const selectedVariant = product.variants?.find(
                  v => v.color.id === selectedColor && v.size.id === selectedSize
                );
                const variantImages = selectedVariant?.images
                  ?.map(img => img.imageUrl)
                  ?.filter((url): url is string => typeof url === 'string') ?? [];

                // Si on a des images de variante, les utiliser
                if (variantImages.length > 0) {
                  return variantImages;
                }

                // Sinon, utiliser l'image principale ou une image par défaut
                const mainImage = product.mainImageUrl ?? '/images/product-placeholder.jpg';
                return [mainImage];
              })()} 
              name={product.name}
              isNew={product.isNew}
              isBestSeller={product.isBestSeller}
              originalPrice={product.originalPrice}
              price={product.price}
            />

            {/* Informations produit */}
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={isWishlisted}
              selectedColor={selectedColor}
              setSelectedColor={(color: string | number) => setSelectedColor(Number(color))}
              selectedSize={selectedSize}
              setSelectedSize={(size: string | number) => setSelectedSize(Number(size))}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

          {/* Section des services */}
          <div className="
            mt-16 py-16 border-t border-accent-light/10
            bg-background-light/30 backdrop-blur-sm
          ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Truck className="h-8 w-8" />,
                    title: "Livraison Express",
                    description: "Livraison offerte en 24/48h pour toute commande"
                  },
                  {
                    icon: <Shield className="h-8 w-8" />,
                    title: "Retours Gratuits",
                    description: "30 jours pour changer d'avis, retours gratuits"
                  },
                  {
                    icon: <Check className="h-8 w-8" />,
                    title: "Qualité Premium",
                    description: "Matériaux haut de gamme et finitions soignées"
                  }
                ].map((service, index) => (
                  <div 
                    key={index}
                    className="
                      p-6 text-center
                      bg-background-light/50
                      border border-accent-light/10 rounded-sm
                      group transition-all duration-300
                      hover:border-accent-light/20
                    "
                  >
                    <div className="
                      inline-flex p-4 rounded-sm
                      bg-accent/5 text-accent
                      transition-all duration-300
                      group-hover:scale-110
                    ">
                      {service.icon}
                    </div>
                    <h3 className="
                      mt-4 mb-2
                      font-display text-lg text-text-primary
                    ">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Séparation avec le footer */}
          <div className="h-16 bg-gradient-to-b from-background-light/0 to-background"></div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
