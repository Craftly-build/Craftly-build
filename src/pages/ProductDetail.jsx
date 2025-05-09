"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "../styles/DetailPage.css"
import eyeicon from "../assets/eyeicon.png"
import PayLogos from "../components/PayLogos"

const ProductDetail = () => {
  const location = useLocation()
  const product = location.state?.product || {
    name: "Wooden Heated Sandals",
    price: 45000,
    artisan: "Mba Aku",
    rating: 4.5,
    reviewCount: 32,
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    details: {
      material: "Wood & Leather",
      color: "Brown",
      dimensions: "25cm x 10cm",
      careInstructions: "Clean with a dry cloth once a day",
    },
    variations: {
      size1: "EU 37",
      size2: "EU 38",
      size3: "EU 39",
    },
    description:
      "Handcrafted wooden sandals designed for comfort and style. These sandals feature premium leather straps and a contoured wooden sole that molds to your feet over time.",
  }

  const [views, setViews] = useState(0)
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [selectedSize, setSelectedSize] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const productViews = Math.floor(Math.random() * 100)
    setViews(productViews)

    // Mock related products
    setRelatedProducts([
      {
        id: 1,
        name: "Blue Crystal Open-toe Heels",
        price: 38000,
        rating: 4.8,
        reviewCount: 42,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 2,
        name: "Mahogany Block Heels",
        price: 42000,
        rating: 4.6,
        reviewCount: 36,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 3,
        name: "Classic Brown Italian Heels",
        price: 55000,
        rating: 4.9,
        reviewCount: 54,
        image: "/placeholder.svg?height=200&width=200",
      },
    ])
  }, [])

  const handleThumbnailClick = (image) => {
    setSelectedImage(image)
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }

  if (!product) {
    return <p>No product found</p>
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Viewing info */}
        <div className="viewing-info">
          <div className="currently-viewed">
            <img src={eyeicon || "/placeholder.svg"} alt="Eye Icon" />
            <p>{views} people are viewing this right now</p>
          </div>
          <div className="product-rating">
            <div className="star-icon">★</div>
            <p>
              {product.rating} ({product.reviewCount} Reviews)
            </p>
          </div>
        </div>

        {/* Main product section */}
        <div className="product-main-section">
          {/* Left: Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={selectedImage || product.image} alt={product.name} />
            </div>
            <div className="thumbnail-gallery">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className={selectedImage === product.image ? "active" : ""}
                onClick={() => handleThumbnailClick(product.image)}
              />
              {product.gallery &&
                product.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className={selectedImage === img ? "active" : ""}
                    onClick={() => handleThumbnailClick(img)}
                  />
                ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">N{product.price.toLocaleString()}</p>
            <p className="product-seller">
              Sold by: <span>{product.artisan}</span>
            </p>

            <div className="product-specs">
              <h3>Product Details</h3>
              <ul>
                {product.details &&
                  Object.entries(product.details).map(([key, value], index) => {
                    // Format the key for display (e.g., "careInstructions" -> "Care Instructions")
                    const formattedKey = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .replace(/([a-z])([A-Z])/g, "$1 $2")

                    return (
                      <li key={index}>
                        <span className="spec-name">{formattedKey}:</span> {value}
                      </li>
                    )
                  })}
              </ul>
            </div>

            <div className="product-variations">
              <h3>Variations available</h3>
              <div className="variation-options">
                {product.variations &&
                  Object.values(product.variations).map((size, index) => (
                    <button
                      key={index}
                      className={`variation-option ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>

            <div className="product-rating-detail">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-count">({product.reviewCount})</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-actions">
              <button className="add-to-cart-btn">Add To Cart</button>
              <button className="chat-with-seller-btn">Chat With Seller</button>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like section */}
      <div className="related-products-section">
        <h2>YOU MAY ALSO LIKE</h2>
        <div className="related-products">
          {relatedProducts.map((item) => (
            <div key={item.id} className="related-product-card">
              <div className="related-product-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                <button className="wishlist-btn">♡</button>
              </div>
              <div className="related-product-info">
                <h3>{item.name}</h3>
                <p className="related-product-price">N{item.price.toLocaleString()}</p>
                <div className="related-product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(item.rating) ? "star filled" : "star"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-count">({item.reviewCount})</span>
                </div>
                <button className="add-to-cart-small">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PayLogos />
    </div>
  )
}

export default ProductDetail
