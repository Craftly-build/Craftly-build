"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ShoppingCart, User, Menu, X, Search } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import "../styles/Navbar.css"
import i1 from "../assets/v1.png"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { getCartItemsCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const userMenuRef = useRef(null)

  const cartItemsCount = getCartItemsCount()

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsMobileMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" aria-label="Home">
            <img src={i1 || "/placeholder.svg"} alt="Craftly Logo" className="logo-image" />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              <Search size={18} />
            </button>
          </form>
        </div>

        <div className="navbar-links desktop">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`nav-link ${location.pathname === "/explore" ? "active" : ""}`}
            aria-current={location.pathname === "/explore" ? "page" : undefined}
          >
            Explore
          </Link>
          <Link
            to="/find-artisan"
            className={`nav-link ${location.pathname === "/find-artisan" ? "active" : ""}`}
            aria-current={location.pathname === "/find-artisan" ? "page" : undefined}
          >
            Find Artisan
          </Link>
          <Link
            to="/blog"
            className={`nav-link ${location.pathname === "/blog" ? "active" : ""}`}
            aria-current={location.pathname === "/blog" ? "page" : undefined}
          >
            Blog
          </Link>
        </div>

        <div className="navbar-auth desktop">
          {currentUser ? (
            <div className="user-actions">
              <Link to="/cart" className="cart-icon" aria-label={`Shopping cart ${cartItemsCount} items`}>
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="cart-count" aria-hidden="true">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <div className="user-menu" ref={userMenuRef}>
                <button
                  className="user-toggle"
                  onClick={toggleUserMenu}
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  aria-label="User menu"
                >
                  <User size={20} />
                </button>

                {isUserMenuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/orders">My Orders</Link>
                    {currentUser.userType === "artisan" && <Link to="/dashboard">Seller Dashboard</Link>}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/register" className="signup-btn">
                Sign up
              </Link>
              <Link to="/login" className="signin-btn">
                Sign in
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Popover */}
        <div className={`mobile-menu-popover ${isMobileMenuOpen ? "active" : ""}`} id="mobile-menu">
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
                  <Search size={18} />
                </button>
              </form>
            </div>

            <div className="mobile-nav-links">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className={`nav-link ${location.pathname === "/explore" ? "active" : ""}`}
                aria-current={location.pathname === "/explore" ? "page" : undefined}
              >
                Explore
              </Link>
              <Link
                to="/find-artisan"
                className={`nav-link ${location.pathname === "/find-artisan" ? "active" : ""}`}
                aria-current={location.pathname === "/find-artisan" ? "page" : undefined}
              >
                Find Artisan
              </Link>
              <Link
                to="/blog"
                className={`nav-link ${location.pathname === "/blog" ? "active" : ""}`}
                aria-current={location.pathname === "/blog" ? "page" : undefined}
              >
                Blog
              </Link>
            </div>

            <div className="mobile-auth">
              {currentUser ? (
                <div className="mobile-user-menu">
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>
                    My Orders
                  </Link>
                  <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                    Shopping Cart ({cartItemsCount})
                  </Link>
                  {currentUser.userType === "artisan" && (
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      Seller Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link to="/register" className="signupp-btn" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign up
                  </Link>
                  <Link to="/login" className="signin-btn" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
