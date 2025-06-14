import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { clearCart } from '@/store/features/cartSlice';
import Link from 'next/link';
import Layout from '@/components/Layout';
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
      <div className="min-h-screen bg-background py-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4 sm:px-6 lg:px-8">
          {/* Récapitulatif mobile */}
          <div className="md:hidden mb-6">
            <div className="
              p-4
              bg-background-light/5
              border border-accent-light/10
              backdrop-blur-sm
              rounded-lg
            ">
              <h2 className="
                font-display text-lg mb-4
                bg-gradient-to-r from-accent-light to-accent-dark
                bg-clip-text text-transparent
              ">Récapitulatif de commande</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="
                        w-12 h-12
                        rounded-sm
                        overflow-hidden
                        border border-accent-light/20
                      ">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-text-primary text-sm">{item.name}</p>
                        <p className="text-text-secondary text-xs">Qté: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-text-primary">{(item.price * item.quantity).toFixed(2)} €</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-accent-light/10 space-y-2">
                <div className="flex justify-between text-text-secondary">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>TVA (20%)</span>
                  <span>{(total * 0.2).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-lg font-display">
                  <span className="text-text-primary">Total</span>
                  <span className="bg-gradient-to-r from-accent-light to-accent-dark bg-clip-text text-transparent">
                    {(total * 1.2).toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Colonne gauche : adresse puis paiement */}
          <div className="
            flex-1 p-6
            bg-background-light/5
            border border-accent-light/10
            backdrop-blur-sm
            rounded-lg
          ">
            <h1 className="
              font-display text-2xl mb-2
              bg-gradient-to-r from-accent-light to-accent-dark
              bg-clip-text text-transparent
            ">Adresse de livraison</h1>
            <p className="text-text-secondary mb-6">Veuillez renseigner vos coordonnées pour la livraison.</p>
            {!adresseValidee ? (
              <form className="space-y-5" onSubmit={handleAdresseNext}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-primary mb-1">Prénom *</label>
                    <input 
                      name="firstName" 
                      value={form.firstName} 
                      onChange={handleChange} 
                      className="
                        w-full px-3 py-2
                        bg-background-light/5
                        border border-accent-light/20
                        hover:border-accent-light/40
                        focus:border-accent-light/60
                        rounded-md
                        text-text-primary
                        placeholder-text-secondary/50
                        transition duration-300
                        focus:outline-none focus:ring-1 focus:ring-accent-light/20
                      "
                    />
                    {errors.firstName && <span className="text-xs text-accent-light">{errors.firstName}</span>}
                  </div>
                  <div>
                    <label className="block text-sm text-text-primary mb-1">Nom *</label>
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
                    <label className="block text-sm text-text-primary mb-1">Ville *</label>
                    <input name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.city && <span className="text-xs text-red-500">{errors.city}</span>}
                  </div>
                  <div>
                    <label className="block text-sm text-text-primary mb-1">Code postal *</label>
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.postalCode && <span className="text-xs text-red-500">{errors.postalCode}</span>}
                  </div>
                  <div>
                    <label className="block text-sm text-text-primary mb-1">Pays *</label>
                    <input name="country" value={form.country} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                    {errors.country && <span className="text-xs text-red-500">{errors.country}</span>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500" />
                </div>
                <button 
                  type="submit" 
                  className="
                    mt-6
                    w-full md:w-auto
                    px-8 py-3
                    bg-background-light/5
                    hover:bg-background-light/10
                    border border-accent-light/20
                    hover:border-accent-light/40
                    rounded-md
                    font-display
                    text-text-primary hover:text-accent-light
                    transition duration-300
                    group
                    relative
                    overflow-hidden
                  "
                >Valider l'adresse</button>
              </form>
            ) : (
              <div className="
                space-y-2 p-4
                bg-background-light/5
                border border-accent-light/20
                rounded-md
              ">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-display text-accent-light">Adresse de livraison</span>
                  <button 
                    type="button" 
                    className="
                      text-sm
                      text-accent hover:text-accent-light
                      transition duration-300
                    " 
                    onClick={() => setAdresseValidee(false)}
                  >
                    Modifier
                  </button>
                </div>
                <div className="text-text-primary">
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
                <h2 className="text-xl font-display text-text-primary mb-2">Paiement</h2>
                <p className="text-text-secondary mb-6">Renseignez vos informations bancaires pour finaliser la commande.</p>
                <div className="mt-6">
                  {clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <StripeCheckoutForm
                        onPaymentSuccess={(paymentIntentId) => {
                          if (orderId) {
                            dispatch(clearCart());
                            router.push(`/order/${orderId}`);
                          }
                        }}
                        className="
                          space-y-4
                          [&_.StripeElement]:!bg-background-light/5
                          [&_.StripeElement]:!border-accent-light/20
                          [&_.StripeElement]:!rounded-md
                          [&_.StripeElement]:!px-3
                          [&_.StripeElement]:!py-2
                          [&_.StripeElement--focus]:!border-accent-light/60
                          [&_.StripeElement--focus]:!ring-1
                          [&_.StripeElement--focus]:!ring-accent-light/20
                        "
                      />
                    </Elements>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const result = await handleStripePayment();
                          if ('error' in result) {
                            throw new Error(result.error);
                          }
                        } catch (error) {
                          console.error('Erreur lors de l\'initialisation du paiement:', error);
                        }
                      }}
                      className="
                        w-full px-8 py-3
                        bg-background-light/5
                        hover:bg-background-light/10
                        border border-accent-light/20
                        hover:border-accent-light/40
                        rounded-md
                        font-display
                        text-text-primary hover:text-accent-light
                        transition duration-300
                      "
                    >
                      Procéder au paiement
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          {/* Colonne droite : récapitulatif */}
          <div className="hidden md:block w-full md:w-96 lg:w-[480px] space-y-6 sticky top-6 h-fit">
            <div className="
              p-6
              bg-background-light/5
              border border-accent-light/10
              backdrop-blur-sm
              rounded-lg
            ">
              <h2 className="
                font-display text-xl mb-6
                bg-gradient-to-r from-accent-light to-accent-dark
                bg-clip-text text-transparent
              ">Récapitulatif de commande</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.productId}-${item.variantId}`} 
                    className="
                      flex items-start gap-4
                      py-3
                      border-b border-accent-light/10
                      group
                    "
                  >
                    <div className="
                      relative
                      w-16 h-16
                      rounded-sm
                      overflow-hidden
                      border border-accent-light/20
                      group-hover:border-accent-light/40
                      transition duration-300
                    ">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="
                          w-full h-full
                          object-cover
                          group-hover:scale-110
                          transition duration-500
                        "
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="
                        font-display
                        bg-gradient-to-r from-accent-light to-accent-dark
                        bg-clip-text text-transparent
                        group-hover:from-accent-dark group-hover:to-accent-light
                        transition duration-300
                      ">{item.name}</h4>
                      <p className="text-text-secondary text-sm mt-1">Quantité: {item.quantity}</p>
                    </div>
                    <p className="text-text-primary text-right">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-accent-light/10 space-y-3">
                <div className="flex justify-between text-text-secondary">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>TVA (20%)</span>
                  <span>{(total * 0.2).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-lg text-text-primary">Total</span>
                  <span className="
                    font-display text-xl
                    bg-gradient-to-r from-accent-light to-accent-dark
                    bg-clip-text text-transparent
                  ">
                    {(total * 1.2).toFixed(2)} €
                  </span>
                </div>
              </div>

              {adresseValidee && (
                <div className="mt-6">
                  <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                      onPaymentSuccess={async (paymentIntentId) => { 
                        
                      }}
                      className="
                        space-y-4
                        [&_.StripeElement]:!bg-background-light/5
                        [&_.StripeElement]:!border-accent-light/20
                        [&_.StripeElement]:!rounded-md
                        [&_.StripeElement]:!px-3
                        [&_.StripeElement]:!py-2
                        [&_.StripeElement--focus]:!border-accent-light/60
                        [&_.StripeElement--focus]:!ring-1
                        [&_.StripeElement--focus]:!ring-accent-light/20
                      "
                    />
                  </Elements>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
