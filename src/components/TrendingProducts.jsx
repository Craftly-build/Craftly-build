"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"
import LoadingSpinner from "./Loading"
import LazyImage from "./LazyImage"
import "../styles/TrendingProduct.css"
import i3 from "../assets/tp1.png"
import i4 from "../assets/tp2.png"
import i5 from "../assets/tp3.png"
import i6 from "../assets/tp4.png"
import i7 from "../assets/tp5.png"
import i8 from "../assets/tp6.png"

const ITEMS_PER_PAGE = 6

const TrendingProducts = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const { cart, addToCart, getCartItemsCount } = useCart()
  const [favorites, setFavorites] = useState({})
  const [addingToCart, setAddingToCart] = useState({})

  const featuredProducts = [
    {
      id: 1,
      name: "Brown Leather Shoe",
      description: "Lorem ipsum is simply dummy text of the printing and type more",
      price: 20000,
      rating: 5,
      reviews: 50,
      image: i3,
    },
    {
      id: 2,
      name: "Vase Set",
      description: "Lorem ipsum is simply dummy text of the printing and type more",
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i4,
    },
    {
      id: 3,
      name: "Woven Chair",
      description: "Lorem ipsum is simply dummy text of the printing and type more",
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i5,
    },
    {
      id: 4,
      name: "Knitted Bag",
      description: "Lorem ipsum is simply dummy text of the printing and type more",
      price: 20000,
      rating: 5,
      reviews: 50,
      image: i6,
    },
    {
      id: 5,
      name: "Ankara Two-piece",
      description: "Lorem ipsum is simply dummy text of the printing and type more",
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i7,
    },
    {
      id: 6,
      name: "Handwoven Picnic Basket",
      description: "Lorem ipsum is simply dummy text of the printing and type more",
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i8,
    },
  ]

  const totalPages = Math.ceil(featuredProducts.length / ITEMS_PER_PAGE)
  const displayedProducts = featuredProducts.slice(0, currentPage * ITEMS_PER_PAGE)

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart && cart.some((item) => item.id === productId)
  }

  const handleAddToCart = async (product) => {
    try {
      // Set loading state for this specific product
      setAddingToCart((prev) => ({ ...prev, [product.id]: true }))

      // Add to cart
      await addToCart(product)

      // Show success message
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add to cart. Please try again.", {
        position: "bottom-right",
      })
    } finally {
      // Clear loading state for this product
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }))
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }))
  }

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCurrentPage((prev) => prev + 1)
      setLoading(false)
    }
  }

  return (
    <section className="featured-products-section">
      <div className="containerr">
        <h2 className="section-title">Trending Products</h2>
        <div className="products-grid">
          {displayedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleProductClick(product.id)}
                />
                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={`Add ${product.name} to favorites`}
                >
                  <Heart className="heart-icon" fill={favorites[product.id] ? "#e53e3e" : "none"} aria-hidden="true" />
                </button>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-rating" aria-label={`Rating: ${product.rating} out of 5`}>
                  <div className="stars" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="review-count">({product.reviews})</span>
                </div>
                <div className="product-price">₦{product.price.toLocaleString()}</div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="product-btn"
                  disabled={isInCart(product.id) || addingToCart[product.id]}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {addingToCart[product.id] ? (
                    <LoadingSpinner size="small" />
                  ) : isInCart(product.id) ? (
                    <>
                      <Check size={16} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more">
          <button
            className="view-more-btn"
            onClick={loadMore}
            disabled={loading || currentPage >= totalPages}
            aria-label={loading ? "Loading..." : "View more products"}
          >
            {loading ? <LoadingSpinner size="small" /> : "View more"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default TrendingProducts
