import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/featuredCategories.css';
import i3 from "../assets/fc1.png";
import i4 from "../assets/fc2.png";
import i5 from "../assets/fc3.png";
import i6 from "../assets/fc4.png";
import i7 from "../assets/fc5.png";

const featuredCategories = [
  {
    id: 1,
    name: 'Clothing and Fashion',
    image: i3,
    link: '/categories/clothing-fashion'
  },
  {
    id: 2,
    name: 'Jewelry & Accessories',
    image: i4,
    link: '/categories/jewelry-accessories'
  },
  {
    id: 3,
    name: 'Bags & Leather Works',
    image: i5,
    link: '/categories/bags-leather'
  },
  {
    id: 4,
    name: 'Beauty & Wellness',
    image: i6,
    link: '/categories/beauty-wellness'
  },
  {
    id: 5,
    name: 'Home & Decor',
    image:i7,
    link: '/categories/home-decor'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="featured-categories-section">
      <div className="containerr">
        <h2 className="section-title">Featured Categories</h2>
        <div className="categories-grid">
          {featuredCategories.map(category => (
            <Link 
              to={category.link} 
              key={category.id} 
              className="category-card"
            >
              <div className="category-image">
                <img src={category.image || "/placeholder.svg"} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;