import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import LazyImage from "./LazyImage";
import "../styles/featuredCategories.css";
import LoadingSpinner from "./Loading";

const FeaturedCategories = () => {
  const { categories, fetchCategories, loading } = useProducts();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="featured-categories-section">
      <div className="containerr">
        <h2 className="section-title">Featured Categories</h2>
        <div className="categories-grid">
          {loading && <LoadingSpinner/>}
          {!loading && categories.length === 0 && <p>No categories found.</p>}
          {categories.map((category) => (
            <Link
              to={`/categories/${category.slug || category._id}`}
              key={category._id}
              className="category-card"
              aria-label={`Browse ${category.name} category`}
            >
              <div className="category-image">
                <LazyImage
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                />
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
