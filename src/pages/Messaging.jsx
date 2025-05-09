"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip } from "lucide-react"
import "../styles/Messaging.css"
import userAvatar from "../assets/a1.png"
import sellerAvatar from "../assets/b2.png"

const MessagingPage = () => {
  const [message, setMessage] = useState("")
  const [showOrderSummary, setShowOrderSummary] = useState(true)
  const messagesEndRef = useRef(null)

  // Sample conversation data
  const conversation = [
    {
      id: 1,
      sender: "buyer",
      text: "Hi! I wanted to know more about the product you have in stock?",
      time: "10:30 AM",
      avatar: userAvatar,
    },
    {
      id: 2,
      sender: "seller",
      text: "Hello! Which item would you like to know more about?",
      time: "10:32 AM",
      avatar: sellerAvatar,
    },
    {
      id: 3,
      sender: "buyer",
      text: "I'm interested in the handcrafted wooden bowl",
      time: "10:33 AM",
      avatar: userAvatar,
    },
    {
      id: 4,
      sender: "seller",
      text: "I'd love to help you with that! The wooden bowl is handcrafted from premium quality wood.",
      time: "10:35 AM",
      avatar: sellerAvatar,
      image: {
        src: "/placeholder.svg?height=150&width=200",
        alt: "Wooden bowl product",
      },
    },
    {
      id: 5,
      sender: "buyer",
      text: "That's perfect! What's the price?",
      time: "10:40 AM",
      avatar: userAvatar,
    },
    {
      id: 6,
      sender: "seller",
      text: "The price is ₦15,000",
      time: "10:42 AM",
      avatar: sellerAvatar,
    },
    {
      id: 7,
      sender: "buyer",
      text: "Can I please see the finished product?",
      time: "10:45 AM",
      avatar: userAvatar,
    },
    {
      id: 8,
      sender: "seller",
      text: "I'll send it right away! Here's how it looks finished. It has a smooth finish.",
      time: "10:47 AM",
      avatar: sellerAvatar,
      image: {
        src: "/placeholder.svg?height=150&width=200",
        alt: "Finished wooden bowl",
      },
    },
    {
      id: 9,
      sender: "buyer",
      text: "Perfect! I would like to order it.",
      time: "10:50 AM",
      avatar: userAvatar,
    },
  ]

  // Order summary data
  const orderSummary = {
    items: [
      {
        name: "Handcrafted Wooden Bowl",
        quantity: 1,
        price: 15000,
      },
    ],
    subtotal: 15000,
    shipping: 2500,
    tax: 1125,
    total: 18625,
  }

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() === "") return

    // In a real app, you would send this message to your backend
    console.log("Sending message:", message)

    // Clear the input field
    setMessage("")
  }

  return (
    <div className="messaging-page">
      <div className="messaging-container">
        <div className="messaging-header">
          <div className="seller-info">
            <img src={sellerAvatar || "/placeholder.svg"} alt="Seller" className="seller-avatar" />
            <div className="seller-details">
              <h3>Ade Oladele</h3>
              <p className="seller-status">Online • Furniture Artisan</p>
            </div>
          </div>
        </div>

        <div className="messages-container">
          {conversation.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender === "buyer" ? "outgoing" : "incoming"}`}>
              <div className="message-avatar">
                <img src={msg.avatar || "/placeholder.svg"} alt={msg.sender} />
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  {msg.image && (
                    <div className="message-image">
                      <img src={msg.image.src || "/placeholder.svg"} alt={msg.image.alt} />
                    </div>
                  )}
                </div>
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {showOrderSummary && (
            <div className="order-summary-container">
              <div className="order-summary">
                <h4>Order Quote</h4>
                <div className="order-items">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">₦{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="order-details">
                  <div className="order-detail">
                    <span>Subtotal</span>
                    <span>₦{orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="order-detail">
                    <span>Shipping</span>
                    <span>₦{orderSummary.shipping.toLocaleString()}</span>
                  </div>
                  <div className="order-detail">
                    <span>Tax</span>
                    <span>₦{orderSummary.tax.toLocaleString()}</span>
                  </div>
                  <div className="order-detail total">
                    <span>Total</span>
                    <span>₦{orderSummary.total.toLocaleString()}</span>
                  </div>
                </div>
                <button className="proceed-payment-btn">Proceed to Payment</button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-container">
          <form onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
            />
            <div className="message-actions">
              <button type="button" className="attachment-btn">
                <Paperclip size={20} />
              </button>
              <button type="submit" className="send-btn">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MessagingPage
