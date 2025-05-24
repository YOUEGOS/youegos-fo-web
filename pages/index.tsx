import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/product/ProductCard';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      <div className="flex flex-col gap-24">
      {/* Hero avec image pleine largeur */}
      <section className="relative w-full h-[60vh] min-h-[400px]">
        {/* Image de fond */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1500&q=80)',
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out'
        }}>
          <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>
        </div>
        
        {/* Contenu */}
        <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display tracking-tight">
              Exprime ton style, sans compromis
            </h1>
            <p className="text-sm md:text-base mb-8 font-normal max-w-2xl mx-auto text-white/90">
              Des pièces originales, conçues avec conscience pour ceux qui veulent se distinguer avec sens.
            </p>
            <div className="flex justify-center w-full mt-8">
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                    Explorer la collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sélection de produits - Mise en page originale */}
      <section className="w-full pt-4 pb-8 bg-white -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="md:max-w-md">
              <span className="inline-block text-sm font-semibold text-sky-600 mb-2">Notre sélection</span>
              <h2 className="text-3xl font-bold text-gray-900">Les incontournables</h2>
              <p className="mt-2 text-gray-600">Pièces phares pour un style affirmé et authentique.</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-sky-600 transition-colors duration-200 group whitespace-nowrap"
            >
              Voir toute la collection
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
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
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                rating={product.rating}
                reviewCount={product.reviewCount}
                showAddToCart={true}
                showWishlist={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Boutique */}
      <section className="w-full bg-white -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-6 md:p-8 overflow-hidden relative">
            {/* Décoration de fond */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-sky-100 opacity-50"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-100 opacity-50"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              {/* Texte et bouton */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="inline-block text-sm font-semibold text-sky-600 mb-3">Nouveautés</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">Collection de chemises</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Découvrez nos chemises légères et respirantes, parfaites pour les beaux jours. 
                  Matières naturelles, coupes élégantes et finitions soignées pour un style raffiné.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                    Explorer la collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="w-full lg:w-1/2 h-80 lg:h-96 relative rounded-xl overflow-hidden shadow-xl transform lg:rotate-1 transition-transform duration-500 hover:rotate-0">
                <Image
                  src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Collection de chemises élégantes"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Badge solde */}
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  -20% sur la sélection
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="w-full bg-white -mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 overflow-hidden relative">
            {/* Décoration de fond */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-sky-50 opacity-50"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-50 opacity-50"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              {/* Image */}
              <div className="w-full lg:w-1/2 h-96 relative rounded-xl overflow-hidden shadow-xl transform lg:-rotate-1 transition-transform duration-500 hover:rotate-0">
                <Image
                  src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Atelier de couture Youegos"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Contenu */}
              <div className="w-full lg:w-1/2">
                <span className="inline-block text-sm font-semibold text-sky-600 mb-3">Notre histoire</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">L'élégance intemporelle</h2>
                <p className="text-gray-600 mb-6">
                  Youegos est une marque de mode fondée en 2024 par Stéphanie M, engagée dans la création de vêtements de haute qualité, 
                  intemporels et originaux, alliant style, confort, durabilité et caractère.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Éthique',
                      description: 'Des conditions de travail équitables et un respect total des droits humains.'
                    },
                    {
                      title: 'Durabilité',
                      description: 'Des matériaux durables et des processus de production à faible impact environnemental.'
                    },
                    {
                      title: 'Transparence',
                      description: 'Une traçabilité complète de nos produits, de la matière première au produit fini.'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-sky-100 text-sky-600">
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M3.707 9.293a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 011.414-1.414L3 7.086l5.293-5.293a1 1 0 011.414 1.414l-6 6z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a href="/about" className="inline-flex items-center text-sky-600 font-medium hover:text-sky-500">
                    En savoir plus sur notre engagement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section className="w-full pt-4 pb-0 bg-gradient-to-br from-gray-50 to-white -mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Livraison offerte',
                description: 'Livraison gratuite sur toutes vos commandes',
                icon: (
                  <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                  </svg>
                )
              },
              {
                title: 'Retour facile',
                description: '30 jours pour changer d\'avis',
                icon: (
                  <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
                  </svg>
                )
              },
              {
                title: '100% coton bio',
                description: 'Matériaux naturels et durables',
                icon: (
                  <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.5v15m7.5-7.5h-15"></path>
                  </svg>
                )
              },
              {
                title: 'Éco-responsable',
                description: 'Engagés pour la planète',
                icon: (
                  <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                )
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-sky-50 group-hover:bg-sky-100 transition-colors duration-300 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-white pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Abonnez-vous à notre newsletter</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Recevez en avant-première nos nouveautés, offres exclusives et conseils de style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors duration-200">
              S'abonner
            </button>
          </div>
        </div>
      </section>
      
      {/* Bouton de retour en haut */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
    </Layout>
  );
};

export default Home;
