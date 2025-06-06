import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import LazyImage from "./LazyImage"
import "../styles/home.css"

const FeaturedArtisans = ({ artisans }) => {
  return (
    <section className="featured-creators-section">
      <div className="containerr">
        <h2 className="section-title">Meet the Artisans</h2>
        <div className="creators-grid">
          {artisans.map((creator) => (
            <div className="creator-card" key={creator.id}>
              <div className="creator-image">
                <LazyImage src={creator.image || "/placeholder.svg"} alt={creator.name} />
              </div>
              <div className="creator-info">
                <h3>{creator.name}</h3>
                <p>{creator.specialty}</p>
                <div className="rating">
                  <div className="stars" aria-label={`Rating: ${creator.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`star ${i < creator.rating ? "filled" : ""}`}
                        size={16}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="review-count">({creator.reviews})</span>
                </div>
                <p className="bio">{creator.bio}</p>
                <Link to={`/creators/${creator.id}`} className="creator-btn">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedArtisans

