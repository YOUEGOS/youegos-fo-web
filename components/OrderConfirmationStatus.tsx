import React from 'react';
import { getOrder } from '@/services/orderService';

interface Props {
  orderId: number | null;
}

const OrderConfirmationStatus: React.FC<Props> = ({ orderId }) => {
  const [status, setStatus] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!orderId) return;
    let interval: NodeJS.Timeout | null = null;
    let cancelled = false;
    const poll = async () => {
      try {
        setLoading(true);
        const order = await getOrder(orderId);
        if (!cancelled) {
          setStatus(order.status);
          if (order.status === 'PAYEE' && interval) {
            clearInterval(interval);
          }
        }
      } catch (e) {
        if (!cancelled) setError('Erreur lors de la vérification du statut.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    poll();
    interval = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [orderId]);

  if (!orderId) return null;
  if (error) return <div className="text-red-600">{error}</div>;
  if (loading) return <div className="text-gray-500">Vérification du paiement en cours...</div>;
  if (status !== 'PAYEE') return <div className="text-gray-500">Votre paiement est en cours de confirmation...</div>;
  return <div className="text-emerald-700 font-semibold">Votre paiement a bien été confirmé !</div>;
};

export default OrderConfirmationStatus;
