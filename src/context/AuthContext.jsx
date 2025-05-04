"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the auth context
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoggedIn = () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn")
        const userType = localStorage.getItem("userType")

        if (isLoggedIn === "true") {
          // In a real app, you would validate the token with your backend
          setCurrentUser({
            userType,
            // Add other user details you might store
          })
        }
      } catch (err) {
        console.error("Error checking authentication:", err)
        setError("Authentication check failed")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Login function
  const login = async (email, password, userType) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, you would call your API here
      // For demo purposes, we'll simulate a successful login
      console.log("Logging in with:", { userType, email, password })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store auth data
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", userType)

      setCurrentUser({
        email,
        userType,
        isVerified: userType === "artisan" ? false : true, // Artisans start unverified
        // Add other user details you might get from your API
      })

      return { success: true }
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "Login failed")
      return { success: false, error: err.message || "Login failed" }
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (name, email, password, userType) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, you would call your API here
      // For demo purposes, we'll simulate a successful registration
      console.log("Registering with:", { name, email, password, userType })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store auth data
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", userType)

      setCurrentUser({
        name,
        email,
        userType,
        isVerified: userType === "artisan" ? false : true, // Artisans start unverified
        // Add other user details you might get from your API
      })

      return { success: true }
    } catch (err) {
      console.error("Registration error:", err)
      setError(err.message || "Registration failed")
      return { success: false, error: err.message || "Registration failed" }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
