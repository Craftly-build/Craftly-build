"use client"

import React from "react"
import { Link } from "react-router-dom"
import "../styles/ErrorBoundary.css"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: "generic", // Can be 'generic', 'network', 'auth', etc.
    }
  }

  static getDerivedStateFromError(error) {
    // Categorize the error if possible
    let errorType = "generic"

    if (error.message && error.message.includes("network")) {
      errorType = "network"
    } else if (error.message && error.message.includes("auth")) {
      errorType = "auth"
    }

    return {
      hasError: true,
      errorType,
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })

    // Log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo)

    // You could send this to a service like Sentry
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error, errorInfo);
    // }
  }

  render() {
    if (this.state.hasError) {
      // Render different UI based on error type
      const { errorType, error } = this.state

      let title = "Oops! Something went wrong"
      let message = "We're sorry for the inconvenience. Please try again later."

      if (errorType === "network") {
        title = "Network Error"
        message = "Unable to connect to our servers. Please check your internet connection and try again."
      } else if (errorType === "auth") {
        title = "Authentication Error"
        message = "There was a problem with your authentication. Please try logging in again."
      }

      return (
        <div className="error-boundary" role="alert">
          <div className="error-content">
            <div className="error-icon" aria-hidden="true">
              ⚠️
            </div>
            <h1>{title}</h1>
            <p>{message}</p>
            {error && (
              <div className="error-details">
                <p className="error-message">{error.toString()}</p>
                <details>
                  <summary>Technical Details</summary>
                  <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </details>
              </div>
            )}
            <div className="error-actions">
              <button onClick={() => window.location.reload()} className="retry-btn">
                Retry
              </button>
              <Link to="/" className="home-btn">
                Go to Homepage
              </Link>
              {errorType === "auth" && (
                <Link to="/login" className="login-btn">
                  Log In Again
                </Link>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

