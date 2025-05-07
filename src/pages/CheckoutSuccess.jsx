// src/pages/CheckoutSuccess.jsx
import { Link } from "react-router-dom";
import { CheckCircle } from 'lucide-react';
import "../styles/CheckoutSuccess.css";

const CheckoutSuccess = () => {
  return (
    <div className="checkout-success">
      <div className="success-icon">
        <CheckCircle size={60} />
      </div>
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for your purchase. Your order has been received and is being processed.</p>
      <div className="success-actions">
        <Link to="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
        <Link to="/orders" className="view-orders-btn">
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;