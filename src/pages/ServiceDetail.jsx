"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "../styles/DetailPage.css"
import eyeicon from "../assets/eyeicon.png"
import PayLogos from "../components/PayLogos"

const ServiceDetail = () => {
  const location = useLocation()
  const service = location.state?.product || {
    name: "Professional Auto Repair & Maintenance",
    price: "Available on Request",
    artisan: "Johnson Udo",
    rating: 4.8,
    reviewCount: 28,
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    details: ["Oil Changes", "Tire Changes", "Brake Repairs", "Engine Diagnostics"],
    availableDays: "Monday - Saturday",
    description:
      "Professional auto repair and maintenance services. We offer comprehensive care for your vehicle with quality parts and experienced technicians.",
  }

  const [views, setViews] = useState(0)
  const [selectedImage, setSelectedImage] = useState(service.image)
  const [relatedServices, setRelatedServices] = useState([])

  useEffect(() => {
    const serviceViews = Math.floor(Math.random() * 50)
    setViews(serviceViews)

    // Mock related services
    setRelatedServices([
      {
        id: 1,
        name: "Tire Replacement & Wheel Alignment",
        price: "From N15,000",
        rating: 4.7,
        reviewCount: 33,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 2,
        name: "Engine Diagnostic & Repair",
        price: "From N25,000",
        rating: 4.5,
        reviewCount: 27,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 3,
        name: "Bicycle Repair & Maintenance",
        price: "From N8,000",
        rating: 4.6,
        reviewCount: 31,
        image: "/placeholder.svg?height=200&width=200",
      },
    ])
  }, [])

  const handleThumbnailClick = (image) => {
    setSelectedImage(image)
  }

  if (!service) {
    return <p>No service found</p>
  }

  return (
    <div className="service-detail-page">
      <div className="service-detail-container">
        {/* Viewing info */}
        <div className="viewing-info">
          <div className="currently-viewed">
            <img src={eyeicon || "/placeholder.svg"} alt="Eye Icon" />
            <p>{views} people have booked this service recently</p>
          </div>
          <div className="service-rating">
            <div className="star-icon">★</div>
            <p>
              {service.rating} ({service.reviewCount} Reviews)
            </p>
          </div>
        </div>

        {/* Main service section */}
        <div className="service-main-section">
          {/* Left: Images */}
          <div className="service-images">
            <div className="main-image">
              <img src={selectedImage || service.image} alt={service.name} />
            </div>
            <div className="thumbnail-gallery">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                className={selectedImage === service.image ? "active" : ""}
                onClick={() => handleThumbnailClick(service.image)}
              />
              {service.gallery &&
                service.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`${service.name} view ${index + 1}`}
                    className={selectedImage === img ? "active" : ""}
                    onClick={() => handleThumbnailClick(img)}
                  />
                ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="service-details">
            <h1 className="service-title">{service.name}</h1>
            <p className="service-price">Price Available on Request</p>
            <p className="service-seller">
              Sold by: <span>{service.artisan}</span>
            </p>

            <div className="service-specs">
              <h3>Service Details</h3>
              <ul>
                <li className="includes-header">Includes:</li>
                {service.details &&
                  service.details.map((detail, index) => (
                    <li key={index} className="service-detail-item">
                      {detail}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="service-availability">
              <h3>Service Available:</h3>
              <p>{service.availableDays}</p>
            </div>

            <div className="service-rating-detail">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(service.rating) ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-count">({service.reviewCount})</span>
            </div>

            <p className="service-description">{service.description}</p>

            <div className="service-actions">
              <button className="request-service-btn">Request Service</button>
              <button className="chat-with-provider-btn">Chat With Provider</button>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like section */}
      <div className="related-services-section">
        <h2>YOU MAY ALSO LIKE</h2>
        <div className="related-services">
          {relatedServices.map((item) => (
            <div key={item.id} className="related-service-card">
              <div className="related-service-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                <button className="wishlist-btn">♡</button>
              </div>
              <div className="related-service-info">
                <h3>{item.name}</h3>
                <p className="related-service-price">{item.price}</p>
                <div className="related-service-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(item.rating) ? "star filled" : "star"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-count">({item.reviewCount})</span>
                </div>
                <button className="request-service-small">REQUEST SERVICE</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PayLogos />
    </div>
  )
}

export default ServiceDetail
