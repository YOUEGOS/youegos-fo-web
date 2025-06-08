import React, { useState, useEffect } from 'react';
import { Filter, X, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import ProductCard from '@/components/product/ProductCard';
import Services from '@/components/sections/Services';
import Newsletter from '@/components/sections/Newsletter';
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchFilteredProducts } from '@/store/features/productsSlice';
import { ProductFilter } from '@/types';

const Shop: React.FC = () => {
  // Animation keyframe pour le fadeIn
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(1rem);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(state => state.products);
  const [filters, setFilters] = useState<ProductFilter>({ sortBy: 'popularity', order: 'asc' });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchFilteredProducts(filters))
      .then(() => {
        setIsLoading(false);
      });
  }, [dispatch, filters]);

  // Création d'un tableau de catégories uniques
  const categories = Array.from(new Set(items.map(product => product.category)));

  return (
    <Layout 
      title="Boutique - YOUEGOS"
      description="Découvrez notre collection exclusive de chemises de qualité supérieure"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="relative mb-16 pb-8 border-b border-accent-light/10">
          <div className="absolute -left-40 top-0 w-96 h-32 rounded-full bg-accent-light/5 blur-3xl" />
          <div className="absolute -right-40 top-0 w-96 h-32 rounded-full bg-accent-light/5 blur-3xl" />
          
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="h-px w-8 bg-accent-light/50"></div>
                <span className="font-display text-accent-light tracking-wider text-sm uppercase">Collection</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl text-text-primary">
                Notre <span className="text-accent-light">Collection</span>
              </h1>
            </div>

            <p className="text-text-secondary font-sans max-w-xl">
              Découvrez notre sélection de chemises raffinées, alliant élégance intemporelle et qualité exceptionnelle.
            </p>
          </div>
        </div>
        {/* Navigation et Filtres */}
        <div className="flex flex-col gap-8 mb-16">
          {/* Catégories */}
          <nav className="flex flex-wrap items-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`
                  px-6 py-3 rounded-sm text-sm font-display tracking-wider
                  border transition-all duration-300
                  ${index === 0
                    ? 'bg-accent-light/10 text-accent-light border-accent-light/20'
                    : 'border-accent-light/10 text-text-secondary hover:text-accent-light hover:border-accent-light/20'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Barre de filtres */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-accent-light/10">
            <div className="flex items-center gap-8">
              <span className="font-display text-sm text-text-secondary tracking-wider">
                {items.length} articles
              </span>
              <div className="h-px flex-grow sm:w-32 bg-accent-light/10"></div>
            </div>
            
            <div className="flex items-center gap-6 ml-auto">
              {/* Filtres */}
              <div className="relative flex-shrink-0">
                <select
                  value={filters.sortBy + '-' + (filters.order || 'asc')}
                  onChange={e => {
                    const [sortBy, order] = e.target.value.split('-');
                    setFilters({ sortBy: sortBy as ProductFilter['sortBy'], order: order as ProductFilter['order'] });
                    dispatch(fetchFilteredProducts({ sortBy: sortBy as ProductFilter['sortBy'], order: order as ProductFilter['order'] }));
                  }}
                  className="
                    appearance-none bg-background-light/50 backdrop-blur-sm
                    border border-accent-light/20 rounded-sm
                    pl-4 pr-10 py-3 text-sm font-display text-text-primary
                    focus:outline-none focus:border-accent-light/40
                    transition-all duration-300 min-w-[180px]
                  "
                >
                  <option value="popularity-asc">Populaires</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="rating-desc">Mieux notés</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <Filter className="h-4 w-4 text-accent-light" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de produits avec animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((product, index) => (
            <div 
              key={product.id}
              className="
                opacity-0 translate-y-4
                animate-[fadeIn_0.6s_ease-out_forwards]
              "
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <ProductCard
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
                showWishlist={true}
              />
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center">
            <nav className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`
                  inline-flex items-center gap-2 px-6 py-3
                  bg-background-light/50 backdrop-blur-sm
                  border rounded-sm font-display text-sm tracking-wider
                  transition-all duration-300
                  ${currentPage === 1
                    ? 'border-accent-light/10 text-text-secondary/50 cursor-not-allowed'
                    : 'border-accent-light/20 text-text-secondary hover:text-accent-light hover:border-accent-light/40 transform hover:-translate-x-1'
                  }
                `}
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Afficher toujours la première et dernière page
                    if (page === 1 || page === totalPages) return true;
                    // Afficher les pages autour de la page courante
                    return Math.abs(currentPage - page) <= 1;
                  })
                  .map((page, index, array) => {
                    // Ajouter des points de suspension si nécessaire
                    if (index > 0 && page - array[index - 1] > 1) {
                      return [
                        <div 
                          key={`ellipsis-${page}`}
                          className="w-10 h-10 flex items-center justify-center text-text-secondary"
                        >
                          ...
                        </div>,
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`
                            w-10 h-10 rounded-sm font-display text-sm
                            flex items-center justify-center
                            transition-all duration-300
                            ${currentPage === page
                              ? 'bg-accent-light/10 text-accent-light border border-accent-light/20'
                              : 'text-text-secondary hover:text-accent-light border border-accent-light/10 hover:border-accent-light/20'
                            }
                          `}
                        >
                          {page}
                        </button>
                      ];
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                          w-10 h-10 rounded-sm font-display text-sm
                          flex items-center justify-center
                          transition-all duration-300
                          ${currentPage === page
                            ? 'bg-accent-light/10 text-accent-light border border-accent-light/20'
                            : 'text-text-secondary hover:text-accent-light border border-accent-light/10 hover:border-accent-light/20'
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  })
                }
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`
                  inline-flex items-center gap-2 px-6 py-3
                  bg-background-light/50 backdrop-blur-sm
                  border rounded-sm font-display text-sm tracking-wider
                  transition-all duration-300
                  ${currentPage === totalPages
                    ? 'border-accent-light/10 text-text-secondary/50 cursor-not-allowed'
                    : 'border-accent-light/20 text-text-secondary hover:text-accent-light hover:border-accent-light/40 transform hover:translate-x-1'
                  }
                `}
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        )}
      </div>
      <Services />
      <Newsletter />
    </Layout>
  );
};

export default Shop;