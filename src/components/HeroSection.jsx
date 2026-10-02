import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeroSection({ onExplore, onOurStory }) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-100 via-indigo-50/50 to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-8 md:p-14 shadow-xl dark:shadow-2xl transition-colors duration-500 group">
      <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-400/20 dark:bg-indigo-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-purple-400/20 dark:bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600/10 dark:bg-indigo-500/10 border border-indigo-600/20 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] sm:text-xs font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Next-Gen Artisanal Experience
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight break-words">
            Taste the <span className="bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 dark:from-amber-300 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">Extraordinary</span> Every Day.
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base md:text-lg leading-relaxed max-w-xl">
            Handcrafted specialty beverages, fresh artisanal pastries, and gourmet toasts crafted on demand and delivered fresh.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onExplore}
              className="px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOurStory}
              className="px-6 py-3.5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-300/80 dark:border-slate-700/80 transition-all text-center shadow-xs"
            >
              Our Story
            </button>
          </div>

          <div className="pt-4 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-2 sm:gap-4">
            <div>
              <span className="block text-base sm:text-2xl font-black text-amber-600 dark:text-amber-400">20 Mins</span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Delivery</span>
            </div>
            <div>
              <span className="block text-base sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">4.9 ★</span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">10k+ Reviews</span>
            </div>
            <div>
              <span className="block text-base sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Organic Beans</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative [perspective:1000px] flex justify-center items-center py-2 sm:py-6">
          <div className="relative w-full max-w-[280px] sm:max-w-xs rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/60 p-4 sm:p-5 shadow-2xl dark:shadow-slate-950/50 transition-transform duration-500 hover:rotate-0 sm:rotate-3">
            <div className="relative h-40 sm:h-48 w-full rounded-2xl overflow-hidden mb-3 sm:mb-4">
              <img
                src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600"
                alt="Featured Specialty"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full border border-amber-400/30">
                ★ #1 Bestseller
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Artisanal Cold Brew</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Steeped for 18 hours with organic Ethiopian roast beans.</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400">₹250.00</span>
                <button
                  onClick={onExplore}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}