import React, { useState } from 'react';
import { Coffee, Utensils, Cake, ArrowRight, Gift, Star, ChevronDown } from 'lucide-react';

export function PopularCategories({ onSelectCategory }) {
  const categories = [
    { title: 'Beverages', desc: 'Coffee, Lattes, Cold Brews', icon: Coffee },
    { title: 'Food', desc: 'Toasts, Noodles, Bowls', icon: Utensils },
    { title: 'Pastry', desc: 'Croissants, Cakes, Sweets', icon: Cake },
  ];

  return (
    <div>
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Popular Categories</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Browse by your favorite meal or beverage preference
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              onClick={() => onSelectCategory(cat.title)}
              className="cursor-pointer group bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-slate-900 dark:to-slate-800/80 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all hover:shadow-xl hover:shadow-indigo-500/10 flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="p-3 bg-indigo-600 text-white rounded-2xl inline-block shadow-md">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white pt-2">{cat.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cat.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PromoBanner({ onClaim }) {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="space-y-2 text-center md:text-left">
        <span className="inline-flex items-center gap-1.5 bg-slate-900/10 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider">
          <Gift className="w-4 h-4" /> Limited Time Deal
        </span>
        <h3 className="text-2xl sm:text-3xl font-black">Get 20% OFF Your First Order</h3>
        <p className="text-slate-900/80 text-xs sm:text-sm font-semibold max-w-md">
          Use coupon code <span className="underline font-black">AURA20</span> during checkout to claim your instant discount.
        </p>
      </div>
      <button
        onClick={onClaim}
        className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-8 py-4 rounded-2xl transition-all shadow-lg text-xs sm:text-sm whitespace-nowrap"
      >
        Claim Offer Now
      </button>
    </div>
  );
}

export function Testimonials() {
  const reviews = [
    { name: 'Aarav Sharma', role: 'Regular Customer', text: 'The Artisanal Cold Brew is unmatched in flavor. Delivery is always under 25 minutes!', stars: 5 },
    { name: 'Priya Verma', role: 'Food Blogger', text: 'Loved the Japanese Matcha Latte and Avocado Toast! Fresh ingredients and super clean packaging.', stars: 5 },
    { name: 'Rohan Gupta', role: 'Software Engineer', text: 'Real-time stock updates mean I never order something out of stock. Super reliable platform!', stars: 5 },
  ];

  return (
    <div>
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Our Customers Say</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Read real feedback from coffee lovers and foodies</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex gap-1 text-amber-400">
              {[...Array(review.stars)].map((_, s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">"{review.text}"</p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{review.name}</h4>
              <p className="text-[11px] text-slate-400">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: 'How fast will my order arrive?', a: 'We process and dispatch all local deliveries within 20-30 minutes of placing your order.' },
    { q: 'Are the stock levels accurate in real time?', a: 'Yes! Our store inventory synchronizes live with Supabase database updates.' },
    { q: 'What payment methods do you accept?', a: 'We accept Razorpay, major credit/debit cards, UPI, and Cash on Delivery.' },
    { q: 'Can I customize my order items?', a: 'Add notes during checkout or contact support right after placing your order.' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Quick answers to common questions</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex justify-between items-center gap-2"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>
            {openFaq === index && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}