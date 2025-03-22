import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import useCartStore from "../store/cartStore";
import LoadingSpinner from './Loading';
import '../styles/TrendingProduct.css';
import i3 from "../assets/tp1.png";
import i4 from "../assets/tp2.png";
import i5 from "../assets/tp3.png";
import i6 from "../assets/tp4.png";
import i7 from "../assets/tp5.png";
import i8 from "../assets/tp6.png";

const ITEMS_PER_PAGE = 6;

const TrendingProducts = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const featuredProducts = [
    {
      id: 1,
      name: 'Brown Leather Shoe',
      description: 'Lorem ipsum is simply dummy text of the printing and type more',
      price: 20000,
      rating: 5,
      reviews: 50,
      image: i3
    },
    {
      id: 2,
      name: 'Vase Set',
      description: 'Lorem ipsum is simply dummy text of the printing and type more',
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i4
    },
    {
      id: 3,
      name: 'Woven Chair',
      description: 'Lorem ipsum is simply dummy text of the printing and type more',
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i5
    },
    {
      id: 4,
      name: 'Knitted Bag',
      description: 'Lorem ipsum is simply dummy text of the printing and type more',
      price: 20000,
      rating: 5,
      reviews: 50,
      image: i6
    },
    {
      id: 5,
      name: 'Ankara Two-piece',
      description: 'Lorem ipsum is simply dummy text of the printing and type more',
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i7
    },
    {
      id: 6,
      name: 'Handwoven Picnic Basket',
      description: 'Lorem ipsum is simply dummy text of the printing and type more',
      price: 20000,
      rating: 4.5,
      reviews: 50,
      image: i8
    },
    { id: 1,
       name: 'Handcrafted Leather Wallet',
        price: 49.99,
         rating: 4.5,
          reviews: 'accessories', 
          image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Ceramic Coffee Mug', price: 24.99, rating: 4.8, category: 'home', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Hand-woven Basket', price: 34.99, rating: 4.2, category: 'home', image: 'https://images.unsplash.com/photo-1519219788971-8d9797e0928e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 4, name: 'Wooden Cutting Board', price: 39.99, rating: 4.6, category: 'kitchen', image: 'https://images.unsplash.com/photo-1583552188819-4cab6d9c0a09?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 5, name: 'Handmade Soap Set', price: 19.99, rating: 4.3, category: 'bath', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 6, name: 'Macrame Wall Hanging', price: 59.99, rating: 4.7, category: 'home', image: 'https://images.unsplash.com/photo-1622163642998-1ea3ae2a5cd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ];

  const totalPages = Math.ceil(featuredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = featuredProducts.slice(0, currentPage * ITEMS_PER_PAGE);

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }
  };

  return (
    <section className="featured-products-section">
      <div className="containerr">
        <h2 className="section-title">Trending Products</h2>
        <div className="products-grid">
          {displayedProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                <button className="favorite-btn">
                  <Heart className="heart-icon" />
                </button>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < Math.floor(product.rating) ? "star filled" : "star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="review-count">({product.reviews})</span>
                </div>
                <div className="product-price">₦{product.price.toLocaleString()}</div>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  className="btn product-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {currentPage < totalPages && (
          <div className="view-more">
            <button 
              className="btn view-more-btn"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'View more'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;