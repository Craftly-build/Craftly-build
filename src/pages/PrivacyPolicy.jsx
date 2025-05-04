"use client"

import { useEffect } from "react"
import "../styles/LegalPages.css"

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="legal-page-container">
      <div className="legal-page-header">
        <h1>Privacy Policy</h1>
        <p className="policy-intro">
          Craftly is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect
          your personal information when you use our platform.
        </p>
        <p className="effective-date">Effective as of April 2023</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide when you create an account, such as your name, email address, phone
            number, and profile details. We also collect data on how you use our services to improve user experience.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to provide and maintain our services, personalize your experience, communicate with
            you, improve our platform and ensure security and prevent fraud.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your data with trusted
            service providers who help us operate our platform, and only to the extent necessary.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>4. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can manage your account
            preferences at any time in your settings.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>5. Data Security</h2>
          <p>
            We use industry-standard measures to protect your information. However, no online transmission or storage is
            100% secure.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>6. Cookies</h2>
          <p>
            Craftly uses cookies to enhance user experience. You can control cookie preferences in your browser
            settings.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>7. Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically. We will notify users of significant changes via email or a
            notice on our platform.
          </p>
        </section>
      </div>

      <div className="legal-page-footer">
        <p>
          If you have any questions about our Privacy Policy, please contact us at{" "}
          <a href="mailto:craftly.enquiries@gmail.com">craftly.enquiries@gmail.com</a>
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
