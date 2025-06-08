import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripeCheckoutFormProps {
  onPaymentSuccess: (paymentIntentId: string) => void;
  className?: string;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ onPaymentSuccess, className }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe n'est pas chargé.");
      setProcessing(false);
      return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Optionnel : redirection après paiement
        // return_url: window.location.origin + '/success',
      },
      redirect: "if_required"
    });

    if (stripeError) {
      setError(stripeError.message || 'Erreur lors du paiement.');
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSucceeded(true);
      setProcessing(false);
      onPaymentSuccess(paymentIntent.id);
    } else {
      setProcessing(false);
      setError("Le paiement n'a pas abouti. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <PaymentElement options={{ layout: 'tabs' }} />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      <button
        type="submit"
        disabled={processing || !stripe || !elements}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {processing ? 'Paiement en cours...' : 'Payer'}
      </button>
      {succeeded && (
        <div className="text-green-600 mt-2">Paiement réussi !</div>
      )}
    </form>
  );
};

export default StripeCheckoutForm;
