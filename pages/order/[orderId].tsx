import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { getOrder } from '@/services/orderService';
import { OrderResponseDTO } from '@/types';

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    phone?: string;
  };
  items: OrderItem[];
}

const OrderRecapPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<OrderResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    getOrder(Number(orderId))
      .then((data) => {
        setOrder(data);
        setError(null);
      })
      .catch(() => {
        setError('Commande introuvable.');
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <Layout title="Commande confirmée - Youegos">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-sky-700 mb-4">Merci pour votre commande !</h1>
        {loading ? (
          <div className="text-sky-600">Chargement du récapitulatif...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : order ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-700">Commande n°</span>
                <span className="font-mono">{order.orderId}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-700">Statut</span>
                <span className="uppercase text-sky-700 font-semibold">{order.status}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-700">Montant total</span>
                <span className="text-lg font-bold">{order.totalAmount.toFixed(2)} €</span>
              </div>
              {/*<div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-700">Date</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div> */}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-2 text-sky-700">Adresse de livraison</h2>
              <div>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
              <div>{order.shippingAddress.address}</div>
              <div>{order.shippingAddress.postalCode} {order.shippingAddress.city}</div>
              <div>{order.shippingAddress.country}</div>
              <div>{order.shippingAddress.email}</div>
              {order.shippingAddress.phone && <div>{order.shippingAddress.phone}</div>}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-2 text-sky-700">Articles commandés</h2>
              <ul className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <li key={item.productId} className="flex items-center py-4 gap-4">
                    {/* <img src={item.productVariantId} alt={item.productName} className="w-16 h-16 object-cover rounded-lg border" /> */}
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{item.productName}</div>
                      <div className="text-gray-500 text-sm">x{item.quantity}</div>
                    </div>
                    <div className="font-mono font-semibold">{(item.unitPrice * item.quantity).toFixed(2)} €</div>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/" className="inline-block mt-8 px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition">Retour à l'accueil</Link>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default OrderRecapPage;
