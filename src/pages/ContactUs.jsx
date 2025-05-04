"use client"

import { useState } from "react"
import { MessageSquare, Mail, FileText, Send } from "lucide-react"
import "../styles/ContactUs.css"

const ContactUs = () => {
  const [activeChat, setActiveChat] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!feedbackForm.name || !feedbackForm.email || !feedbackForm.message) {
      setFormError("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(feedbackForm.email)) {
      setFormError("Please enter a valid email address")
      return
    }

    // In a real app, you would send the form data to your backend here
    console.log("Form submitted:", feedbackForm)

    // Reset form and show success message
    setFeedbackForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setFormError("")
    setFormSubmitted(true)

    // Reset success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  const startChat = () => {
    setActiveChat(true)
  }

  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Whether you have a question, need support, or want to share feedback, we're here
          to help.
        </p>
      </div>

      <div className="contact-methods">
        <div className="contact-method">
          <div className="method-icon">
            <MessageSquare size={24} />
          </div>
          <h2>Live Chat</h2>
          <p>
            Start a real-time chat with our support team.
            <br />
            Available Monday - Friday, 9:00 AM - 5:00 PM (WAT)
          </p>
          <button className="chat-button" onClick={startChat}>
            Start Chat
          </button>
          {activeChat && (
            <div className="chat-window">
              <div className="chat-header">
                <h3>Live Support</h3>
                <button className="close-chat" onClick={() => setActiveChat(false)}>
                  ×
                </button>
              </div>
              <div className="chat-messages">
                <div className="message support">
                  <p>Hello! How can we help you today?</p>
                  <span className="time">Just now</span>
                </div>
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button>
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="contact-method">
          <div className="method-icon">
            <Mail size={24} />
          </div>
          <h2>Email Support</h2>
          <p>
            Send us an email anytime at <a href="mailto:craftly.enquiries@gmail.com">craftly.enquiries@gmail.com</a>
          </p>
          <p className="response-time">We typically respond within 24-48 hours</p>
        </div>

        <div className="contact-method">
          <div className="method-icon">
            <FileText size={24} />
          </div>
          <h2>Feedback Form</h2>
          <p className="coming-soon">(Coming soon)</p>
          <p>We're working on a feedback form so you can send in suggestions with ease. Stay tuned!</p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
