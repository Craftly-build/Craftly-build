"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { useCart } from "../context/CartContext"
import LoadingSpinner from "../components/Loading"
import "../styles/Cart.css"

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [updatingQuantity, setUpdatingQuantity] = useState({})

  const deliveryFee = deliveryMethod === "standard" ? 3000 : 5000
  const subTotal = getCartTotal()
  const total = subTotal + deliveryFee

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      setUpdatingQuantity((prev) => ({ ...prev, [productId]: true }))
      await updateQuantity(productId, newQuantity)
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
    // In a real app, you would validate the promo code with your backend
    console.log("Applying promo code:", promoCode)
    // For now, just clear the input
    setPromoCode("")
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
                <p>Your cart is empty</p>
                <button className="continue-shopping-btn" onClick={() => window.history.back()}>
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
                      <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                        Remove
                      </button>
                    </div>
                    <div className="item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updatingQuantity[item.id]}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">
                        {updatingQuantity[item.id] ? <LoadingSpinner size="small" /> : item.quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={updatingQuantity[item.id]}
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
                        <span>Standard</span>
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
                        <span>Express</span>
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
              <div className="summary-total">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <button className="continue-shopping-btn" onClick={() => window.history.back()}>
              Continue Shopping
            </button>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
