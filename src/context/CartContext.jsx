"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (err) {
      console.error("Error loading cart from localStorage:", err)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart))
    } catch (err) {
      console.error("Error saving cart to localStorage:", err)
    }
  }, [cart])

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, you would call your API here
      // For example: await axios.post('/api/cart', { productId: product.id, quantity });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCart((prevCart) => {
        // Check if product already exists in cart
        const existingItemIndex = prevCart.findIndex((item) => item.id === product.id)

        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          const updatedCart = [...prevCart]
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity,
          }
          return updatedCart
        } else {
          // Add new item to cart
          return [...prevCart, { ...product, quantity }]
        }
      })

      return { success: true }
    } catch (err) {
      console.error("Add to cart error:", err)
      setError(err.message || "Failed to add to cart")
      return { success: false, error: err.message || "Failed to add to cart" }
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate cart totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
