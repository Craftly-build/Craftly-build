"use client"

import { useState } from "react"
import { User } from "lucide-react"
import "../styles/BuyerProfile.css"

const BuyerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    detailedAddress: "",
    phone: "",
    email: "",
    password: "",
    marketingPreference: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMarketingPreference = (preference) => {
    setFormData((prev) => ({
      ...prev,
      marketingPreference: preference,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="buyer-profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-header">
          <h1>Complete Your Profile</h1>
          <p className="form-subtitle">Please fill in your information to complete your buyer account</p>
        </div>

        <div className="form-content">
          <div className="profile-photo-section">
            <div className="photo-placeholder">
              <User size={40} strokeWidth={1} />
            </div>
            <span className="upload-text">Upload photo</span>
          </div>

          <section className="form-section">
            <h2>Personal Information</h2>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="firstName">Full name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName" className="sr-only">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Location</h2>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Select country"
                />
              </div>
              <div className="input-group">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                />
              </div>
            </div>
            <div className="input-group full-width">
              <label htmlFor="detailedAddress">Detailed address</label>
              <textarea
                id="detailedAddress"
                name="detailedAddress"
                value={formData.detailedAddress}
                onChange={handleInputChange}
                placeholder="Enter your detailed address"
              />
            </div>
          </section>

          <section className="form-section">
            <h2>Contact Information</h2>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Marketing Preference</h2>
            <p className="preference-question">Would you like to receive updates?</p>
            <div className="preference-buttons">
              <button
                type="button"
                className={`preference-btn ${formData.marketingPreference === true ? "active" : ""}`}
                onClick={() => handleMarketingPreference(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`preference-btn ${formData.marketingPreference === false ? "active" : ""}`}
                onClick={() => handleMarketingPreference(false)}
              >
                No
              </button>
            </div>
          </section>

          <section className="form-section">
            <h2>Account Security</h2>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
              />
            </div>
          </section>
        </div>

        <button type="submit" className="submit-btn">
          Complete Profile
        </button>
      </form>
    </div>
  )
}

export default BuyerProfile
