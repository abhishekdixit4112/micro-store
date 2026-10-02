import React from 'react';
import { Store, Truck, ShieldCheck, RefreshCw, Heart, Send } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-16 bg-gradient-to-b from-slate-100/80 via-slate-100 to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      {/* Top Feature Highlights Bar */}
      <div className="max-w-6xl mx-auto px-6 py-8 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Express Delivery</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Fresh items delivered fast</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Encrypted Checkout</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Razorpay & Card Security</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Real-time Stock</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Instant menu inventory sync</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
              <Store className="w-5 h-5" />
            </div>
            <span className="font-black text-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              AuraStore
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Your destination for handcrafted coffees, artisanal toast, and freshly baked pastries.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Menu Catalog
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Contact Support
              </button>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
            Categories
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">Beverages</li>
            <li className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">Food & Toast</li>
            <li className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">Pastries & Desserts</li>
            <li className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">Seasonal Specials</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Get exclusive offers directly in your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email..."
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white p-2.5 rounded-xl transition-all shadow-md shadow-indigo-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-200/40 dark:bg-slate-950/60 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400 gap-2">
          <span>© 2026 AuraStore. All rights reserved.</span>
          <span className="flex items-center gap-1 font-medium">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for Small Businesses
          </span>
        </div>
      </div>
    </footer>
  );
}