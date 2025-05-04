import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';
import m1 from "../assets/m1.png";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      category: "Business",
      title: "How Less Goes Big: Brand Focus Search",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "January 24, 2024",
      image: m1,
      readTime: "5 min read",
      author: "John Doe"
    },
    {
      id: 2,
      category: "Business",
      title: "I did it More Than Pretty Things: To Focus and Purpose",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "January 22, 2024",
      image: m1,
      readTime: "4 min read",
      author: "Jane Smith"
    },
    {
      id: 3,
      category: "Culture",
      title: "Service at Life: Mindset Culture into Everyone",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "January 20, 2024",
      image: m1,
      readTime: "6 min read",
      author: "Mike Johnson"
    },
    {
      id: 4,
      category: "Business",
      title: "Made to Measure: We Tailor Living Address a Modern Team",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "January 18, 2024",
      image: m1,
      readTime: "3 min read",
      author: "Sarah Wilson"
    },
    {
      id: 5,
      category: "Culture",
      title: "Healing Hands, Growing Lives",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "January 16, 2024",
      image: m1,
      readTime: "7 min read",
      author: "David Brown"
    },
    {
      id: 6,
      category: "Business",
      title: "Things Every New Artisan Should Know",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "January 14, 2024",
      image: m1,
      readTime: "5 min read",
      author: "Emma Davis"
    }
  ];

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleShareStory = () => {
    // In a real app, this would open a form or modal for story submission
    console.log('Share story clicked');
  };

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>From the Craftly Journal</h1>
        <p>Stories and insights from the Craftly community, curated by our team.</p>
        
        <div className="blog-filters">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="blog-search"
          />
          
          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category}
                className={`blog-category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="blog-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-content">
                <div className="blog-text">
                  <span className="blog-category">{post.category}</span>
                  <Link to={`/blog/${post.id}`} className="blog-title-link">
                    <h2 className="blog-title">{post.title}</h2>
                  </Link>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-dot">•</span>
                    <span className="blog-read-time">{post.readTime}</span>
                    <span className="blog-dot">•</span>
                    <span className="blog-author">By {post.author}</span>
                  </div>
                </div>
                <div className="blog-image">
                  <Link to={`/blog/${post.id}`}>
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="no-results">
            <p>No articles found matching your search criteria.</p>
          </div>
        )}
      </div>

      <div className="blog-footer">
        <h3>Want to share your story?</h3>
        <p>Share your Craftly experience with the community</p>
        <button className="share-story-btn" onClick={handleShareStory}>
          Share Your Story
        </button>
      </div>
    </div>
  );
};

export default BlogPage;