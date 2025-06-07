import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearCart } from '@/store/features/cartSlice';
import Link from 'next/link';
import Layout from '@/components/Layout';
import StickyActionButton from '@/components/StickyActionButton';
import MobileCartDrawer from '@/components/MobileCartDrawer';

import { createOrder, preparePaymentIntent, getOrder } from '@/services/orderService';
import { OrderRequestDTO, OrderResponseDTO, PaymentIntentResponseDTO } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<'adresse' | 'paiement' | 'recap' | 'confirmation'>('adresse');
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
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handler Stripe appelé par StripeCheckoutForm
  const handleStripePayment = async (cardElement: any): Promise<{clientSecret: string} | {error: string}> => {
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

  const isPaiementValid = () => {
    if (form.paymentMethod === 'paypal') {
      return !!form.paypalEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.paypalEmail);
    }
    return (
      !!form.cardNumber &&
      /^\d{16}$/.test(form.cardNumber.replace(/\s/g, '')) &&
      !!form.cardExpiry &&
      /^\d{2}\/\d{2}$/.test(form.cardExpiry) &&
      !!form.cardCvc &&
      /^\d{3,4}$/.test(form.cardCvc)
    );
  };

  // Validation par étape (conserve le setErrors pour la navigation)

  // État pour gérer le chargement et l’erreur lors de la soumission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fonction pour préparer et envoyer la commande à l’API
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Prépare le payload à envoyer
      const payload = {
        cart: cartItems,
        form,
        total,
      };
      // Appel API (à adapter selon ton backend)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Erreur lors du paiement.');
      const data = await response.json();
      // Ici, selon la réponse, tu peux rediriger, afficher une confirmation, etc.
      setStep('confirmation');
      dispatch(clearCart());
    } catch (err: any) {
      setSubmitError(err.message || 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
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

  const validatePaiement = () => {
    const newErrors: { [k: string]: string } = {};
    if (form.paymentMethod === 'card') {
      if (!form.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
      else if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Numéro invalide (16 chiffres)';
      if (!form.cardExpiry) newErrors.cardExpiry = 'Expiration requise';
      else if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) newErrors.cardExpiry = 'Format MM/AA attendu';
      if (!form.cardCvc) newErrors.cardCvc = 'CVC requis';
      else if (!/^\d{3,4}$/.test(form.cardCvc)) newErrors.cardCvc = 'CVC invalide (3 ou 4 chiffres)';
    } else if (form.paymentMethod === 'paypal') {
      if (!form.paypalEmail) newErrors.paypalEmail = 'Email PayPal requis';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.paypalEmail)) newErrors.paypalEmail = 'Email PayPal invalide';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gestion des étapes
  const handleAdresseNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAdresse()) return;
    setErrors({});
    setStep('paiement');
  };

  const handlePaiementNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePaiement()) return;
    setErrors({});
    setStep('recap');
  };

  const handleRecapNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    dispatch(clearCart());
  };

  if (cartItems.length === 0 && step === 'adresse') {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Votre panier est vide</h1>
        <Link href="/shop" className="text-sky-600 hover:underline">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <Layout title="Finaliser la commande - Youegos">
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
          {/* Barre de progression 4 étapes : compacte et scrollable sur mobile, fine */}
          <div className="mb-4 overflow-x-auto scrollbar-thin">
            <div className="flex items-center gap-1 min-w-[340px] sm:min-w-0 h-8">
              {/* Pastille étape 1 : Adresse */}
              <div className={
                'rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-base font-bold ' +
                (
                  step === 'adresse'
                    ? (isAdresseValid() ? 'bg-emerald-600 text-white' : 'bg-sky-600 text-white')
                    : (isAdresseValid() ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400')
                )
              }><span>1</span></div>
              {/* Label étape 1 : Adresse */}
              <span className={
                'font-semibold text-[10px] sm:text-xs ' +
                (
                  step === 'adresse'
                    ? (isAdresseValid() ? 'text-emerald-700' : 'text-sky-700')
                    : (isAdresseValid() ? 'text-emerald-700' : 'text-gray-400')
                )
              }>Adresse</span>
              <span className="w-5 sm:w-7 h-1 bg-sky-200 rounded mx-0.5 sm:mx-1" />
              <div className={`rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-base font-bold ${step === 'paiement' ? 'bg-sky-600 text-white' : step === 'recap' || step === 'confirmation' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}><span>2</span></div>
              <span className={`font-semibold text-[10px] sm:text-xs ${step === 'paiement' ? 'text-sky-700' : step === 'recap' || step === 'confirmation' ? 'text-emerald-700' : 'text-gray-400'}`}>Paiement</span>
              <span className="w-5 sm:w-7 h-1 bg-sky-200 rounded mx-0.5 sm:mx-1" />
              <div className={`rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-base font-bold ${step === 'recap' ? 'bg-sky-600 text-white' : step === 'confirmation' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}><span>3</span></div>
              <span className={`font-semibold text-[10px] sm:text-xs ${step === 'recap' ? 'text-sky-700' : step === 'confirmation' ? 'text-emerald-700' : 'text-gray-400'}`}>Récap</span>
              <span className="w-5 sm:w-7 h-1 bg-sky-200 rounded mx-0.5 sm:mx-1" />
              <div className={`rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-base font-bold ${step === 'confirmation' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}><span>4</span></div>
              <span className={`font-semibold text-[10px] sm:text-xs ${step === 'confirmation' ? 'text-emerald-700' : 'text-gray-400'}`}>OK</span>
            </div>
          </div>
          {/* Mobile : panier sticky drawer en haut, bouton action sticky en bas, layout full width */}
          <MobileCartDrawer cartItems={cartItems} total={total} />
          <div className="w-full max-w-md mx-auto md:max-w-none md:bg-white md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col md:grid md:grid-cols-2">
            {/* Formulaire à gauche (ou en haut sur mobile) */}
            <div className="flex-1 p-2 sm:p-4 md:p-8">
              {step === 'adresse' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Adresse de livraison</h1>
                  <p className="text-gray-500 mb-6">Veuillez renseigner vos coordonnées pour la livraison.</p>
                  <form onSubmit={handleAdresseNext} className="space-y-5">
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
                    <button type="submit" className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2">
                      Continuer
                    </button>
                  </form>
                </>
              )}
              {step === 'paiement' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Paiement</h1>
                  <p className="text-gray-500 mb-6">Renseignez vos informations bancaires pour finaliser la commande.</p>
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      className={`flex-1 flex flex-col items-center justify-center border rounded-lg px-2 py-2 transition focus:outline-none ${form.paymentMethod === 'card' ? 'border-sky-600 bg-sky-50' : 'border-gray-200 bg-white'}`}
                      onClick={() => setForm(f => ({ ...f, paymentMethod: 'card' }))}
                    >
                      <svg className="h-7 w-7 mb-1 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="7" width="20" height="10" rx="2" fill="#fff" stroke="#0369a1" strokeWidth="2"/><rect x="4" y="9" width="16" height="2" fill="#bae6fd"/></svg>
                      <span className="text-xs font-semibold">Carte bancaire</span>
                    </button>
                    <button
                      type="button"
                      className={`flex-1 flex flex-col items-center justify-center border rounded-lg px-2 py-2 transition focus:outline-none ${form.paymentMethod === 'paypal' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}
                      onClick={() => setForm(f => ({ ...f, paymentMethod: 'paypal' }))}
                    >
                      <svg className="h-7 w-7 mb-1" viewBox="0 0 32 32"><g><rect width="32" height="32" rx="8" fill="#fff"/><path d="M21.7 8.5c-1.1 0-2.1.8-2.3 1.9l-.2 1.2h-3.8c-.5 0-.9.4-1 1l-2.1 12.3c-.1.4.2.8.6.8h3.1l.3-1.5h2.4c2.9 0 5.2-1.6 5.9-5 .3-1.5.1-2.6-.7-3.4-.6-.6-1.5-.9-2.4-.9h-1.4l.1-.7c.1-.5.5-.8 1-.8h1.6c.4 0 .7-.2.8-.6l.2-1.1c.1-.5-.2-.9-.7-.9h-1.9zm-2.7 8.2c.1-.7.7-1.2 1.4-1.2h1.2c.6 0 1 .2 1.2.4.3.3.4.8.3 1.5-.4 2.2-2.1 3-4.1 3h-1.6l.6-3.7h1zm-7.1 4.8l2.1-12.3c.1-.5.5-.8 1-.8h6.1c.2-1.1 1.2-1.9 2.3-1.9h1.9c1.1 0 1.8.8 1.5 1.9l-.2 1.1c-.1.4-.5.6-.8.6h-1.6c-.5 0-.9.3-1 .8l-.1.7h1.4c.9 0 1.8.3 2.4.9.8.8 1 1.9.7 3.4-.7 3.4-3 5-5.9 5h-2.4l-.3 1.5c-.1.4-.5.8-.9.8h-3.1c-.5 0-.9-.4-.8-.8z" fill="#ffc439"/></g></svg>
                      <span className="text-xs font-semibold">PayPal</span>
                    </button>
                  </div>
                  {form.paymentMethod === 'card' ? (
                    <Elements stripe={stripePromise}>
                      <StripeCheckoutForm
                        cartItems={cartItems}
                        form={form}
                        onPaymentSuccess={() => setStep('confirmation')}
                        handleStripePayment={handleStripePayment}
                      />
                    </Elements>
                  ) : (
                    <form onSubmit={handlePaiementNext} autoComplete="off" className="space-y-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="paypalEmail">Adresse email PayPal</label>
                        <input
                          type="email"
                          name="paypalEmail"
                          id="paypalEmail"
                          className={`w-full border rounded-lg px-3 py-2 text-lg ${errors.paypalEmail ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                          value={form.paypalEmail}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          autoComplete="email"
                        />
                        {errors.paypalEmail && <div className="text-xs text-red-600 mt-1">{errors.paypalEmail}</div>}
                        <div className="text-xs text-gray-500 mt-2">Vous serez redirigé(e) vers PayPal à l'étape suivante.</div>
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setStep('adresse')} className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2">
                          Retour
                        </button>
                        <button type="submit" className="w-1/2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2">
                          Continuer
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
              {step === 'recap' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Récapitulatif de la commande</h1>
                  <p className="text-gray-500 mb-6">Vérifiez les informations avant de confirmer votre commande.</p>
                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="font-semibold mb-2 text-sky-700 flex items-center gap-2"><svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 00-8 0" strokeWidth="2" /></svg>Adresse de livraison</h3>
                      <div className="text-gray-800">
                        <div>{form.firstName} {form.lastName}</div>
                        <div>{form.address}</div>
                        <div>{form.postalCode} {form.city}</div>
                        <div>{form.country}</div>
                        <div>{form.email}</div>
                        {form.phone && <div>{form.phone}</div>}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="font-semibold mb-2 text-sky-700 flex items-center gap-2"><svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3" strokeWidth="2" /></svg>Paiement</h3>
                      <div className="text-gray-800">
                        {form.paymentMethod === 'card' ? (
                          <>
                            <div>Carte bancaire</div>
                            <div className="tracking-widest font-mono text-gray-600">
                              **** **** **** {form.cardNumber.slice(-4)}
                            </div>
                          </>
                        ) : (
                          <>
                            <div>PayPal</div>
                            <div className="text-gray-600">{form.paypalEmail}</div>
                          </>
                        )}
                      </div>
                    </div>
            {submitError && (
              <div className="text-red-600 text-sm my-2">{submitError}</div>
            )}
            {step !== 'recap' && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <h3 className="font-semibold mb-2 text-sky-700 flex items-center gap-2"><svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 8h18M3 13h18M3 18h18" /></svg>Votre panier</h3>
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
                    )}
                    <div className="hidden md:flex gap-3 mt-4">
                      <button type="button" onClick={() => setStep('paiement')} className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2">
                        Retour
                      </button>
                      <button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Paiement en cours...' : 'Confirmer la commande'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
            {/* Panier mobile : accordéon rétractable, sticky bouton */}
            {typeof window !== 'undefined' && window.innerWidth < 768 && (
              <MobileCartDrawer cartItems={cartItems} total={total} />
            )}
            {/* Panier desktop : colonne sticky */}
            
              <div className="hidden md:flex bg-gray-50 border-l border-gray-100 p-8 md:min-h-[500px] flex-col sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 8h18M3 13h18M3 18h18" /></svg>Votre panier</h2>
                {cartItems.length === 0 ? (
                  <div className="text-gray-500">Votre panier est vide.</div>
                ) : (
                  <ul className="divide-y divide-gray-200 mb-4">
                    {cartItems.map(item => (
                      <li key={item.productId + '-' + item.variantId} className="flex items-center gap-3 py-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.color} {item.size && <>- {item.size}</>}</div>
                        <div className="text-xs text-gray-500">Qté : {item.quantity}</div>
                      </div>
                      <div className="font-semibold text-sm">{(item.price * item.quantity).toFixed(2)} €</div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700">Total :</span>
                <span className="text-xl font-bold text-sky-700">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* Sticky action button mobile : label et action selon l’étape */}
    {typeof window !== 'undefined' && window.innerWidth < 768 && step !== 'confirmation' && (
      <StickyActionButton
        label={
          step === 'adresse' ? 'Continuer vers le paiement' :
          step === 'paiement' ? 'Continuer vers le récapitulatif' :
          step === 'recap' ? 'Confirmer la commande' : ''
        }
        onClick={() => {
         // if (step === 'adresse') handleAdresseSubmit();
         // else if (step === 'paiement') handlePaiementSubmit();
         // else if (step === 'recap') handleRecapSubmit();
        }}
        disabled={step === 'adresse' ? !isAdresseValid() : step === 'paiement' ? !isPaiementValid() : false}
      />
    )}
  </Layout>
  );
};

export default CheckoutPage;
