import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearCart } from '@/store/features/cartSlice';
import Link from 'next/link';
import Layout from '@/components/Layout';
import StickyActionButton from '@/components/StickyActionButton';
import MobileCartDrawer from '@/components/MobileCartDrawer';

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
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
    if (!form.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
    else if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Numéro invalide (16 chiffres)';
    if (!form.cardExpiry) newErrors.cardExpiry = 'Expiration requise';
    else if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) newErrors.cardExpiry = 'Format MM/AA attendu';
    if (!form.cardCvc) newErrors.cardCvc = 'CVC requis';
    else if (!/^\d{3,4}$/.test(form.cardCvc)) newErrors.cardCvc = 'CVC invalide (3 ou 4 chiffres)';
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
              <div className={`rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-base font-bold ${step === 'adresse' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-400'}`}><span>1</span></div>
              <span className={`font-semibold text-[10px] sm:text-xs ${step === 'adresse' ? 'text-sky-700' : 'text-gray-400'}`}>Adresse</span>
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
                  <form onSubmit={handlePaiementNext} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-1">Numéro de carte *</label>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" /><path d="M2 10h20" strokeWidth="2" /></svg>
                        <input
                          name="cardNumber"
                          value={form.cardNumber}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-sky-500 tracking-widest"
                          maxLength={19}
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                        />
                      </div>
                      {errors.cardNumber && <span className="text-xs text-red-500">{errors.cardNumber}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiration *</label>
                        <div className="relative">
                          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3M3 11h18" strokeWidth="2" /></svg>
                          <input
                            name="cardExpiry"
                            value={form.cardExpiry}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-sky-500"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        {errors.cardExpiry && <span className="text-xs text-red-500">{errors.cardExpiry}</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVC *</label>
                        <div className="relative">
                          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 17v.01" strokeWidth="2" /><rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" /></svg>
                          <input
                            name="cardCvc"
                            value={form.cardCvc}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-sky-500"
                            placeholder="CVC"
                            maxLength={4}
                            inputMode="numeric"
                          />
                        </div>
                        {errors.cardCvc && <span className="text-xs text-red-500">{errors.cardCvc}</span>}
                      </div>
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
                </>
              )}
              {step === 'recap' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Récapitulatif de la commande</h1>
                  <p className="text-gray-500 mb-6">Vérifiez les informations avant de confirmer votre commande.</p>
                  <form onSubmit={handleRecapNext} className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="font-semibold mb-2 text-sky-700 flex items-center gap-2"><svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 00-8 0" strokeWidth="2" /></svg>Adresse de livraison</h3>
                      <div className="text-gray-700 text-sm">
                        <div>{form.firstName} {form.lastName}</div>
                        <div>{form.address}</div>
                        <div>{form.postalCode} {form.city}, {form.country}</div>
                        <div>{form.email}</div>
                        {form.phone && <div>{form.phone}</div>}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="font-semibold mb-2 text-sky-700 flex items-center gap-2"><svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" /><path d="M2 10h20" strokeWidth="2" /></svg>Paiement</h3>
                      <div className="text-gray-700 text-sm">
                        <div>Carte se terminant par **** {form.cardNumber.slice(-4)}</div>
                        <div>Expiration : {form.cardExpiry}</div>
                      </div>
                    </div>
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
                    {/* Actions desktop seulement */}
                    <div className="hidden md:flex gap-3 mt-4">
                      <button type="button" onClick={() => setStep('paiement')} className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2">
                        Retour
                      </button>
                      <button type="submit" className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg text-lg shadow transition-colors flex items-center justify-center gap-2">
                        Confirmer la commande
                      </button>
                    </div>
                  </form>
                </>
              )}
              {step === 'confirmation' && (
                <div className="flex flex-col items-center justify-center h-full py-16">
                  <svg className="h-16 w-16 text-emerald-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                  <h2 className="text-2xl font-bold text-emerald-700 mb-2">Merci pour votre commande !</h2>
                  <p className="mb-6 text-gray-700">Un email de confirmation va vous être envoyé.<br/>Votre commande sera expédiée dans les plus brefs délais.</p>
                  <Link href="/shop" className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-700 transition">Retour à la boutique</Link>
                </div>
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
    {/* Sticky action button mobile : label et action selon l’étape */}
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
