import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/product/ProductCard';
import { useAppSelector, useAppDispatch } from '@/store';
import { RootState } from '@/store';
import { fetchFeaturedProducts } from '@/store/features/featuredProductsSlice';
import Services from '@/components/sections/Services';
import Newsletter from '@/components/sections/Newsletter';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state: RootState) => state.featuredProducts);

  // Afficher les données dans la console pour vérification
  useEffect(() => {
    console.log('Produits vedettes:', { items, status, error });
  }, [items, status, error]);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return (
    <Layout>
      <div className="flex flex-col">
        {/* Hero avec image pleine largeur */}
        <section className="relative h-screen min-h-[600px] bg-background-dark overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: 'url(https://youegos.com/cdn/shop/files/youegos-hero-section-banner-updated.webp?v=1747821743&width=1500)',
              transform: 'scale(1.05)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-background-dark/30 to-background-dark/70" aria-hidden="true" />
          </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-accent-light/50" />
            <span className="font-display text-accent-light tracking-wider text-sm md:text-base uppercase">
              Collection Premium
            </span>
            <div className="h-px w-12 bg-accent-light/50" />
          </div>
          <h1 className="text-4xl md:text-7xl font-display mb-8 text-text-primary leading-tight">
            Exprime ton style,<br />sans compromis
          </h1>
          <p className="text-base md:text-lg mb-12 font-sans max-w-2xl mx-auto text-text-secondary leading-relaxed">
            Des pièces originales, conçues avec conscience pour ceux qui veulent se distinguer avec sens.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center px-10 py-4 text-base font-display rounded-sm bg-accent hover:bg-accent-light text-text-primary transition-all duration-300 border border-accent hover:border-accent-light shadow-sm shadow-accent/10 hover:shadow-md hover:shadow-accent/20"
            >
              Explorer la collection
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
        </section>

      {/* Sélection de produits - Style premium */}
      <section className="w-full py-32 bg-background relative overflow-hidden">
        {/* Effet de fond subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-light/5 via-transparent to-transparent opacity-30" aria-hidden="true" />
        <div className="absolute -left-40 top-0 w-96 h-96 rounded-full bg-accent-light/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-accent-light/5 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="md:max-w-xl">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-accent-light/50" />
                <span className="font-display text-accent-light tracking-wider text-sm uppercase">Notre sélection</span>
                <div className="h-px w-8 bg-accent-light/50" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-6 leading-tight">Les Incontournables</h2>
              <p className="text-lg text-text-secondary font-sans leading-relaxed">Pièces phares pour un style affirmé et authentique, sélectionnées avec soin.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items?.map((product) => (
              <div key={product.id + '-' + product.variantId} className="transform transition-transform duration-300 hover:scale-[1.02]">
                <ProductCard
                  id={product.id}
                  variantId={product.variantId}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.imageUrl}
                  category={product.category || 'Collection Premium'}
                  isNew={product.isNew}
                  isBestSeller={product.isBestSeller}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  showWishlist={true}
                  className="h-full"
                />
              </div>
            ))}
            {[
              {
                id: 1,
                variantId: 1,
                name: 'Chemise Classique',
                price: 59.90,
                originalPrice: 79.90,
                image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                category: 'Chemises',
                colors: ['blue', 'white'],
                isNew: true,
                rating: 4.5,
                reviewCount: 124
              },
              {
                id: 2,
                variantId: 2,
                name: 'Jean Slim',
                price: 89.90,
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                category: 'Pantalons',
                colors: ['blue', 'black'],
                isBestSeller: true,
                rating: 4.8,
                reviewCount: 89
              },
              {
                id: 3,
                variantId: 3,
                name: 'Veste Urbaine',
                price: 129.90,
                originalPrice: 149.90,
                image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                category: 'Vestes',
                colors: ['black', 'gray'],
                rating: 4.7,
                reviewCount: 156
              },
              {
                id: 4,
                variantId: 4,
                name: 'Robe Élégance',
                price: 79.90,
                image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                category: 'Robes',
                colors: ['black', 'red'],
                isNew: true,
                rating: 4.9,
                reviewCount: 234
              }
            ].map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                variantId={product?.variantId}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                rating={product.rating}
                reviewCount={product.reviewCount}
                showWishlist={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Boutique Premium */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="bg-background-light rounded-sm p-8 md:p-12 overflow-hidden relative border border-accent/10">
            {/* Décoration de fond */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 backdrop-blur-3xl opacity-30" />
            <div className="absolute -right-40 top-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -left-40 bottom-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              {/* Texte et bouton */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="h-px w-8 bg-accent/50"></div>
                  <span className="font-display text-accent tracking-wider text-sm uppercase">Nouvelle Collection</span>
                  <div className="h-px w-8 bg-accent/50"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-8 leading-tight">
                  L'Excellence<br />dans chaque Détail
                </h2>
                <p className="text-lg text-text-secondary mb-12 font-sans leading-relaxed">
                  Découvrez notre collection de chemises raffinées, où l'élégance rencontre le confort. 
                  Conçues avec des matières nobles et une attention particulière aux finitions pour sublimer votre allure.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                  <Link 
                    href="/shop" 
                    className="group inline-flex items-center text-accent hover:text-accent-light font-display text-lg transition-colors duration-300"
                  >
                    Découvrir la Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="w-full lg:w-1/2 h-[600px] relative rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-accent-light/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src="https://youegos.com/cdn/shop/files/youegos-hero-section-bottom-main-updated-1_1.webp?v=1748245815"
                  alt="Collection de chemises élégantes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                {/* Badge promotion */}
                <div className="absolute top-6 right-6 bg-accent/90 backdrop-blur-sm text-text-primary text-sm font-display px-4 py-2 rounded-sm">
                  -20%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="bg-background-light rounded-sm p-8 md:p-16 overflow-hidden relative border border-accent/10">
            {/* Décoration de fond */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 backdrop-blur-3xl opacity-30" />
            <div className="absolute -right-40 top-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -left-40 bottom-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row-reverse items-center gap-16">
              {/* Image */}
              <div className="w-full lg:w-1/2 h-[600px] relative rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-accent-light/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src="https://youegos.com/cdn/shop/files/youegos-hero-section-bottom-1_1.webp?v=1748245880&width=2000"
                  alt="Atelier de couture Youegos"
                  fill
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Contenu */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="inline-block font-display text-accent mb-6 tracking-wider text-sm uppercase">Notre Histoire</span>
                <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-8 leading-tight">
                  L'Art de la Mode<br />Intemporelle
                </h2>
                <p className="text-lg text-text-secondary mb-12 font-sans leading-relaxed">
                  Fondée en 2024 par Stéphanie M, Youegos incarne l'excellence artisanale et l'innovation stylistique. 
                  Notre passion pour la mode se traduit par des créations d'exception, où chaque pièce raconte une histoire d'élégance et d'authenticité.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      title: "Excellence Artisanale",
                      description: "Un savoir-faire d'exception et une attention méticuleuse aux détails"
                    },
                    {
                      title: "Mode Éthique",
                      description: "Un engagement profond pour une mode responsable et des pratiques équitables"
                    },
                    {
                      title: "Innovation Durable",
                      description: "L'alliance parfaite entre tradition artisanale et innovations éco-responsables"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-6 w-6 rounded-sm border border-accent/30 group-hover:border-accent transition-colors duration-300">
                          <svg className="h-3 w-3 text-accent" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M3.707 9.293a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 011.414-1.414L3 7.086l5.293-5.293a1 1 0 011.414 1.414l-6 6z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-display text-lg text-text-primary group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                        <p className="mt-2 text-text-secondary font-sans">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <Link 
                    href="/about" 
                    className="group inline-flex items-center text-accent hover:text-accent-light font-display text-lg transition-colors duration-300"
                  >
                    Découvrir notre Histoire
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Premium */}
      <Services />

      {/* Newsletter Premium */}
      <Newsletter />
      
      {/* Bouton de retour en haut */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-background-light backdrop-blur-sm border border-accent/20 text-text-primary rounded-sm shadow-lg transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 group z-50"
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-6 w-6 text-accent group-hover:translate-y-[-2px] transition-transform duration-300" />
        </button>
      )}
    </div>
    </Layout>
  );
};

export default Home;
