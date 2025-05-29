// types/index.ts

// DTO complet fidèle à la classe Java ProductDTO
export interface ProductDTO {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  rating?: number;
  reviewCount?: number;
  mainImageUrl?: string;
  categoryId: number;
  commonImages?: ProductImageDTO[];
  variants?: ProductVariantDTO[];
}

export interface ProductVariantDTO {
  id: number;
  color: ColorDTO;
  size: SizeDTO;
  stock: number;
  sku: string;
  imageUrl?: string;
  images?: ProductImageDTO[];
  available: boolean;
}

// Produit tel que reçu du backend (DTO principal)
export interface ProductCardDTO {
  id: number;
  variantId: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  category: string;
}

// Produit simplifié pour d'autres usages éventuels
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  isNew?: boolean;
  isOnSale?: boolean;
  discountPercentage?: number;
}

// Filtre utilisé pour l’API de recherche/filtrage produits
export interface ProductFilter {
  sortBy?: 'price' | 'rating' | 'popularity';
  order?: 'asc' | 'desc';
}

// State pour les produits en vedette (Redux)
export interface FeaturedProductsState {
  items: ProductCardDTO[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// State pour la liste de produits filtrés (Redux)
export interface ProductsState {
  items: ProductCardDTO[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: ProductFilter;
}

export interface ProductImageDTO {
  id: number;
  imageUrl: string;
  isMain: boolean;
  displayOrder?: number;
}

export interface SizeDTO {
    id: number;
    name: string;
    code: string;
}

export interface ColorDTO {
    id: number;
    name: string;
    hexCode: string;
}