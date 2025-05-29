import React, { useState } from 'react';

interface MobileCartDrawerProps {
  cartItems: any[];
  total: number;
}

const MobileCartDrawer: React.FC<MobileCartDrawerProps> = ({ cartItems, total }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Sticky summary bar */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 shadow-sm md:hidden">
        <span className="font-semibold text-gray-700">Total : <span className="text-sky-700 font-bold">{total.toFixed(2)} €</span></span>
        <button
          onClick={() => setOpen(true)}
          className="text-sky-600 underline font-medium px-3 py-1"
        >
          Voir le panier
        </button>
      </div>
      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} aria-label="Fermer" />
          <div className="ml-auto bg-white w-full max-w-sm h-full shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Votre panier</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 text-2xl leading-none">&times;</button>
            </div>
            {cartItems.length === 0 ? (
              <div className="text-gray-500">Votre panier est vide.</div>
            ) : (
              <ul className="divide-y divide-gray-200 mb-4 overflow-y-auto flex-1">
                {cartItems.map(item => (
                  <li key={item.productId + '-' + item.variantId} className="flex items-center gap-3 py-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium text-xs text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.color} {item.size && <>- {item.size}</>}</div>
                      <div className="text-xs text-gray-500">Qté : {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-xs">{(item.price * item.quantity).toFixed(2)} €</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="text-base font-semibold text-gray-700">Total :</span>
              <span className="text-xl font-bold text-sky-700">{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      )}
      {/* Spacer for sticky bar */}
      <div className="h-14 md:hidden" />
    </>
  );
};

export default MobileCartDrawer;
