import { Link } from "react-router-dom"
import LazyImage from "./LazyImage"
import "../styles/hero.css"
import i3 from "../assets/i3.png"
import i4 from "../assets/i4.png"
import i5 from "../assets/i5.png"

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Discover and Shop Handmade Creations</h1>
          <p>A market place connecting you to skilled artisans offering handcrafted products and Services</p>
          <div className="hero-buttons">
            <Link to="/explore" className="btn primary-btn">
              Shop Now
            </Link>
            <Link to="/artisan-onboarding" className="btn secondary-btn">
              Sell on craftly
            </Link>
          </div>
        </div>
        <div className="hero-images" aria-hidden="true">
          <div className="image-blob-1">
            <LazyImage src={i3} alt="Handcrafted item" />
          </div>
          <div className="image-blob image-blob-2">
            <LazyImage src={i4} alt="Artisan at work" />
          </div>
          <div className="image-blob image-blob-3">
            <LazyImage src={i5} alt="Craftsperson" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
