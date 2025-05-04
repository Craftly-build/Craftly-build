"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import LazyImage from "./LazyImage";
import LoadingSpinner from "./Loading";
import "../styles/TrendingProduct.css";

const ITEMS_PER_PAGE = 6;

const TrendingProducts = () => {
  const navigate = useNavigate();
  const { cart, addToCart, getCartItemsCount } = useCart();
  const { fetchTrendingProducts } = useProducts();

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState({});
  const [addingToCart, setAddingToCart] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      const data = await fetchTrendingProducts();
      setTrendingProducts(data || []);
      setLoading(false);
    };
    loadTrending();
  }, []);

  const totalPages = Math.ceil(trendingProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = trendingProducts.slice(
    0,
    currentPage * ITEMS_PER_PAGE
  );

  const isInCart = (productId) => {
    return cart && cart.some((item) => item.id === productId);
  };

  const handleAddToCart = async (product) => {
    try {
      setAddingToCart((prev) => ({ ...prev, [product._id]: true }));
      await addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product._id]: false }));
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }
  };

  return (
    <section className="featured-products-section">
      <div className="containerr">
        <h2 className="section-title">Trending Products</h2>
        {loading && currentPage === 1 ? (
          <LoadingSpinner/>
        ) : (
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">
                  <LazyImage
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    onClick={() => handleProductClick(product._id)}
                  />
                  <button
                    className="favorite-btn"
                    onClick={() => toggleFavorite(product._id)}
                    aria-label={`Add ${product.name} to favorites`}
                  >
                    <Heart
                      className="heart-icon"
                      fill={favorites[product._id] ? "#e53e3e" : "none"}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div
                    className="product-rating"
                    aria-label={`Rating: ${product.rating} out of 5`}
                  >
                    <div className="stars" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(product.rating)
                              ? "star filled"
                              : "star"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="review-count">({product.reviews || 0})</span>
                  </div>
                  <div className="product-price">
                    ₦{product.price?.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="product-btn"
                    disabled={isInCart(product._id) || addingToCart[product._id]}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {addingToCart[product._id] ? (
                      <LoadingSpinner size="small" />
                    ) : isInCart(product._id) ? (
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
        )}
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
  );
};

export default TrendingProducts;
