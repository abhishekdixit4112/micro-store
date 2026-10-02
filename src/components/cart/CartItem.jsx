import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
          <p className="text-xs text-gray-500">${Number(item.price).toFixed(2)} each</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="p-1 text-gray-600 hover:bg-white rounded transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="p-1 text-gray-600 hover:bg-white rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}