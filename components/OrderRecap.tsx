import React from 'react';
import { OrderResponseDTO } from '@/types';

interface OrderRecapProps {
  order: OrderResponseDTO | null;
  isLoading: boolean;
  stripeError: string | null;
  onValidate: () => void;
}

const OrderRecap: React.FC<OrderRecapProps> = ({ order, isLoading, stripeError, onValidate }) => {
  if (!order) return null;
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h3 className="text-xl font-bold mb-4">Récapitulatif de votre commande</h3>
      <div className="mb-2">Numéro de commande : <span className="font-semibold text-blue-700">{order.orderId}</span></div>
      <div className="mb-2">Montant total : <span className="font-semibold">{order.totalAmount} {order.currency}</span></div>
      <div className="mb-4">Adresse de livraison : <span className="font-semibold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}, {order.shippingAddress?.address}, {order.shippingAddress?.city}</span></div>
      <div className="mb-4">
        <h4 className="font-semibold mb-1">Articles :</h4>
        <ul className="list-disc ml-6">
          {order.items.map(item => (
            <li key={item.productId + '-' + item.productVariantId}>
              {item.productName} x{item.quantity} — {item.unitPrice}€
            </li>
          ))}
        </ul>
      </div>
      {stripeError && <div className="text-red-600 mb-2">{stripeError}</div>}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        onClick={onValidate}
        disabled={isLoading}
      >
        {isLoading ? 'Paiement en cours...' : 'Payer et confirmer ma commande'}
      </button>
    </div>
  );
};

export default OrderRecap;
