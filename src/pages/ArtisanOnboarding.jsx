"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/ArtisanOnboarding.css"

const ArtisanOnboarding = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [step, setStep] = useState(1)

  // If user is already logged in and is an artisan, redirect to dashboard
  React.useEffect(() => {
    if (currentUser && currentUser.userType === "artisan") {
      navigate("/manage-services")
    }
  }, [currentUser, navigate])

  const handleGetStarted = () => {
    if (currentUser) {
      // If user is logged in but not an artisan, update their account type
      // This would typically involve an API call to update the user's role
      navigate("/artisan-verification")
    } else {
      // If not logged in, go to step 2 (sign up form)
      setStep(2)
    }
  }

  const handleSignUpRedirect = () => {
    // Redirect to sign up page with artisan type parameter
    navigate("/register?type=artisan")
  }

  return (
    <div className="artisan-onboarding-container">
      {step === 1 ? (
        <div className="onboarding-welcome">
          <h1>Become a Craftly Seller</h1>
          <div className="onboarding-benefits">
            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3>Reach More Customers</h3>
              <p>Showcase your crafts to thousands of potential buyers across Nigeria.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Earn More</h3>
              <p>Set your own prices and receive payments directly to your account.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🛠️</div>
              <h3>Easy to Manage</h3>
              <p>Simple tools to list products, manage orders, and grow your business.</p>
            </div>
          </div>

          <div className="onboarding-steps">
            <h2>How It Works</h2>
            <ol className="steps-list">
              <li>
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Create your seller account</h4>
                  <p>Sign up and complete your profile with your craft specialties</p>
                </div>
              </li>
              <li>
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Verify your identity</h4>
                  <p>Complete the verification process to build trust with buyers</p>
                </div>
              </li>
              <li>
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>List your products or services</h4>
                  <p>Upload photos and details of what you offer</p>
                </div>
              </li>
              <li>
                <span className="step-number">4</span>
                <div className="step-content">
                  <h4>Start selling</h4>
                  <p>Receive orders and grow your craft business</p>
                </div>
              </li>
            </ol>
          </div>

          <button onClick={handleGetStarted} className="btn primary-btn get-started-btn">
            Get Started
          </button>
        </div>
      ) : (
        <div className="onboarding-signup">
          <h2>Create Your Seller Account</h2>
          <p>Join our community of skilled artisans and start selling your crafts today.</p>

          <div className="signup-options">
            <button onClick={handleSignUpRedirect} className="btn primary-btn">
              Sign Up as a Seller
            </button>
            <div className="login-option">
              <p>Already have an account?</p>
              <Link to="/login?redirect=artisan-verification" className="login-link">
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="seller-testimonials">
        <h3>What Our Sellers Say</h3>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>
              "Joining Craftly doubled my monthly sales and connected me with customers I never would have reached
              otherwise."
            </p>
            <div className="testimonial-author">- Amina O., Leather Artisan</div>
          </div>
          <div className="testimonial">
            <p>
              "The platform is so easy to use. I can manage my products, track orders, and communicate with customers
              all in one place."
            </p>
            <div className="testimonial-author">- Tunde K., Woodworker</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtisanOnboarding
