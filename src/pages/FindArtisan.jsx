"use client"

import { useState } from "react"
import { Star, BookmarkIcon, ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/FindArtisan.css"
import Footer from "../components/Footer"
import "../styles/TrendingProduct.css"
import i3 from "../assets/a1.png"
import i4 from "../assets/a2.png"
import i5 from "../assets/a3.png"
import i6 from "../assets/a4.png"
import i7 from "../assets/b1.png"
import i8 from "../assets/b2.png"
import i9 from "../assets/b3.png"
import i1 from "../assets/fc3.png"

const FindArtisanPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const categories = [
    { id: "all", name: "All" },
    { id: "clothing", name: "Clothing and Fashion" },
    { id: "bags", name: "Bags & Leatherworks" },
    { id: "beauty", name: "Beauty & Wellness" },
    { id: "more", name: "More..." },
  ]

  const artisans = [
    {
      id: 1,
      name: "Nnaji Rose",
      title: "Fashion Designer",
      location: "Lagos, Nigeria",
      rating: 5.0,
      reviews: 24,
      profileImage: i3,
      gallery: [i4, i5, i6],
    },
    {
      id: 2,
      name: "Michael Ade",
      title: "Leather bag maker",
      location: "Lagos, Nigeria",
      rating: 5.0,
      reviews: 16,
      profileImage: i7,
      gallery: [i8, i9, i1],
    },
    {
      id: 3,
      name: "Ayisha Bello",
      title: "Jewelry Designer",
      location: "Lagos, Nigeria",
      rating: 4.7,
      reviews: 18,
      profileImage: i7,
      gallery: [i8, i9, i1],
    },
    {
      id: 4,
      name: "Elias Aliko",
      title: "Cobbler",
      location: "Abuja, Nigeria",
      rating: 4.9,
      reviews: 32,
      profileImage: i7,
      gallery: [i8, i9, i1],
    },
    {
      id: 5,
      name: "David Ekong",
      title: "Furniture Maker",
      location: "Lagos, Nigeria",
      rating: 4.8,
      reviews: 50,
      profileImage: i7,
      gallery: [i8, i9, i1],
    },
    {
      id: 6,
      name: "Yemisi Lanre",
      title: "Hair Stylist",
      location: "Lagos, Nigeria",
      rating: 4.6,
      reviews: 50,
      profileImage: i7,
      gallery: [i8, i9, i1],
    },
    {
      id: 7,
      name: "Blessing Musa",
      title: "Beauty Specialist",
      location: "Lagos, Nigeria",
      rating: 4.9,
      reviews: 23,
      profileImage: i7,
      gallery: [i8, i9, i1],
    },
    {
      id: 8,
      name: "Yusuf Oyeleke",
      title: "Portrait Artist",
      location: "Lagos Nigeria",
      rating: 4.7,
      reviews: 21,
      profileImage: i7,
      gallery: [i8, i9, i1],
    },
  ]

  // Filter component for the left side
  const FilterComponent = () => (
    <div className="filter-component">
      <div className="filter-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="23" height="23" rx="7.5" stroke="#E2E8F0" />
          <path
            d="M3 6H21M6 12H18M10 18H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="find-artisan-page">
      <div className="search-section">
        <h1>Discover Skilled Artisans</h1>
        <p>Find the perfect craftsperson for your needs today</p>
      </div>

      <div className="categories-container">
        <FilterComponent />

        <div className="categories-section">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="artisans-grid">
        {artisans.map((artisan) => (
          <div key={artisan.id} className="artisan-card">
            <div className="artisan-header">
              <div className="artisan-profile">
                <img src={artisan.profileImage || "/placeholder.svg"} alt={artisan.name} className="profile-image" />
                <div className="artisan-info">
                  <h3>{artisan.name}</h3>
                  <p>{artisan.title}</p>
                  <p className="location">{artisan.location}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(artisan.rating) ? "filled" : ""} />
                    ))}
                    <span className="reviews">({artisan.reviews})</span>
                  </div>
                </div>
                <button className="bookmark-btn" aria-label="Bookmark artisan">
                  <BookmarkIcon size={20} />
                </button>
              </div>
            </div>

            <div className="catalog-section">
              <h4>Catalog</h4>
              <div className="gallery">
                {artisan.gallery.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img src={image || "/placeholder.svg"} alt={`${artisan.name}'s work ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <button className="get-in-touch-btn">Get in touch</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-btn prev" onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeft size={20} />
        </button>
        <div className="pagination-numbers">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className="pagination-btn next" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="view-more-container">
        <button className="view-more-btn">View More Artisans</button>
      </div>

    </div>
  )
}

export default FindArtisanPage

