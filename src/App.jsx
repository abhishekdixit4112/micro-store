import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import AdminModal from './components/admin/AdminModal';

import SearchSortBar from './components/catalog/SearchSortBar';
import CategoryFilter from './components/catalog/CategoryFilter';
import ProductGrid from './components/catalog/ProductGrid';

import HeroSection from './components/HeroSection';
import { PopularCategories, PromoBanner, Testimonials, FaqSection } from './components/HomeExtraSections';

import { Flame, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const DEMO_PRODUCTS = [
  { id: '1', name: 'Artisanal Cold Brew Coffee', category: 'Beverages', price: 250, image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600', in_stock: true },
  { id: '2', name: 'Avocado Sourdough Toast', category: 'Food', price: 380, image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600', in_stock: true },
  { id: '3', name: 'Japanese Matcha Latte', category: 'Beverages', price: 290, image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600', in_stock: true },
  { id: '4', name: 'Butter Croissant Deluxe', category: 'Pastry', price: 180, image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600', in_stock: false },
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [activeTab, setActiveTab] = useState('home');

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    fetchProducts();
    const channel = supabase
      .channel('realtime-products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(DEMO_PRODUCTS);
      }
    } catch {
      setProducts(DEMO_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }

  const navigateToCatalog = (category = 'All') => {
    setSelectedCategory(category);
    setSearch('');
    setActiveTab('catalog');
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (selectedCategory === 'All' ? true : p.category === selectedCategory))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans overflow-x-hidden">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 overflow-x-hidden">
        {/* ================= HOME VIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
            <HeroSection onExplore={() => navigateToCatalog('All')} onOurStory={() => setActiveTab('about')} />
            <PopularCategories onSelectCategory={navigateToCatalog} />

            {/* Featured Products */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> Trending Now
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Featured Selections</h2>
                </div>
                <button
                  onClick={() => navigateToCatalog('All')}
                  className="text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm hover:underline flex items-center gap-1"
                >
                  View All ({products.length}) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <ProductGrid products={products.slice(0, 4)} loading={loading} />
            </div>

            <PromoBanner onClaim={() => navigateToCatalog('All')} />
            <Testimonials />
            <FaqSection />
          </div>
        )}

        {/* ================= CATALOG VIEW ================= */}
        {activeTab === 'catalog' && (
          <div className="animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Store Catalog</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Filter by category or search your favorites</p>
            </div>
            <SearchSortBar search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />
            <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        )}

        {/* ================= ABOUT VIEW ================= */}
        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 py-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">About AuraStore</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">Crafted for coffee enthusiasts & food lovers</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                AuraStore is a modern micro-commerce platform designed to provide a seamless ordering experience. Built with lightning-fast real-time inventory updates and integrated payment gateways.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <h4 className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg sm:text-xl">100%</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fresh Ingredients</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <h4 className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg sm:text-xl">&lt; 30 min</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Instant Delivery</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <h4 className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg sm:text-xl">4.9 ★</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customer Rating</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTACT VIEW ================= */}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 py-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Contact Us</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">Have a question? We'd love to hear from you.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Email Us</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">support@aurastore.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Call Support</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Location</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Noida, Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <textarea
                  rows="3"
                  placeholder="Your Message..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition-all shadow-md text-xs sm:text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
      <CartDrawer />
      <AdminModal products={products} />
    </div>
  );
}