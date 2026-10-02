import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loadingPayment, setLoadingPayment] = useState(false);

  if (!isCartOpen) return null;

  const handleRazorpayPayment = () => {
    setLoadingPayment(true);

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Fallback if no valid key exists
    if (!razorpayKey || razorpayKey === 'rzp_test_YOUR_KEY_HERE') {
      alert("Using Mock Payment Gateway (No Razorpay Key ID found in .env.local)");
      setTimeout(() => {
        alert("Payment Successful!");
        clearCart();
        setIsCartOpen(false);
        setLoadingPayment(false);
      }, 1000);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: Math.round(subtotal * 100), // Amount in paise
      currency: "INR",
      name: "AuraStore Micro-Shop",
      description: "Digital Menu Checkout",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        clearCart();
        setIsCartOpen(false);
        setLoadingPayment(false);
      },
      modal: {
        ondismiss: function () {
          setLoadingPayment(false);
        },
      },
      prefill: {
        name: "Abhishek Dixit",
        email: "abhishek@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#4F46E5",
      },
    };

    try {
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          alert(`Payment Failed: ${response.error.description}`);
          setLoadingPayment(false);
        });
        rzp.open();
      } else {
        alert("Razorpay SDK not loaded properly.");
        setLoadingPayment(false);
      }
    } catch (err) {
      alert("Error initializing payment modal.");
      setLoadingPayment(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex justify-end overflow-hidden">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full flex flex-col p-6 shadow-2xl relative z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-600" /> Order Summary
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 divide-y divide-gray-100 dark:divide-slate-800">
          {cart.length === 0 ? (
            <div className="text-center py-28 text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="font-semibold text-gray-600 dark:text-gray-300">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Add items from the store menu to get started.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="pt-4 flex items-center justify-between gap-4">
                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-2xl" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">₹{Number(item.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 bg-gray-100 dark:bg-slate-800 rounded-md font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 bg-gray-100 dark:bg-slate-800 rounded-md font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Trigger */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 dark:border-slate-800 pt-4 mt-auto space-y-4">
            <div className="flex justify-between items-center text-lg font-black text-gray-900 dark:text-white">
              <span>Grand Total</span>
              <span className="text-2xl text-indigo-600 dark:text-indigo-400">₹{subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleRazorpayPayment}
              disabled={loadingPayment}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 text-base"
            >
              {loadingPayment ? 'Connecting Gateway...' : 'Pay via Razorpay / Card'}
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 256-Bit Encrypted Payment Security
            </p>
          </div>
        )}
      </div>
    </div>
  );
}