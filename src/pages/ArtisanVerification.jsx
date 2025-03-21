import React, { useState } from 'react';
import { Upload, Phone, Mail, FileText } from 'lucide-react';
import '../styles/ArtisanVerification.css';

const ArtisanVerification = () => {
  const [step, setStep] = useState(1); // 1: Form, 2: Under Review, 3: Dashboard
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    portfolio: null,
    skills: '',
    specialization: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      portfolio: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to verification under review
  };

  const renderVerificationForm = () => (
    <div className="verification-form">
      <h1>Complete Your Verification</h1>
      <p>Please join us in our verification process as we strive to make our platform a safe space for all.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Upload a Valid ID</h3>
          <p>A valid ID is required to process your request</p>
          <div className="upload-box">
            <Upload size={24} />
            <span>Upload ID</span>
            <input 
              type="file" 
              accept="image/*,.pdf"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Upload Portfolio</h3>
          <p>Showcase your work and let your craft speak for itself</p>
          <div className="upload-box">
            <Upload size={24} />
            <span>Upload Portfolio/Photos</span>
            <input 
              type="file" 
              accept="image/*,.pdf"
              multiple
              onChange={handleFileUpload}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="input-group">
            <div className="input-with-icon">
              <Phone size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-with-icon">
              <Mail size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Skills & Specialization</h3>
          <div className="input-group">
            <div className="input-with-icon">
              <FileText size={20} />
              <input
                type="text"
                name="skills"
                placeholder="Your skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </div>
            <textarea
              name="specialization"
              placeholder="Tell us more about your craft..."
              value={formData.specialization}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="save-progress-btn">
            Save Progress
          </button>
          <button type="submit" className="submit-btn">
            Submit for Verification
          </button>
        </div>
      </form>

      <div className="payment-methods">
        <img src="/payment-icons/mastercard.svg" alt="Mastercard" />
        <img src="/payment-icons/visa.svg" alt="Visa" />
        <img src="/payment-icons/paypal.svg" alt="PayPal" />
      </div>
    </div>
  );

  const renderUnderReview = () => (
    <div className="under-review">
      <div className="review-icon">
        <FileText size={64} />
      </div>
      <h2>Your verification is under review</h2>
      <p>You will receive a notification once it's been approved</p>
      <div className="review-actions">
        <button className="back-btn">Back to Homepage</button>
        <button className="status-btn">Check Status</button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(step) {
      case 1:
        return renderVerificationForm();
      case 2:
        return renderUnderReview();
      default:
        return renderVerificationForm();
    }
  };

  return (
    <div className="artisan-verification">
      <div className="verification-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default ArtisanVerification;