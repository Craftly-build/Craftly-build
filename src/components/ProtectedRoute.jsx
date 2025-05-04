"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "./Loading"

const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner fullPage />
  }

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredUserType && currentUser.userType !== requiredUserType) {
    // Redirect to home if user type doesn't match required type
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

