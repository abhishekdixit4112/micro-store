import React from 'react';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="group relative bg-white dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-indigo-700 dark:text-indigo-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 shadow-xs">
          {product.category || 'General'}
        </span>

        {/* Stock Badge */}
        {!product.in_stock && (
          <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
            Out of Stock
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 block">
              Price
            </span>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              ₹{Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.in_stock}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all duration-300 shadow-md ${
              isInCart
                ? 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600'
                : product.in_stock
                ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" /> Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" /> Add to Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}