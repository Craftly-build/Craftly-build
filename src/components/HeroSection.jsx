import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero.css';
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
              <button className="btn primary-btn"> <Link to="/Shop Now">Shop Now</Link></button>
              <button className="btn secondary-btn"><Link to="/Shop Now">Sell on craftly</Link></button>
            </div>
          </div>
          <div className="hero-images">
            <div className= "image-blob-1">
             <img src={i3} alt="Handcrafted item" /> 
            </div>
            <div className="image-blob image-blob-2">
              <img src= {i4} alt="Artisan at work" />
            </div>
            <div className="image-blob image-blob-3">
              <img src= {i5} alt="Craftsperson" />
            </div>
          </div>
          </div>

      </section>
    );
  };
  
  export default HeroSection;