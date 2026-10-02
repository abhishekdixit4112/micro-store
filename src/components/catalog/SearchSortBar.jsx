import React from 'react';
import { Search } from 'lucide-react';

export default function SearchSortBar({ search, setSearch, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center my-6">
      {/* Search Bar Input */}
      <div className="relative w-full sm:w-96">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-xs placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
        />
      </div>

      {/* Sort Selector */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Sort By:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-xs transition-colors"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}