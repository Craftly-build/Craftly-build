"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/UnverifiedArtisanDashboard.css"

const UnverifiedArtisanDashboard = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is not logged in or not an artisan, redirect to login
    if (!currentUser) {
      navigate("/login?redirect=unverified-artisan-dashboard")
    } else if (currentUser.isVerified) {
      // If artisan is already verified, redirect to main dashboard
      navigate("/manage-services")
    }
  }, [currentUser, navigate])

  if (!currentUser) {
    return <div className="loading-container">Loading...</div>
  }

  return (
    <div className="unverified-dashboard-container">
      <div className="verification-banner">
        <div className="banner-content">
          <h2>Complete Your Verification</h2>
          <p>
            To start selling on Craftly, you need to complete the verification process. This helps build trust with
            buyers and ensures the quality of our marketplace.
          </p>
          <Link to="/artisan-verification" className="btn primary-btn">
            Start Verification
          </Link>
        </div>
      </div>

      <div className="dashboard-welcome">
        <h1>Welcome to Your Seller Dashboard</h1>
        <p>You're almost ready to start selling! Complete the verification process to unlock all seller features.</p>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section locked">
          <h3>
            <span className="lock-icon">🔒</span> Products & Services
          </h3>
          <p>Add and manage your products or services after verification.</p>
        </div>

        <div className="dashboard-section locked">
          <h3>
            <span className="lock-icon">🔒</span> Orders
          </h3>
          <p>View and manage customer orders after verification.</p>
        </div>

        <div className="dashboard-section locked">
          <h3>
            <span className="lock-icon">🔒</span> Analytics
          </h3>
          <p>Track your sales performance after verification.</p>
        </div>

        <div className="dashboard-section">
          <h3>Your Profile</h3>
          <p>Complete your seller profile information.</p>
          <Link to="/profile" className="section-link">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="verification-steps">
        <h2>Verification Process</h2>
        <ol className="steps-list">
          <li>
            <div className="step-content">
              <h4>Identity Verification</h4>
              <p>Upload a valid government-issued ID</p>
            </div>
          </li>
          <li>
            <div className="step-content">
              <h4>Business Information</h4>
              <p>Provide details about your craft business</p>
            </div>
          </li>
          <li>
            <div className="step-content">
              <h4>Skills Assessment</h4>
              <p>Upload photos of your work and describe your expertise</p>
            </div>
          </li>
          <li>
            <div className="step-content">
              <h4>Review Process</h4>
              <p>Our team will review your application within 2-3 business days</p>
            </div>
          </li>
        </ol>

        <div className="verification-cta">
          <Link to="/artisan-verification" className="btn primary-btn">
            Begin Verification
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnverifiedArtisanDashboard
