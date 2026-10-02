# 🛍️ AuraStore — Modern Micro-Commerce Web Application

AuraStore is a sleek, fast, and fully responsive micro-commerce frontend built with **React**, **Tailwind CSS**, **Lucide Icons**, and **Supabase**. It provides real-time inventory updates, smooth dark mode switching, custom filter/search mechanisms, dynamic cart management, and interactive promotional sections.

---

## ✨ Features

- ⚡ **Real-Time Inventory Management**: Integrated with Supabase live database channels for immediate inventory updates.
- 🎨 **Modern & Minimalist Design**: Premium UI/UX featuring full dark mode support, fluid micro-interactions, and custom gradients.
- 🔍 **Interactive Catalog**: Search by product name, filter by category (*Beverages, Food, Pastry*), and sort by price or name.
- 🛒 **Dynamic Cart Drawer**: Live cart drawer with quantity adjustments, item removal, coupon processing (`AURA20`), and order calculation.
- 🛠️ **Admin Management**: Built-in admin modal to add new products and manage current store items.
- 📱 **Fully Responsive**: Optimized for seamless display across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database / Backend**: [Supabase](https://supabase.com/)
- **Deployment**: Vercel / Netlify / GitHub Pages

---

## 📁 Project Structure

```text
micro-store/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin management modals and forms
│   │   ├── cart/           # Cart drawer, items, and checkout modal
│   │   ├── catalog/        # Product cards, grid, and search/sort bars
│   │   ├── layout/         # Header/Navbar and Footer components
│   │   ├── HeroSection.jsx # Main landing hero component
│   │   └── HomeExtraSections.jsx # Categories, promo banner, testimonials & FAQs
│   ├── context/            # React Context for state management
│   ├── lib/                # Supabase client setup
│   ├── App.jsx             # Main application component & routes
│   └── index.css           # Global Tailwind directives & styles
├── public/                 # Static assets
├── package.json
└── README.md
