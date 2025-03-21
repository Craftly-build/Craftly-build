import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import i1 from "../assets/i1.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={i1} alt="Handmade Logo" className="logo-image" />
          </Link>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className="navbar-search desktop">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for artisans or products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for artisans or products"
            />
            <button type="submit" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </form>
        </div>
        
        <div className="navbar-links desktop">
          <Link to="/" className={`nav-link ${window.location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/explore" className={`nav-link ${window.location.pathname === '/explore' ? 'active' : ''}`}>Explore</Link>
          <Link to="/find-artisan" className={`nav-link ${window.location.pathname === '/find-artisan' ? 'active' : ''}`}>Find Artisan</Link>
          <Link to="/blog" className={`nav-link ${window.location.pathname === '/blog' ? 'active' : ''}`}>Blog</Link>
        </div>
        
        <div className="navbar-auth desktop">
          {isLoggedIn ? (
            <div className="user-menu">
              <button className="user-menu-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                <span>Account</span>
              </button>
              <div className="user-dropdown">
                <Link to="/profile">My Profile</Link>
                <Link to="/orders">My Orders</Link>
                {localStorage.getItem('userType') === 'artisan' && (
                  <Link to="/dashboard">Seller Dashboard</Link>
                )}
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" className="signup-btn">Sign up</Link>
              <Link to="/login" className="signin-btn">Sign in</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Popover */}
        <div className={`mobile-menu-popover ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="navbar-search mobile">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search for artisans or products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </button>
              </form>
            </div>
            
            <div className="mobile-nav-links">
              <Link to="/" className={`nav-link ${window.location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/explore" className={`nav-link ${window.location.pathname === '/explore' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
              <Link to="/find-artisan" className={`nav-link ${window.location.pathname === '/find-artisan' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Find Artisan</Link>
              <Link to="/blog" className={`nav-link ${window.location.pathname === '/blog' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            </div>
            
            <div className="mobile-auth">
              {isLoggedIn ? (
                <div className="mobile-user-menu">
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                  <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
                  {localStorage.getItem('userType') === 'artisan' && (
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Seller Dashboard</Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link to="/register" className="signupp-btn" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
                  <Link to="/login" className="signin-btn" onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;