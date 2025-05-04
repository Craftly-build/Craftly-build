"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Minus, Plus, ArrowLeft, Save, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"
import LoadingSpinner from "../components/Loading"
import "../styles/Cart.css"

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, addToCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoError, setPromoError] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [updatingQuantity, setUpdatingQuantity] = useState({})
  const [savedForLater, setSavedForLater] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const navigate = useNavigate()

  // Delivery fee based on method
  const deliveryFee = deliveryMethod === "standard" ? 3000 : 5000
  const subTotal = getCartTotal()
  const tax = Math.round(subTotal * 0.075) // 7.5% VAT
  const total = subTotal + deliveryFee + tax - promoDiscount

  // Load saved items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("craftly-saved-items")
    if (savedItems) {
      setSavedForLater(JSON.parse(savedItems))
    }

    const viewedItems = localStorage.getItem("craftly-recently-viewed")
    if (viewedItems) {
      setRecentlyViewed(JSON.parse(viewedItems))
    }
  }, [])

  // Save items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("craftly-saved-items", JSON.stringify(savedForLater))
  }, [savedForLater])

  const handleQuantityChange = async (productId, newQuantity) => {
    const currentItem = cart.find((item) => item.id === productId)
    if (!currentItem) return
  
    if (newQuantity < 1 || newQuantity > 10 || newQuantity === currentItem.quantity) return
  
    const action = newQuantity > currentItem.quantity ? "increment" : "decrement"
  
    try {
      setUpdatingQuantity((prev) => ({ ...prev, [productId]: true }))
      await updateQuantity(productId, action)
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setUpdatingQuantity((prev) => ({ ...prev, [productId]: false }))
    }
  }
  
  const handleRemoveItem = async (productId) => {
    try {
      setLoading(true)
      await removeFromCart(productId)
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyPromo = (e) => {
    e.preventDefault()
    setPromoError("")

    // Valid promo codes (in a real app, this would be validated against a backend)
    const validPromoCodes = {
      WELCOME10: 0.1, // 10% off
      CRAFTLY20: 0.2, // 20% off
      FREESHIP: 0.05, // 5% off
    }

    if (promoCode.trim() === "") {
      setPromoError("Please enter a promo code")
      return
    }

    if (validPromoCodes[promoCode]) {
      const discount = Math.round(subTotal * validPromoCodes[promoCode])
      setPromoDiscount(discount)
      setPromoError("")
      setPromoCode("")
    } else {
      setPromoError("Invalid promo code")
      setPromoDiscount(0)
    }
  }

  const handleSaveForLater = (item) => {
    setSavedForLater((prev) => [...prev, item])
    removeFromCart(item.id)
  }

  const handleMoveToCart = (item, index) => {
    addToCart(item)
    setSavedForLater((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return

    setCheckoutLoading(true)

    // Simulate checkout process
    try {
      // In a real app, you would send the cart data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear cart after successful checkout
      clearCart()

      // Redirect to success page
      navigate("/checkout/success")
    } catch (error) {
      console.error("Checkout failed:", error)
    } finally {
      setCheckoutLoading(false)
    }
  }

  const getEstimatedDelivery = () => {
    const today = new Date()
    const deliveryDays = deliveryMethod === "standard" ? 5 : 2

    // Add delivery days to current date
    const deliveryDate = new Date(today)
    deliveryDate.setDate(today.getDate() + deliveryDays)

    // Format date
    return deliveryDate.toLocaleDateString("en-NG", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <p>Review your selected items before checkout</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={64} className="empty-cart-icon" />
                <p>Your cart is empty</p>
                <p className="empty-cart-message">Add items to your cart to see them here</p>
                <button className="continue-shopping-btn" onClick={() => navigate("/products")}>
                  <ArrowLeft size={16} />
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>{item.description || "Lorem ipsum is simply dummy text of the printing and type more"}</p>
                      <div className="item-actions">
                        <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                          <Trash2 size={14} />
                          Remove
                        </button>
                        <button className="save-btn" onClick={() => handleSaveForLater(item)}>
                          <Save size={14} />
                          Save for later
                        </button>
                      </div>
                    </div>
                    <div className="item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updatingQuantity[item.id]}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">
                        {updatingQuantity[item.id] ? <LoadingSpinner size="small" /> : item.quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={updatingQuantity[item.id] || item.quantity >= 10}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="item-price">₦{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}

                <div className="cart-actions">
                  <div className="promo-code">
                    <h3>Have a promo code?</h3>
                    <form onSubmit={handleApplyPromo} className="promo-form">
                      <input
                        type="text"
                        placeholder="Enter Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button type="submit" className="apply-btn">
                        Apply
                      </button>
                    </form>
                    {promoError && <p className="promo-error">{promoError}</p>}
                    {promoDiscount > 0 && (
                      <p className="promo-success">Promo code applied! You saved ₦{promoDiscount.toLocaleString()}</p>
                    )}
                  </div>

                  <div className="delivery-method">
                    <h3>Delivery Method</h3>
                    <div className="delivery-options">
                      <label className="delivery-option">
                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          checked={deliveryMethod === "standard"}
                          onChange={() => setDeliveryMethod("standard")}
                        />
                        <span className="radio-custom"></span>
                        <div className="delivery-info">
                          <span>Standard Delivery</span>
                          <span className="delivery-estimate">Estimated delivery: {getEstimatedDelivery()}</span>
                        </div>
                      </label>
                      <label className="delivery-option">
                        <input
                          type="radio"
                          name="delivery"
                          value="express"
                          checked={deliveryMethod === "express"}
                          onChange={() => setDeliveryMethod("express")}
                        />
                        <span className="radio-custom"></span>
                        <div className="delivery-info">
                          <span>Express Delivery</span>
                          <span className="delivery-estimate">Estimated delivery: {getEstimatedDelivery()}</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Sub Total</span>
                <span>₦{subTotal.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>VAT (7.5%)</span>
                <span>₦{tax.toLocaleString()}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="summary-item discount">
                  <span>Discount</span>
                  <span>-₦{promoDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-total">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <button className="continue-shopping-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} />
              Continue Shopping
            </button>
            <button className="checkout-btn" onClick={handleCheckout} disabled={checkoutLoading}>
              {checkoutLoading ? <LoadingSpinner size="small" /> : "Proceed to Checkout"}
            </button>
          </div>
        )}

        {/* Saved for Later Section */}
        {savedForLater.length > 0 && (
          <div className="saved-for-later">
            <h3>Saved for Later ({savedForLater.length})</h3>
            <div className="saved-items">
              {savedForLater.map((item, index) => (
                <div className="saved-item" key={index}>
                  <div className="saved-item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="saved-item-details">
                    <h4>{item.name}</h4>
                    <p className="saved-item-price">₦{item.price.toLocaleString()}</p>
                    <button className="move-to-cart-btn" onClick={() => handleMoveToCart(item, index)}>
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div className="recently-viewed">
            <h3>Recently Viewed</h3>
            <div className="recently-viewed-items">
              {recentlyViewed.slice(0, 4).map((item, index) => (
                <div className="recently-viewed-item" key={index}>
                  <Link to={`/product/${item.id}`} state={{ product: item }}>
                    <div className="recently-viewed-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                    <div className="recently-viewed-details">
                      <h4>{item.name}</h4>
                      <p className="recently-viewed-price">₦{item.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
