import React from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Trash2 } from 'lucide-react';

export default function ProductTable({ products }) {
  const toggleStock = async (id, currentStatus) => {
    await supabase.from('products').update({ in_stock: !currentStatus }).eq('id', id);
  };

  const deleteProduct = async (id) => {
    if (confirm('Delete this product permanently?')) {
      await supabase.from('products').delete().eq('id', id);
    }
  };

  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-3 font-medium text-gray-900">{p.name}</td>
              <td className="p-3">${Number(p.price).toFixed(2)}</td>
              <td className="p-3">
                <button
                  onClick={() => toggleStock(p.id, p.in_stock)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    p.in_stock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {p.in_stock ? 'In Stock' : 'Out of Stock'}
                </button>
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}