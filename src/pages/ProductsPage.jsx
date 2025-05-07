import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';
import '../styles/ProductsPages.css';
import i15 from '../assets/i15.png'
import i16 from '../assets/i16.png'
import i17 from '../assets/i17.png'
import i18 from '../assets/i18.png'
import i19 from '../assets/i19.png'
import i20 from '../assets/i20.png'
import i21 from '../assets/i21.png'
import i22 from '../assets/i22.png'
import i23 from '../assets/i23.png'
import i24 from '../assets/i24.png'
import i25 from '../assets/i25.png'
import i26 from '../assets/i26.png'
import i27 from '../assets/i27.png'
import i28 from '../assets/i28.png'
import i29 from '../assets/i29.png'
import i31 from '../assets/i31.png'
import repair from '../assets/repair.png'

import PayLogos from '../components/PayLogos';


const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [material, setMaterial] = useState('all')
  const [sortBy, setSortBy] = useState('featured');
  const [starRating, setStarRating] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1);
  

  
  // Sample product data
  const sampleProducts = [
      {
          id: 16,
          name: 'Professional Auto Repair & Maintenance',
          description:'Expert car diagnostics, repairs, and servicing for all vehicle types.',
          rating: 4,
          category: 'services',
          image: repair ,
          artisan: 'Anthony Ozey',
          availableDays: 'Monday - Saturday',
          details: [' Diagnostic Services',
             'Oil Changes', 
             ' Brake Repairs', 
             'Engine Tune-Ups',],
          gallery: repair,
        },
   
    // should be getting data from the api instead
    {
          id: 1,
          name: 'Brown Leather Heeled Sandals',
          description: 'Elegant, handcrafted brown leather heels designed for style and comfort. Perfect for formal and casual looks.',
          price: 45000,
          rating: 4,
          // reviews: 50,
          category: 'accessories',
          image: i15,
          artisan: '',
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: i15,

          
          
        },

        {
          id: 17,
          name: 'Mahogany Block Heels',
          description: 'Crafted from premium leather, these mahogany-toned block heels provide both comfort and class',
          price:20000,
          rating: 3,
          category: 'accessories',
          image: i31,
          artisan: '',
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '4 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 38`,
            size2: `EU 40`,
            size3: `EU 42`,
          },
          gallery: i31,

        },
    {
          id: 2,
          name: 'Handwoven Kente Clutch Bag',
          description: 'Authentic Ghanaian Kente fabric clutch, handwoven for a unique look.',
          price: 22000,
          rating: 4,
          category: 'accessories',
          image: i16,
          artisan: '',
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: i16

        },

        {
          id: 3,
          name: 'Handwoven Raffia Wall Art',
          description: 'Locally made raffia wall decor, perfect for cultural-inspired interiors.',
          price: 10500,
          rating: 4,
          category: 'home',
          image: i18,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: i18

        },
        {
          id: 4,
          name: 'Perfume Oil (Oud & Sweet Blends)',
          description: 'Handcrafted perfume oils with long-lasting scents. Made from natural extracts and rich oils.',
          price: 9000,
          rating: 4,
          category: 'bath',
          image: i17,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery:  i17,

        },
        {
          id: 5,
          name: 'Hand-Carved Wooden Utensils',
          description: 'Durable, handcrafted wooden utensils perfect for any use.',
          price: 4500,
          rating: 4,
          category: 'kitchen',
          image: i19,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: i19

        },
        {
          id: 6,
          name: 'Handmade Beaded Gold Jewelry Set',
          description: 'Elegant handcrafted beaded jewelry, perfect for special occasions and everyday wear.',
          price: 45000,
          rating: 4,
          category: 'accessories',
          image: i20,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: i20

        },
        {
          id: 7,
          name: 'Custom Handmade Leather Wallet',
          description: 'Durable and stylish handcrafted leather wallet, made from high-quality Nigerian leather.',
          price: 13500,
          rating: 4,
          category: 'accessories',
          image: i21,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery:  i21,
        },
        {
          id: 8,
          name: 'Custom Handmade Wooden Chair',
          description: 'Handcrafted wooden chair, made with durable local hardwood and expert craftsmanship.',
          price: 75000,
          rating: 3,
          category: 'home',
          image: i22,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: 
          i22,
        },
         
        {
          id: 9 ,
          name: 'Professional Plumbing Repair Services',
          description: 'Pipe repairs, installations, and maintenance by skilled plumbers.',
          rating: 4.6 ,
          category: 'services', 
          image: i23 ,
          details: [' Diagnostic Services',
            'Oil Changes', 
            ' Brake Repairs', 
            'Engine Tune-Ups',],
          gallery: 
          i23 ,

        },
        {
          id: 10 ,
          name: 'Professional Electrical Services',
          description: 'afe and expert electrical wiring, repairs, and installations.',
          rating: 4 ,
          category: 'services', 
          image: i24 ,
          details: [' Diagnostic Services',
            'Oil Changes', 
            ' Brake Repairs', 
            'Engine Tune-Ups',],
          gallery: 
          i24 ,

        },
        {
          id:  11,
          name: 'Custom Carpentry & Woodwork Services',
          description: 'Expertly crafted wooden furniture, doors, and custom designs.',
          rating: 4 ,
          category: 'services', 
          image: i25 ,
          details: [' Diagnostic Services',
            'Oil Changes', 
            ' Brake Repairs', 
            'Engine Tune-Ups',],
          gallery: 
          i25 ,

        },
        {
          id: 12,
          name: 'Bespoke Tailoring & Custom Clothing',
          description: 'Made-to-measure outfits, alterations, and custom sewing by expert tailors.',
          rating: 5 ,
          category: 'services', 
          image: i26,
          gallery: 
          i26,

        },

        {
          id: 13,
          name: 'Handmade Clay Cooking Pot',
          description:'Locally crafted clay pot, perfect for traditional and modern cooking.',
          price: 13500,
          rating: 4 ,
          category: 'kitchen',
          image: i27,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: 
          i27,
        },
        {
          id: 14,
          name: 'Traditional Handwoven Fan',
          description:'Stylish, handcrafted fan made from durable woven materials.',
          price:5000 ,
          rating: 4.5,
          category: 'accessories',
          image: i28 ,
          details: {
            material: 'Wood',
            color: 'Brown',
            height: '3 inches',
            careInstructions: 'Wipe with a dry cloth'
          },
          variations: {
            size1: `EU 37`,
            size2: `EU 38`,
            size3: `EU 39`,
          },
          gallery: 
          i28 ,
        },
        {
          id: 15,
          name: 'Professional Photography & Videography',
          description:'High-quality photoshoots, event coverage, and video production for personal and business needs',
          rating: 4,
          category: 'services',
          image: i29 ,
          details: [' Diagnostic Services',
            'Oil Changes', 
            ' Brake Repairs', 
            'Engine Tune-Ups',],
          gallery: 
          i29 ,
        },
        // {
        //   id: 16,
        //   name: 'Professional Auto Repair & Maintenance',
        //   description:'Expert car diagnostics, repairs, and servicing for all vehicle types.',
        //   rating: 4.4,
        //   category: 'services',
        //   image: i30 ,
        // },

  ];


  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredProducts = [...sampleProducts];
      
      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.category === filter
        );
      }

      // Apply material filter

      if (material !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(material.toLowerCase())
        );
      }
      
      
      // Apply sorting
      if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
     
      //Apply rate sorting
      if(starRating === 'low-rating' ){
        filteredProducts.sort((a, b) => a.rating -b.rating )
      }
      else if (starRating === 'high-rating' ) {
        filteredProducts.sort((a, b) => b.rating - a.rating);
      }

      setProducts(filteredProducts);
      setLoading(false);
    }, 1500 ); 
  }, [searchQuery, filter, material, sortBy, starRating]

);
  
const ITEMS_PER_PAGE = 4;

const totalPages = Math.ceil(sampleProducts.length / ITEMS_PER_PAGE);
const displayedProducts = products.slice(0, currentPage * ITEMS_PER_PAGE);

const totalProducts = products.length
const productsViewed = Math.min(currentPage * ITEMS_PER_PAGE, totalProducts); 

const loadMore = async () => {
  if (currentPage < totalPages) {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentPage(prev => prev + 1);
    setLoading(false);
  } 
 
}; 




  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>All Products {searchQuery && `- Search: "${searchQuery}"`}</h1>
          
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
              <label htmlFor="filter"> </label>
                <select 
                  id="filter" 
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
              <label htmlFor="sort"> </label>
              <select 
                id="rating" 
                value={starRating} 
                onChange={(e) => setStarRating(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Ratings</option>
                <option value="high-rating">Highest Rated</option>
                <option value="low-rating">Lowest Rated</option>
              </select>
            </div>


          </div>
        </div>
     
     {  loading ? (
            <LoadingSpinner />
          )

      :     products.length === 0 ? (
        <div className="no-results">
          <p>No products found matching your criteria.</p>
        </div> ) :
      (
        <div className="products-grid"> 
        
        {displayedProducts.map (product => (
         
            product.category === 'services' ? (
                      
                  <div className="product-card" key={product.id}>
                    <Link
                      key={product.id}
                      to= {`/service/${product.id}`}
                      state={{product}
                    
                    }
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
                      <div className='product-btn-container'> <button className="product-btn">Request Services</button> </div>
                    </div>
                     </Link>
                  </div>
              
                 


            ) : (
                
                 
                <div className="product-card" key={product.id}>
                   <Link
                      key={product.id}
                      to= {`/product/${product.id}` }
                      state={{product}}
                      
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
                  <div className="price-add-container">
                  <div className="product-price">N{product.price}</div>
                  <div className='product-btn-container'> <button className="product-btn">Add to Cart</button> </div>
                  </div>
                </div>
                </Link>
                </div>
            )
          

        )
        )}
               </div> 
      )}

      
           </div>

      <div className='products-viewed'> 
          <p>You've viewed {productsViewed} of {totalProducts} Products </p>

      
      </div>
'
      <div className='line-svg-div'>
        <svg className='line-svg' width="222" height="1" viewBox="0 0 222 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="0.75" x2="222" y2="0.75" stroke="#A35444" stroke-width="0.5"/>
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
        )
      }

      <hr />
    
      <PayLogos />
    </div>
  );
};

export default ProductsPage;