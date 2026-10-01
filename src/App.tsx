/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthDemoPage } from './pages/AuthDemoPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { IngredientsPage } from './pages/IngredientsPage';
import { IngredientDetailPage } from './pages/IngredientDetailPage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { MyImpactPage } from './pages/MyImpactPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1D1D1F] selection:bg-[#2E7D4F]/20 selection:text-[#2E7D4F]">
          {/* Sticky Blur Navbar */}
          <Navbar />

          {/* Main App Content */}
          <main className="flex-1">
            <Routes>
              {/* Publik */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/masuk" element={<AuthDemoPage />} />
              <Route path="/daftar" element={<AuthDemoPage />} />
              <Route path="/produk" element={<CatalogPage />} />
              <Route path="/produk/:id" element={<ProductDetailPage />} />
              <Route path="/cerita-bahan" element={<IngredientsPage />} />
              <Route path="/cerita-bahan/:id" element={<IngredientDetailPage />} />

              {/* Area Pembeli */}
              <Route path="/beranda" element={<BuyerDashboardPage />} />
              <Route path="/keranjang" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pesanan-berhasil" element={<OrderSuccessPage />} />
              <Route path="/pesanan-saya" element={<MyOrdersPage />} />
              <Route path="/dampak-saya" element={<MyImpactPage />} />
              <Route path="/profil" element={<ProfilePage />} />

              {/* 404 Senada */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Minimalist Brand Footer */}
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
