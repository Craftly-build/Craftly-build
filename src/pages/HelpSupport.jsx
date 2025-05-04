"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import "../styles/HelpSupport.css"

const HelpSupport = () => {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState({})

  // Toggle FAQ item expansion
  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // FAQ data structure
  const faqItems = [
    {
      id: 1,
      question: "How do I get Craftly as an artisan?",
      answer:
        "You can sign up from our homepage and complete your profile. Once verified, your dashboard will open and you can start selling your products.",
    },
    {
      id: 2,
      question: "Do I need an account to purchase on Craftly?",
      answer: "Yes, you need to create a buyer account to place and track orders.",
    },
    {
      id: 3,
      question: "How do I place an order?",
      answer:
        "Browse products or services, add them to your cart, and follow the checkout process. Once payment is successful, your order will be confirmed.",
    },
    {
      id: 4,
      question: "What payment methods are accepted?",
      answer:
        "Craftly accepts bank transfers, credit/debit cards and Paystack payments. More options may be added soon.",
    },
    {
      id: 5,
      question: "How do I upload my portfolio?",
      answer: "After signing in as an artisan, navigate to your dashboard and select 'Update Portfolio'.",
    },
    {
      id: 6,
      question: "I'm having trouble logging in. What should I do?",
      answer:
        "First, ensure that your internet connection is up and running. If the issue persists, contact our support team.",
    },
    {
      id: 7,
      question: "What services can I sell?",
      answer:
        "You can list crafts, handmade goods, custom services, and other skilled work on your verified seller account.",
    },
    {
      id: 8,
      question: "How do I report a problem or give feedback?",
      answer: "Use the Contact Us button at the bottom of this page to reach out to our support team.",
    },
  ]

  return (
    <div className="help-support-container">
      <div className="help-support-header">
        <h1>Help & Support</h1>
        <p>Find answers to common questions or get in touch with the team who manages Craftly with ease.</p>
      </div>

      <div className="faqs-section">
        <h2>FAQS</h2>

        <div className="faqs-grid">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`faq-item ${expandedItems[item.id] ? "expanded" : ""}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="faq-question">
                <h3>{item.question}</h3>
                <ChevronDown className={`chevron-icon ${expandedItems[item.id] ? "rotated" : ""}`} />
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="additional-help">
        <h2>Still need help?</h2>
        <p>If you need further assistance or have additional questions, please reach out to us.</p>

        <div className="contact-info">
          <p>
            Contact us directly: <a href="mailto:craftly.enquiries@gmail.com">craftly.enquiries@gmail.com</a>
          </p>
        </div>

        <div className="faq-link">
          <a href="/faq">View Complete FAQ</a>
        </div>
      </div>
    </div>
  )
}

export default HelpSupport
