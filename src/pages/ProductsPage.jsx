import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/Loading';
import PayLogos from '../components/PayLogos';
import '../styles/ProductsPages.css';

const ProductsPage = () => {
  const [filter, setFilter] = useState('all');
  const [material, setMaterial] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [starRating, setStarRating] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const { products, loading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts({
      category: filter !== 'all' ? filter : '',
      sortBy,
      page: currentPage,
      limit: ITEMS_PER_PAGE
    });
  }, [filter, sortBy, currentPage]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart({
        _id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesMaterial = material === 'all' || 
      product.name.toLowerCase().includes(material.toLowerCase());
    const matchesRating = starRating === 'featured' || 
      (starRating === 'high-rating' ? product.rating >= 4 : product.rating < 4);
    return matchesMaterial && matchesRating;
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const productsViewed = Math.min(currentPage * ITEMS_PER_PAGE, totalProducts);

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>All Products</h1>
          
          <div className="filter-sort-container">
            <div className="filter-container">
              <label htmlFor="filter"> </label>
              <select 
                id="filter" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter products by category"
              >
                <option value="all">All Categories</option>
                <option value="accessories">Accessories</option>
                <option value="home">Home Decor</option>
                <option value="kitchen">Kitchen</option>
                <option value="bath">Bath & Body</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div className="material-container">
              <label htmlFor="material"> </label>
              <select 
                id="material" 
                value={material} 
                onChange={(e) => setMaterial(e.target.value)}
                aria-label="Filter products by material"
              >
                <option value="all">Materials</option>
                <option value="Wooden">Wooden</option>
                <option value="Leather">Leather</option>
                <option value="Handwoven">Woven</option>
                <option value="Ceramic">Ceramic</option>
              </select>
            </div>
            
            <div className="sort-container">
              <label htmlFor="sort"> </label>
              <select 
                id="sort" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Price Range</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="rating-container">
              <label htmlFor="rating"> </label>
              <select 
                id="rating" 
                value={starRating} 
                onChange={(e) => setStarRating(e.target.value)}
                aria-label="Sort by rating"
              >
                <option value="featured">Ratings</option>
                <option value="high-rating">Highest Rated</option>
                <option value="low-rating">Lowest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="no-results">
            <p>Error loading products. Please try again later.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.slice(0, currentPage * ITEMS_PER_PAGE).map(product => (
              <div className="product-card" key={product.id}>
                <Link
                  to={product.category === 'services' ? `/service/${product.id}` : `/product/${product.id}`}
                  state={{ product }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <button className="products-favorite-btn">
                      <Heart className="products-heart-icon" />
                    </button>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
                        ))}
                      </div>
                      <span className="rating-value">{product.rating}</span>
                    </div>
                    {product.category === 'services' ? (
                      <div className='product-btn-container'>
                        <button className="product-btn">Request Services</button>
                      </div>
                    ) : (
                      <div className="price-add-container">
                        <div className="product-price">N{product.price}</div>
                        <div className='product-btn-container'>
                          <button 
                            className="product-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='products-viewed'>
        <p>You've viewed {productsViewed} of {totalProducts} Products</p>
      </div>

      <div className='line-svg-div'>
        <svg className='line-svg' width="222" height="1" viewBox="0 0 222 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="0.75" x2="222" y2="0.75" stroke="#A35444" strokeWidth="0.5"/>
        </svg>
      </div>

      {currentPage < totalPages && (
        <div className="load-more-container">
          <button 
            className="load-more-button"
            onClick={loadMore}
            disabled={loading}
          >
            LOAD MORE
          </button>
        </div>
      )}

      <hr />
      <PayLogos />
    </div>
  );
};

export default ProductsPage;