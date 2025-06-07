import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Pour garder un style cohérent, on utilise Tailwind et on applique des classes similaires à celles du formulaire actuel

interface StripeCheckoutFormProps {
  cartItems: any[];
  form: any;
  onPaymentSuccess: (paymentIntentId: string) => void;
  handleStripePayment: (cardElement: any) => Promise<{clientSecret: string} | {error: string}>;
} 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#1a202c', // text-gray-900
      fontFamily: 'inherit',
      fontSize: '16px',
      '::placeholder': {
        color: '#a0aec0', // text-gray-400
      },
      padding: '12px 16px',
      backgroundColor: '#fff',
      border: '1px solid #e2e8f0', // border-gray-300
      borderRadius: '0.375rem', // rounded-md
    },
    invalid: {
      color: '#e53e3e', // text-red-600
      iconColor: '#e53e3e',
    },
  },
};

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ cartItems, form, onPaymentSuccess, handleStripePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe n\'est pas chargé.');
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Champ carte introuvable.');
      setProcessing(false);
      return;
    }

    // Appelle le handler parent pour créer la commande et préparer le paiement Stripe
    const result = await handleStripePayment(cardElement);
    if ('error' in result) {
      setError(result.error);
      setProcessing(false);
      return;
    }
    const clientSecret = result.clientSecret;

    // Confirme le paiement Stripe
    const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (stripeError) {
      setError(stripeError.message || 'Erreur lors du paiement.');
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      onPaymentSuccess(paymentIntent.id);
    } else {
      setError('Le paiement n\'a pas pu être confirmé.');
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Carte bancaire</label>
        <div className="rounded-md border border-gray-300 px-3 py-2 bg-white focus-within:border-blue-500">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        disabled={!stripe || processing}
      >
        {processing ? 'Paiement en cours...' : 'Payer'}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
