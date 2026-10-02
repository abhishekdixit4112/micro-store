import React from 'react';
import { Plus, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductGrid({ products, loading }) {
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-gray-200/60 dark:bg-slate-800/60 rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white/80 dark:bg-slate-800/80 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700 my-8 shadow-xs">
        <div className="w-16 h-16 bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">No products found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Try clearing your search bar or selecting another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 p-4 rounded-3xl shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
        >
          {/* Image Header */}
          <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-700">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200 shadow-xs">
              {product.category}
            </span>
            {!product.in_stock && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                <span className="bg-red-500 text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="pt-4 px-2 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9 (120+ reviews)
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-snug">
                {product.name}
              </h3>
            </div>

            <div className="mt-6 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700/60">
              <div>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium block">Price</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">
                  ₹{Number(product.price).toFixed(2)}
                </span>
              </div>

              <button
                disabled={!product.in_stock}
                onClick={() => addToCart(product)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold text-sm transition-all shadow-md shadow-indigo-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" /> Add to Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}