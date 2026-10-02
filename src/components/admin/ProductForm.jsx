import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProductForm({ onComplete }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Coffee');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from('products').insert([
      {
        name,
        category,
        price: parseFloat(price),
        image_url: imageUrl || 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500',
        in_stock: true,
      },
    ]);

    setSaving(false);
    if (!error) {
      setName('');
      setPrice('');
      setImageUrl('');
      onComplete();
    } else {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-xl space-y-3 mb-6 border border-gray-200">
      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Add New Product</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required
          type="text"
          placeholder="Product Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-lg text-sm bg-white"
        />
        <input
          required
          type="text"
          placeholder="Category (e.g. Coffee, Food)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg text-sm bg-white"
        />
        <input
          required
          type="number"
          step="0.01"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded-lg text-sm bg-white"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-2 border rounded-lg text-sm bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
      >
        {saving ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}