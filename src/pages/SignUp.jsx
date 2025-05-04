"use client"

import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/Loading";
import "../styles/Signup.css";
import i12 from "../assets/i12.png";
import i13 from "../assets/i13.png";

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");

  const validType = typeParam === "buyer" || typeParam === "artisan" ? typeParam : "buyer";

  const [userType, setUserType] = useState(validType);
  const { register: authRegister, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    const result = await authRegister(name, email, password, userType);

    if (result.success) {
      if (userType === "artisan") {
        navigate("/unverified-artisan-dashboard");
      } else {
        navigate("/");
      }
    }
  };

  const handleGoogleSignupSuccess = (credentialResponse) => {
    console.log("Google signup success:", credentialResponse);
    const idToken = credentialResponse.credential;

    // In a real app, send idToken to backend for verification
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", userType);

    if (userType === "artisan") {
      navigate("/unverified-artisan-dashboard");
    } else {
      navigate("/");
    }
  };

  const handleGoogleSignupError = () => {
    console.error("Google signup failed");
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("type", type);
    window.history.replaceState(null, "", `${window.location.pathname}?${newSearchParams.toString()}`);
  };

  const getImage = () => (userType === "buyer" ? i12 : i13);

  return (
    <div className="auth-page">
      <div className="signup-container">
        <div className="image-section">
          <img
            src={getImage() || "/placeholder.svg"}
            alt={userType === "buyer" ? "Handcrafted items" : "Artisan working"}
            loading="lazy"
          />
        </div>
        <div className="form-section">
          <h1>Create an Account</h1>
          <p className="auth-subtitle">Join the Marketplace for Handcrafted Goods & Services</p>

          <div className="user-type-toggle" role="radiogroup" aria-label="Select user type">
            <button
              className={`user-type-btn ${userType === "buyer" ? "active" : ""}`}
              onClick={() => handleUserTypeChange("buyer")}
              role="radio"
              aria-checked={userType === "buyer"}
              tabIndex={userType === "buyer" ? 0 : -1}
            >
              Buyer
            </button>
            <button
              className={`user-type-btn ${userType === "artisan" ? "active" : ""}`}
              onClick={() => handleUserTypeChange("artisan")}
              role="radio"
              aria-checked={userType === "artisan"}
              tabIndex={userType === "artisan" ? 0 : -1}
            >
              Artisan
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Name"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="terms"
                aria-invalid={errors.terms ? "true" : "false"}
                {...register("terms", {
                  required: "You must agree to the Terms & Conditions",
                })}
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <Link to="/terms" className="terms-link">
                  Terms & Conditions
                </Link>
              </label>
              {errors.terms && <span className="error-message">{errors.terms.message}</span>}
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <LoadingSpinner size="small" /> : "Sign Up"}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or Sign up with</span>
          </div>

          <div className="social-login">
            <GoogleLogin
              onSuccess={handleGoogleSignupSuccess}
              onError={handleGoogleSignupError}
            />
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="sign-in-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
