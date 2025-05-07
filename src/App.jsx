import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/Cart"; // Import the new cart page
import CheckoutSuccess from "./pages/CheckoutSuccess";
import BuyerProfile from "./pages/BuyerProfile";
import NotFoundPage from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ContactUs from "./pages/ContactUs"
import ManageServices from "./pages/ManageServices"
import LoginPage from "./pages/SignIn";
import RegisterPage from "./pages/SignUp";
import ArtisanVerification from "./pages/ArtisanVerification";
import FindArtisanPage from "./pages/FindArtisan";
import ServiceDetail from './pages/ServiceDetail';
import ProductDetail from './pages/ProductDetail';
import BlogPage from "./pages/Blog";
import HelpSupport from './pages/HelpSupport';
import "./App.css";


function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} /> {/* Add the cart route */}
            <Route path="/checkout/success" element={<CheckoutSuccess />} /> {/* Add the cart route */}
            <Route path="/profile" element={<BuyerProfile />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/manage-services"
              element={
                <ProtectedRoute requiredUserType="artisan">
                  <ManageServices />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/explore" element={<ProductsPage />} />
            <Route path="/service/:id" element={<ServiceDetail  />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/find-artisan" element={<FindArtisanPage />} />
            <Route
              path="/artisan-verification"
              element={
                <ProtectedRoute requiredUserType="artisan">
                  <ArtisanVerification />
                </ProtectedRoute>
              }
            />
            <Route path="/blog" element={<BlogPage/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </ErrorBoundary>
  );
}

export default App;