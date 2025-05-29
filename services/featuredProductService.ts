import api from '@/lib/api';
import type { ProductCardDTO } from '@/types';

/**
 * Récupère les 4 derniers produits en vedette
 * @returns Une promesse résolue avec la liste des produits vedettes
 */
export const getLatestFeaturedProducts = async (): Promise<ProductCardDTO[]> => {
  try {
    const response = await api.get<ProductCardDTO[]>('/featured-products/latest');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits vedettes:', error);
    throw error;
  }
};

/**
 * Récupère tous les produits en vedette
 * @returns Une promesse résolue avec la liste complète des produits vedettes
 */
export const getAllFeaturedProducts = async (): Promise<ProductCardDTO[]> => {
  try {
    const response = await api.get<ProductCardDTO[]>('/featured-products');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les produits vedettes:', error);
    throw error;
  }
};
