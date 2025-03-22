import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/SignIn';
import RegisterPage from './pages/SignUp';
import ArtisanVerification from './pages/ArtisanVerification';
import './App.css';
import FindArtisanPage from './pages/FindArtisan'


function App() {
  return (
    <ErrorBoundary>
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/explore" element={<ProductsPage />} />
        <Route path="/find-artisan" element={<FindArtisanPage />} />
        <Route path="/artisan-verification" element={<ArtisanVerification />} />
        <Route path="/blog" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    </ErrorBoundary>
  );
}

export default App;