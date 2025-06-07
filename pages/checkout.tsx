import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { clearCart } from '@/store/features/cartSlice';
import Link from 'next/link';
import Layout from '@/components/Layout';
import StickyActionButton from '@/components/StickyActionButton';
import MobileCartDrawer from '@/components/MobileCartDrawer';

import { createOrder } from '@/services/orderService';
import { OrderRequestDTO, OrderResponseDTO } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout: React.FC = () => {
  const router = useRouter();
  const [adresseValidee, setAdresseValidee] = useState(false);
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    paymentMethod: 'card', // 'card' ou 'paypal'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    paypalEmail: '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // Ajouts pour Stripe/commande
  const [orderId, setOrderId] = useState<number | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handler Stripe appelé par StripeCheckoutForm
  const handleStripePayment = async (): Promise<{clientSecret: string} | {error: string}> => {
    try {
      let currentOrderId = orderId;
      // Crée la commande si pas déjà créée
      if (!currentOrderId) {
        console.log('Création de la commande...', form);
        console.log('Panier...', cartItems);
        const orderRequest: OrderRequestDTO = {
          shippingAddress: {
            firstName: form.firstName,
            lastName: form.lastName,
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
            phone: form.phone,
            email: form.email,
          },
          items: cartItems.map(item => ({
            productId: item.productId,
            productVariantId: item.variantId,
            productName: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.price * item.quantity,
          })),
          currency: 'EUR',
          paymentType: 'STRIPE'
        };
        const orderResponse: OrderResponseDTO = await createOrder(orderRequest);
        setOrderId(orderResponse.orderId);
        currentOrderId = orderResponse.orderId;
        setClientSecret(orderResponse.clientSecret);
        return { clientSecret: orderResponse.clientSecret };
      } else {
        // Si la commande existe déjà, on suppose que le clientSecret est déjà connu (par exemple, stocké dans le state)
        if (clientSecret) {
          return { clientSecret };
        } else {
          return { error: 'clientSecret introuvable.' };
        }
      }
    } catch (err: any) {
      return { error: err?.message || 'Erreur lors du paiement.' };
    }
  };

  // Validation pure pour le rendu (ne modifie pas le state)
  const isAdresseValid = () => {
    return (
      !!form.firstName &&
      !!form.lastName &&
      !!form.email &&
      !!form.address &&
      !!form.city &&
      !!form.postalCode &&
      !!form.country
    );
  };

  const validateAdresse = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.firstName) newErrors.firstName = 'Prénom requis';
    if (!form.lastName) newErrors.lastName = 'Nom requis';
    if (!form.email) newErrors.email = 'Email requis';
    if (!form.address) newErrors.address = 'Adresse requise';
    if (!form.city) newErrors.city = 'Ville requise';
    if (!form.postalCode) newErrors.postalCode = 'Code postal requis';
    if (!form.country) newErrors.country = 'Pays requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdresseNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAdresse()) return;
    setErrors({});
    setAdresseValidee(true);
    handleStripePayment();
  };

  return (
    <Layout title="Finaliser la commande - Youegos">
      <div className="bg-gray-50 min-h-screen py-8">
        {/* Mobile : panier sticky drawer en haut, bouton action sticky en bas, layout full width */}
        <MobileCartDrawer cartItems={cartItems} total={total} />
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-6">
          {/* Colonne gauche : adresse puis paiement */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Adresse de livraison</h1>
            <p className="text-gray-500 mb-6">Veuillez renseigner vos coordonnées pour la livraison.</p>
            {!adresseValidee ? (
              <form className="space-y-5" onSubmit={handleAdresseNext}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Prénom *</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom *</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Adresse *</label>
                  <input name="address" value={form.address} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                  {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ville *</label>
                    <input name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.city && <span className="text-xs text-red-500">{errors.city}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Code postal *</label>
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.postalCode && <span className="text-xs text-red-500">{errors.postalCode}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pays *</label>
                    <input name="country" value={form.country} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.country && <span className="text-xs text-red-500">{errors.country}</span>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                </div>
                <button type="submit" className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg shadow">Valider l'adresse</button>
              </form>
            ) : (
              <div className="space-y-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sky-700">Adresse de livraison</span>
                  <button type="button" className="text-sky-600 underline text-sm" onClick={() => setAdresseValidee(false)}>
                    Modifier
                  </button>
                </div>
                <div className="text-gray-800">
                  <div>{form.firstName} {form.lastName}</div>
                  <div>{form.address}</div>
                  <div>{form.postalCode} {form.city}</div>
                  <div>{form.country}</div>
                  <div>{form.email}</div>
                  {form.phone && <div>{form.phone}</div>}
                </div>
              </div>
            )}
            {adresseValidee && (
              <>
                <div className="my-8 border-t border-gray-100" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Paiement</h2>
                <p className="text-gray-500 mb-6">Renseignez vos informations bancaires pour finaliser la commande.</p>
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeCheckoutForm
                      onPaymentSuccess={() => {
                        if (orderId) {
                          dispatch(clearCart());
                          router.push(`/order/${orderId}`);
                        }
                      }}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-8 text-sky-700">Préparation du paiement en cours...</div>
                )}
              </>
            )}
          </div>
          {/* Colonne droite : résumé panier */}
          <div className="w-full md:w-96 bg-white rounded-2xl shadow-xl p-6 h-fit md:sticky md:top-8">
            <h3 className="font-semibold mb-2 text-sky-700 flex items-center gap-2">
              <svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 8h18M3 13h18M3 18h18" /></svg>
              Récapitulatif
            </h3>
            <ul className="divide-y divide-gray-200 mb-2">
              {cartItems.map(item => (
                <li key={item.productId + '-' + item.variantId} className="flex items-center gap-3 py-2">
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium text-xs text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.color} {item.size && <>- {item.size}</>}</div>
                    <div className="text-xs text-gray-500">Qté : {item.quantity}</div>
                  </div>
                  <div className="font-semibold text-xs">{(item.price * item.quantity).toFixed(2)} €</div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-semibold text-gray-700">Total :</span>
              <span className="text-lg font-bold text-sky-700">{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Checkout;
