"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  BarChart2,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  Star,
  AlertCircle,
} from "lucide-react"
import "../styles/ManageServices.css"

const ManageServices = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("active")
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    availability: [],
  })

  // Redirect if not logged in or not an artisan
  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/manage-services" } })
    } else if (currentUser.userType !== "artisan") {
      navigate("/")
    } else {
      // Fetch services (mock data for demo)
      setTimeout(() => {
        setServices([
          {
            id: 1,
            title: "Custom Leather Bag Making",
            category: "Leatherwork",
            description: "Handcrafted leather bags made to your specifications",
            price: 25000,
            status: "active",
            rating: 4.8,
            reviews: 12,
            orders: 18,
            earnings: 450000,
            availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 2,
            title: "Ankara Fabric Clothing",
            category: "Fashion",
            description: "Custom clothing made with authentic Ankara fabric",
            price: 15000,
            status: "active",
            rating: 4.5,
            reviews: 8,
            orders: 10,
            earnings: 150000,
            availability: ["Mon", "Wed", "Fri"],
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 3,
            title: "Beaded Jewelry Making",
            category: "Jewelry",
            description: "Handmade beaded jewelry for all occasions",
            price: 8000,
            status: "draft",
            rating: 0,
            reviews: 0,
            orders: 0,
            earnings: 0,
            availability: ["Sat", "Sun"],
            image: "/placeholder.svg?height=100&width=100",
          },
        ])
        setLoading(false)
      }, 1000)
    }
  }, [currentUser, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setServiceForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvailabilityChange = (day) => {
    setServiceForm((prev) => {
      const newAvailability = [...prev.availability]
      if (newAvailability.includes(day)) {
        return {
          ...prev,
          availability: newAvailability.filter((d) => d !== day),
        }
      } else {
        return {
          ...prev,
          availability: [...newAvailability, day],
        }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log("Service form submitted:", serviceForm)

    // Add the new service to the list (mock implementation)
    const newService = {
      id: services.length + 1,
      ...serviceForm,
      price: Number.parseFloat(serviceForm.price),
      status: "draft",
      rating: 0,
      reviews: 0,
      orders: 0,
      earnings: 0,
      image: "/placeholder.svg?height=100&width=100",
    }

    setServices([...services, newService])
    setShowServiceModal(false)
    setServiceForm({
      title: "",
      category: "",
      description: "",
      price: "",
      duration: "",
      availability: [],
    })
  }

  const deleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== id))
    }
  }

  const toggleServiceStatus = (id) => {
    setServices(
      services.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            status: service.status === "active" ? "inactive" : "active",
          }
        }
        return service
      }),
    )
  }

  const filteredServices = services.filter((service) => {
    if (activeTab === "all") return true
    return service.status === activeTab
  })

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your services...</p>
      </div>
    )
  }

  return (
    <div className="manage-services-container">
      <div className="services-header">
        <h1>Manage Your Services</h1>
        <p>Create, edit, and manage the services you offer to customers</p>
        <button className="add-service-btn" onClick={() => setShowServiceModal(true)}>
          <PlusCircle size={16} />
          Add New Service
        </button>
      </div>

      <div className="services-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Services</h3>
            <p className="stat-value">{services.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Earnings</h3>
            <p className="stat-value">
              ₦{services.reduce((total, service) => total + service.earnings, 0).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Reviews</h3>
            <p className="stat-value">{services.reduce((total, service) => total + service.reviews, 0)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <h3>Average Rating</h3>
            <p className="stat-value">
              {services.length > 0
                ? (services.reduce((total, service) => total + service.rating, 0) / services.length).toFixed(1)
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="services-tabs">
        <button className={`tab-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
          All Services
        </button>
        <button className={`tab-btn ${activeTab === "active" ? "active" : ""}`} onClick={() => setActiveTab("active")}>
          Active
        </button>
        <button className={`tab-btn ${activeTab === "draft" ? "active" : ""}`} onClick={() => setActiveTab("draft")}>
          Drafts
        </button>
        <button
          className={`tab-btn ${activeTab === "inactive" ? "active" : ""}`}
          onClick={() => setActiveTab("inactive")}
        >
          Inactive
        </button>
      </div>

      <div className="services-list">
        {filteredServices.length === 0 ? (
          <div className="no-services">
            <AlertCircle size={48} />
            <h3>No services found</h3>
            <p>You don't have any {activeTab !== "all" ? activeTab : ""} services yet.</p>
            <button className="add-service-btn" onClick={() => setShowServiceModal(true)}>
              <PlusCircle size={16} />
              Add New Service
            </button>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className={`service-card ${service.status}`}>
              <div className="service-image">
                <img src={service.image || "/placeholder.svg"} alt={service.title} />
              </div>
              <div className="service-details">
                <h3>{service.title}</h3>
                <p className="service-category">{service.category}</p>
                <p className="service-description">{service.description}</p>
                <div className="service-meta">
                  <span className="service-price">₦{service.price.toLocaleString()}</span>
                  {service.status === "active" && (
                    <span className="service-rating">
                      <Star size={14} className="star-icon" />
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  )}
                </div>
              </div>
              <div className="service-stats">
                <div className="service-stat">
                  <Calendar size={16} />
                  <span>Available: {service.availability.join(", ")}</span>
                </div>
                <div className="service-stat">
                  <Clock size={16} />
                  <span>Duration: {service.duration || "Not specified"}</span>
                </div>
                <div className="service-stat">
                  <MessageSquare size={16} />
                  <span>Orders: {service.orders}</span>
                </div>
              </div>
              <div className="service-actions">
                <button className="action-btn view-btn" title="View Service">
                  <Eye size={16} />
                </button>
                <button className="action-btn edit-btn" title="Edit Service">
                  <Edit size={16} />
                </button>
                <button
                  className="action-btn toggle-btn"
                  title={service.status === "active" ? "Deactivate" : "Activate"}
                  onClick={() => toggleServiceStatus(service.id)}
                >
                  {service.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="action-btn delete-btn"
                  title="Delete Service"
                  onClick={() => deleteService(service.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showServiceModal && (
        <div className="service-modal-overlay">
          <div className="service-modal">
            <div className="modal-header">
              <h2>Add New Service</h2>
              <button className="close-modal" onClick={() => setShowServiceModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Service Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={serviceForm.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={serviceForm.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Leatherwork">Leatherwork</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Woodwork">Woodwork</option>
                  <option value="Art">Art</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={serviceForm.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (₦) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={serviceForm.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    placeholder="e.g. 2-3 days"
                    value={serviceForm.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Availability</label>
                <div className="availability-options">
                  {days.map((day) => (
                    <label key={day} className="day-option">
                      <input
                        type="checkbox"
                        checked={serviceForm.availability.includes(day)}
                        onChange={() => handleAvailabilityChange(day)}
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowServiceModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageServices
