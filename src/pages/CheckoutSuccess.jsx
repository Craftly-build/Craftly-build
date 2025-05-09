"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckCircle, ShoppingBag, Home } from "lucide-react"
import "../styles/CheckoutSuccess.css"

const CheckoutSuccess = () => {
  const navigate = useNavigate()
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

  // Redirect if accessed directly without checkout
  useEffect(() => {
    const hasCompletedCheckout = sessionStorage.getItem("checkout-completed")
    if (!hasCompletedCheckout) {
      navigate("/cart")
    } else {
      // Set checkout completed in session storage
      sessionStorage.removeItem("checkout-completed")
    }
  }, [navigate])

  return (
    <div className="checkout-success">
      <div className="success-container">
        <div className="success-icon">
          <CheckCircle size={64} />
        </div>
        <h1>Order Successful!</h1>
        <p className="order-number">Order #{orderNumber}</p>
        <p className="success-message">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="order-details">
          <h3>Order Details</h3>
          <div className="detail-row">
            <span>Order Date:</span>
            <span>
              {new Date().toLocaleDateString("en-NG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="detail-row">
            <span>Payment Method:</span>
            <span>Credit Card</span>
          </div>
          <div className="detail-row">
            <span>Estimated Delivery:</span>
            <span>
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-NG", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/profile" className="view-order-btn">
            View Order
          </Link>
          <Link to="/" className="home-btn">
            <Home size={16} />
            Return to Home
          </Link>
          <Link to="/products" className="continue-shopping-btn">
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
