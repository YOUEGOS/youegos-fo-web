import api from '@/lib/api';
import { OrderRequestDTO, OrderResponseDTO, PaymentIntentResponseDTO } from '@/types';

/**
 * Crée une commande sur le backend
 */
export async function createOrder(order: OrderRequestDTO): Promise<OrderResponseDTO> {
  const { data } = await api.post<OrderResponseDTO>('/orders', order);
  return data;
}

/**
 * Demande au backend la création d'un PaymentIntent Stripe pour une commande donnée
 */
export async function preparePaymentIntent(orderId: number): Promise<PaymentIntentResponseDTO> {
  const { data } = await api.post<PaymentIntentResponseDTO>(`/orders/${orderId}/prepare-payment`);
  return data;
}

/**
 * Récupère une commande par son id (utile pour vérifier le statut après paiement)
 */
export async function getOrder(orderId: number): Promise<OrderResponseDTO> {
  const { data } = await api.get<OrderResponseDTO>(`/orders/${orderId}`);
  return data;
}
