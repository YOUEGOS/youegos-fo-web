import api from '@/lib/api';
import { ProductDTO } from '@/types';

export async function fetchProductWithVariant(productId: number, variantId: number): Promise<ProductDTO> {
  const response = await api.get<ProductDTO>(`/products/${productId}/with-variant`, {
    params: { variantId },
  });
  return response.data;
}
