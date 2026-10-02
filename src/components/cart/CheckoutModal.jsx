import React, { useState } from 'react';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { subtotal, clearCart, setIsCartOpen } = useCart();
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      clearCart();
    }, 2000);
  };

  const finish = () => {
    setCompleted(false);
    onClose();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        {completed ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">Payment Successful</h3>
            <p className="text-sm text-gray-500 mt-2">
              Your mock payment of <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span> was processed successfully.
            </p>
            <button
              onClick={finish}
              className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mock Payment Gateway</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Card Holder</label>
              <input required type="text" defaultValue="Jane Doe" className="w-full border p-2.5 rounded-xl text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Card Number</label>
              <input required type="text" defaultValue="4242 •••• •••• 4242" className="w-full border p-2.5 rounded-xl text-sm" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Expiry</label>
                <input required type="text" defaultValue="12/28" className="w-full border p-2.5 rounded-xl text-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">CVC</label>
                <input required type="text" defaultValue="123" className="w-full border p-2.5 rounded-xl text-sm" />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full mt-4 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                `Pay $${subtotal.toFixed(2)}`
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}