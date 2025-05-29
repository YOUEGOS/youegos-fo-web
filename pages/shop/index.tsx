import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductCard from '@/components/product/ProductCard';
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchFilteredProducts } from '@/store/features/productsSlice';
import { ProductFilter } from '@/types';

const Shop: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(state => state.products);
  const [filters, setFilters] = useState<ProductFilter>({ sortBy: 'popularity', order: 'asc' });

  useEffect(() => {
    // Appel initial, peut être adapté pour prendre en compte les filtres plus tard
    dispatch(fetchFilteredProducts(filters));
  }, [dispatch]);

  // Création d'un tableau de catégories uniques
  const categories = Array.from(new Set(items.map(product => product.category)));

  return (
    <Layout 
      title="Boutique - YOUEGOS"
      description="Découvrez notre collection exclusive de chemises de qualité supérieure"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Barre de filtres */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Notre Collection de Chemises
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
            <select
              value={filters.sortBy + '-' + (filters.order || 'asc')}
              onChange={e => {
                const [sortBy, order] = e.target.value.split('-');
                setFilters({ sortBy: sortBy as ProductFilter['sortBy'], order: order as ProductFilter['order'] });
                dispatch(fetchFilteredProducts({ sortBy: sortBy as ProductFilter['sortBy'], order: order as ProductFilter['order'] }));
              }}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="popularity-asc">Populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating-desc">Mieux notés</option>
            </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              variantId={product.variantId}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.imageUrl}
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
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-1 rounded-md border border-sky-500 text-sm font-medium text-white bg-sky-600">
              1
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Suivant
            </button>
          </nav>
        </div>
      </div>
      
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
      <section className="w-full bg-white pb-16 mt-16">
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
    </Layout>
  );
};

export default Shop;