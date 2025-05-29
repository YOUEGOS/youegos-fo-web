import React, { useState } from 'react';

interface MobileCartAccordionProps {
  cartItems: any[];
  total: number;
}

const MobileCartAccordion: React.FC<MobileCartAccordionProps> = ({ cartItems, total }) => {
  const [open, setOpen] = useState(false);
  if (typeof window !== 'undefined' && window.innerWidth >= 768) return null; // Only show on mobile
  return (
    <div className="md:hidden bg-gray-50 border-t border-gray-100 px-2 py-2 mb-4 rounded-b-2xl shadow-inner">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 px-2 text-base font-semibold text-gray-700 focus:outline-none"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="mobile-cart-details"
      >
        <span>Panier</span>
        <span className="flex items-center gap-2">
          <span className="font-bold text-sky-700">{total.toFixed(2)} €</span>
          <svg className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      {open && (
        <ul id="mobile-cart-details" className="divide-y divide-gray-200 mt-2">
          {cartItems.length === 0 ? (
            <li className="text-gray-500 py-2">Votre panier est vide.</li>
          ) : (
            cartItems.map(item => (
              <li key={item.productId + '-' + item.variantId} className="flex items-center gap-3 py-2">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium text-xs text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.color} {item.size && <>- {item.size}</>}</div>
                  <div className="text-xs text-gray-500">Qté : {item.quantity}</div>
                </div>
                <div className="font-semibold text-xs">{(item.price * item.quantity).toFixed(2)} €</div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default MobileCartAccordion;
