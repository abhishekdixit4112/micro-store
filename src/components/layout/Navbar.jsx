import React from 'react';
import { ShoppingBag, Settings, Sun, Moon, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';

export default function Navbar({ darkMode, toggleDarkMode, activeTab, setActiveTab }) {
  const { cart, setIsCartOpen } = useCart();
  const { setIsAdminOpen } = useAdmin();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-4 transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 text-white rounded-xl group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Aura<span className="text-indigo-600 dark:text-indigo-400">Store</span>
          </span>
        </button>

        {/* Tab Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Admin Dashboard"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-2xl transition-all flex items-center justify-center shadow-md shadow-indigo-500/20 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}