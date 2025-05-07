import React, { useState, useRef } from "react";
import { Upload, Check, File } from 'lucide-react';
import "../styles/ArtisanVerification.css";
import PayLogos from "../components/PayLogos";
import Footer from "../components/Footer"

const ArtisanVerification = () => {
  const [currentPage, setCurrentPage] = useState("verification-form");
  const [isVerified, setIsVerified] = useState(false);
  
  // Form state
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    phone: "",
    address: ""
  });
  
  const [idUpload, setIdUpload] = useState({
    file: null,
    fileName: "",
    uploaded: false
  });
  
  const [certUpload, setCertUpload] = useState({
    file: null,
    fileName: "",
    uploaded: false
  });
  
  // Refs for file inputs
  const idFileInputRef = useRef(null);
  const certFileInputRef = useRef(null);
  
  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value
    });
  };
  
  const handleIdUploadClick = () => {
    // Trigger the hidden file input
    idFileInputRef.current.click();
  };
  
  const handleCertUploadClick = () => {
    // Trigger the hidden file input
    certFileInputRef.current.click();
  };
  
  const handleIdFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdUpload({
        file: file,
        fileName: file.name,
        uploaded: true
      });
    }
  };
  
  const handleCertFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertUpload({
        file: file,
        fileName: file.name,
        uploaded: true
      });
    }
  };
  
  const handleSubmitVerification = (e) => {
    e.preventDefault();
    // In a real app, we would upload the files to a server here
    // For now, we'll just move to the next page
    setCurrentPage("verification-process");
  };
  
  const navigateToDashboard = () => {
    setCurrentPage("dashboard");
  };
  
  const toggleVerificationStatus = () => {
    setIsVerified(!isVerified);
  };

  // Verification Form Page
  const VerificationForm = () => (
    <div className="verification-form-container">
      <div className="section-header">
        <h2>Complete Your Verification</h2>
        <p>Fill out the form below to verify your account and start selling your products or services</p>
      </div>
      
      <form onSubmit={handleSubmitVerification}>
        <div className="form-section personal-info">
          <h3>Personal Details</h3>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={personalDetails.fullName}
              onChange={handlePersonalDetailsChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={personalDetails.phone}
              onChange={handlePersonalDetailsChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea 
              id="address" 
              name="address" 
              value={personalDetails.address}
              onChange={handlePersonalDetailsChange}
              placeholder="Enter your full address"
              required
            ></textarea>
          </div>
        </div>
        
        <div className="form-section id-upload">
          <h3>Upload Identification</h3>
          <div className="upload-container">
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={idFileInputRef} 
              onChange={handleIdFileChange} 
              accept=".jpg,.jpeg,.png,.pdf"
              style={{ display: 'none' }}
            />
            
            <div 
              className={`upload-box ${idUpload.uploaded ? 'uploaded' : ''}`} 
              onClick={handleIdUploadClick}
            >
              {idUpload.uploaded ? (
                <div className="upload-success">
                  <Check size={24} />
                  <div className="file-info">
                    <File size={20} />
                    <span className="file-name">{idUpload.fileName}</span>
                  </div>
                  <span className="upload-message">ID Uploaded Successfully</span>
                  <span className="change-file">Click to change file</span>
                </div>
              ) : (
                <>
                  <Upload size={24} />
                  <span>Click to upload your valid ID</span>
                  <span className="file-types">Supported formats: JPG, PNG, PDF</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-section cert-upload">
          <h3>Skills Certification</h3>
          <div className="upload-container">
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={certFileInputRef} 
              onChange={handleCertFileChange} 
              accept=".jpg,.jpeg,.png,.pdf"
              style={{ display: 'none' }}
            />
            
            <div 
              className={`upload-box ${certUpload.uploaded ? 'uploaded' : ''}`} 
              onClick={handleCertUploadClick}
            >
              {certUpload.uploaded ? (
                <div className="upload-success">
                  <Check size={24} />
                  <div className="file-info">
                    <File size={20} />
                    <span className="file-name">{certUpload.fileName}</span>
                  </div>
                  <span className="upload-message">Certification Uploaded Successfully</span>
                  <span className="change-file">Click to change file</span>
                </div>
              ) : (
                <>
                  <Upload size={24} />
                  <span>Click to upload any certifications or training documents</span>
                  <span className="file-types">Supported formats: JPG, PNG, PDF</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={!idUpload.uploaded}
          >
            Submit for Verification
          </button>
          <button type="button" className="cancel-button">Cancel Application</button>
        </div>
      </form>
      
      <PayLogos/>
      <Footer/>
    </div>
  );

  // Verification Process Page
  const VerificationProcess = () => (
    <div className="verification-process-container">
      <div className="verification-status">
        <div className="status-icon">
          <div className="document-icon"></div>
        </div>
        <h2>Your verification is under review</h2>
        <p>This will usually be completed within 24-48 hours</p>
        
        <div className="status-actions">
          <button className="back-button" onClick={navigateToDashboard}>Back to Dashboard</button>
          <button className="help-button">Need Help?</button>
        </div>
      </div>
      
      <PayLogos/>
      <Footer/>
    </div>
  );

  // Dashboard Page
  const Dashboard = () => (
    <div className="dashboard-container">
      {!isVerified && (
        <div className="verification-banner">
          <h3>VERIFICATION NEEDED</h3>
          <p>Complete your verification to start selling your products and services</p>
        </div>
      )}
      
      {isVerified ? (
        <div className="verified-dashboard">
          <div className="profile-header">
            <div className="profile-image"></div>
            <div className="profile-info">
              <h2>ARTISAN PROFILE</h2>
              <p>Verified Craftsperson</p>
            </div>
          </div>
          
          <div className="stats-container">
            <div className="stat-box">
              <h4>TOTAL ORDERS</h4>
              <p>12</p>
            </div>
            <div className="stat-box">
              <h4>COMPLETED</h4>
              <p>10</p>
            </div>
            <div className="stat-box">
              <h4>IN PROGRESS</h4>
              <p>2</p>
            </div>
            <div className="stat-box">
              <h4>CUSTOMER RATING</h4>
              <p>4.8/5</p>
            </div>
            <div className="stat-box">
              <h4>EARNINGS</h4>
              <p>₦125,000</p>
            </div>
          </div>
          
          <div className="products-section">
            <div className="section-header">
              <h3>Products & Services</h3>
              <button className="post-product-btn">Post a Product</button>
            </div>
            
            <div className="products-list">
              <div className="product-item">
                <h4>Handcrafted Wooden Bowl</h4>
                <div className="product-details">
                  <span className="price">₦15,000</span>
                  <div className="product-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
              
              <div className="product-item">
                <h4>Custom Furniture Making</h4>
                <div className="product-details">
                  <span className="price">₦50,000 - ₦200,000</span>
                  <div className="product-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
              
              <div className="product-item">
                <h4>Woodworking Workshop</h4>
                <div className="product-details">
                  <span className="price">₦25,000</span>
                  <div className="product-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="portfolio-section">
            <div className="section-header">
              <h3>Your Portfolio</h3>
              <button className="view-all-btn">View All</button>
            </div>
            
            <div className="portfolio-grid">
              <div className="portfolio-item"></div>
              <div className="portfolio-item"></div>
              <div className="portfolio-item"></div>
              <div className="portfolio-item"></div>
            </div>
          </div>
          
          <div className="reviews-section">
            <div className="section-header">
              <h3>Client Reviews</h3>
            </div>
            
            <div className="reviews-list">
              {/* Reviews would go here */}
            </div>
          </div>
        </div>
      ) : (
        <div className="unverified-dashboard">
          <div className="placeholder-section">
            <div className="placeholder-icon"></div>
            <p>Complete verification to access your dashboard</p>
          </div>
          
          <div className="placeholder-section">
            <div className="placeholder-icon"></div>
            <p>Your products and services will appear here</p>
          </div>
          
          <div className="placeholder-section">
            <div className="placeholder-icon"></div>
            <p>Your portfolio and reviews will be shown here</p>
          </div>
        </div>
      )}
      
      <PayLogos/>
    </div>
  );

  return (
    <div className="artisan-verification-app">
      <div className="page-content">
        {currentPage === "verification-form" && <VerificationForm />}
        {currentPage === "verification-process" && <VerificationProcess />}
        {currentPage === "dashboard" && <Dashboard />}
      </div>
      
      {/* Toggle button for demo purposes only - you can remove this in production */}
      <div className="demo-controls">
        <button onClick={() => setCurrentPage("verification-form")}>Form</button>
        <button onClick={() => setCurrentPage("verification-process")}>Process</button>
        <button onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
        <button onClick={toggleVerificationStatus}>
          {isVerified ? "Show Unverified" : "Show Verified"}
        </button>
      </div>
    </div>
  );
};

export default ArtisanVerification;