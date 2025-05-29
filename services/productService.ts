import api from '@/lib/api';
import type { ProductCardDTO, ProductFilter } from '@/types';

/**
 * Récupère la liste filtrée des produits de la boutique
 * @param filters Filtres à appliquer (price, rating, popularity)
 * @returns Liste de produits filtrée
 */
export const getFilteredProducts = async (filters: ProductFilter = {}): Promise<ProductCardDTO[]> => {
  try {
    const params = new URLSearchParams();
    if (filters.sortBy === 'price') params.append('price', filters.order || 'asc');
    if (filters.sortBy === 'rating') params.append('rating', filters.order || 'asc');
    if (filters.sortBy === 'popularity') params.append('popularity', filters.order || 'asc');
    const response = await api.get<ProductCardDTO[]>(`/products/filter?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits filtrés:', error);
    throw error;
  }
};
