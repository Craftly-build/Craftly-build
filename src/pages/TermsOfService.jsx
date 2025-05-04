"use client"

import { useEffect } from "react"
import "../styles/LegalPages.css"

const TermsOfService = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="legal-page-container">
      <div className="legal-page-header">
        <h1>Terms of Service</h1>
        <p className="effective-date">Effective as of April 2023</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using Craftly, you agree to comply with and be bound by these Terms of Services.</p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>2. Account Responsibility</h2>
          <p>
            Users are responsible for maintaining the security of their accounts. Craftly will not be liable for any
            loss or damage arising from unauthorized use.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>3. Use of Services</h2>
          <p>You agree not to misuse our services or access them using a method other than the interface we provide.</p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>4. Payment and Transaction</h2>
          <p>
            Craftly facilitates secure payment through trusted gateways; we are not responsible for any transaction
            errors between buyers and artisans.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>5. Content and Conduct</h2>
          <p>
            Users may not post fraudulent, offensive or harmful content. We reserve the right to remove any content that
            violates our community guidelines.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>6. Termination</h2>
          <p>Craftly reserves the right to terminate or suspend your account if any terms are violated.</p>
        </section>

        <div className="section-divider"></div>

        <section className="legal-section">
          <h2>7. Changes to Terms</h2>
          <p>Terms may be updated occasionally; continued use after updates constitutes acceptance of new terms.</p>
        </section>
      </div>

      <div className="legal-page-footer">
        <p>
          If you have any questions about these Terms of Service, please contact us at{" "}
          <a href="mailto:craftly.enquiries@gmail.com">craftly.enquiries@gmail.com</a>
        </p>
      </div>
    </div>
  )
}

export default TermsOfService
