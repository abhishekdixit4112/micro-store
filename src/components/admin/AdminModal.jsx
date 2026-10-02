import React, { useState } from 'react';
import { X, Trash2, PlusCircle, Package } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { supabase } from '../../lib/supabaseClient';

export default function AdminModal({ products }) {
  const { isAdminOpen, setIsAdminOpen } = useAdmin();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAdminOpen) return null;

  async function handleAddProduct(e) {
    e.preventDefault();
    if (!name || !price) return;
    setLoading(true);

    const newProduct = {
      name,
      category: category || 'General',
      price: parseFloat(price),
      image_url: imageUrl || 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600',
      in_stock: true,
    };

    const { data, error } = await supabase.from('products').insert([newProduct]);

    if (error) {
      console.error('Supabase Error:', error);
      alert(`Error adding product to database: ${error.message}`);
    } else {
      setName('');
      setCategory('');
      setPrice('');
      setImageUrl('');
    }
    setLoading(false);
  }

  async function toggleStock(id, currentStatus) {
    const { error } = await supabase.from('products').update({ in_stock: !currentStatus }).eq('id', id);
    if (error) {
      console.error('Error toggling stock:', error);
      alert(`Error updating stock status: ${error.message}`);
    }
  }

  async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error('Error deleting product:', error);
        alert(`Error deleting product: ${error.message}`);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative my-8 text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Admin Live Control Panel
          </h2>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} className="mt-6 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Add New Product
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Category (e.g. Beverages)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-500/20 text-sm flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> {loading ? 'Saving...' : 'Create Product'}
          </button>
        </form>

        {/* Product Table */}
        <div className="mt-6 overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{p.name}</td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">₹{Number(p.price).toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStock(p.id, p.in_stock)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        p.in_stock
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {p.in_stock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}