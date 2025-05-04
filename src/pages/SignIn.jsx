"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "../components/Loading"
import usePersistedForm from "../hooks/usePersistedForm"
import "../styles/SignIn.css"
import i14 from "../assets/i14.png"
import i11 from "../assets/i11.png"

const LoginPage = () => {
  const [userType, setUserType] = useState("buyer")
  const { t } = useTranslation()
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/"

  // Use our custom hook for form persistence
  const { formData, handleChange, resetForm } = usePersistedForm("login", {
    email: "",
    password: "",
    rememberMe: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: formData.email || "",
      password: formData.password || "",
      rememberMe: formData.rememberMe || false,
    },
  })

  // Set form values from persisted data
  useEffect(() => {
    setValue("email", formData.email || "")
    setValue("password", formData.password || "")
    setValue("rememberMe", formData.rememberMe || false)
  }, [formData, setValue])

  const onSubmit = async (data) => {
    const { email, password, rememberMe } = data

    // Update persisted form data
    handleChange({ target: { name: "email", value: email } })
    handleChange({ target: { name: "password", value: password } })
    handleChange({ target: { name: "rememberMe", value: rememberMe, type: "checkbox", checked: rememberMe } })

    const result = await login(email, password, userType)

    if (result.success) {
      // Clear form data if not "remember me"
      if (!rememberMe) {
        resetForm()
      }

      // Navigate to the page the user was trying to access, or home
      navigate(from, { replace: true })
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider} as ${userType}`)
    // In a real app, we would implement OAuth login with the selected provider
    navigate(from, { replace: true })
  }

  // Choose the appropriate image based on user type
  const getImage = () => {
    if (userType === "buyer") {
      return i11
    } else {
      return i14
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <img
            src={getImage() || "/placeholder.svg"}
            alt={userType === "buyer" ? "Shopping handcrafted items" : "Artisan working"}
            loading="lazy"
          />
        </div>
        <div className="auth-form-container">
          <div className="auth-form">
            <h1>{t("Sign in to continue")}</h1>

            <div className="user-type-toggle" role="radiogroup" aria-label="Select user type">
              <button
                className={`user-type-btn ${userType === "artisan" ? "active" : ""}`}
                onClick={() => setUserType("artisan")}
                role="radio"
                aria-checked={userType === "artisan"}
                tabIndex={userType === "artisan" ? 0 : -1}
              >
                Artisan
              </button>
              <button
                className={`user-type-btn ${userType === "buyer" ? "active" : ""}`}
                onClick={() => setUserType("buyer")}
                role="radio"
                aria-checked={userType === "buyer"}
                tabIndex={userType === "buyer" ? 0 : -1}
              >
                Buyer
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  placeholder={t("auth.email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: t("auth.requiredField"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("auth.invalidEmail"),
                    },
                  })}
                  onChange={(e) => {
                    handleChange(e)
                    register("email").onChange(e)
                  }}
                />
                {errors.email && (
                  <span className="error-message" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  placeholder={t("auth.password")}
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: t("auth.requiredField"),
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  onChange={(e) => {
                    handleChange(e)
                    register("password").onChange(e)
                  }}
                />
                {errors.password && (
                  <span className="error-message" role="alert">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...register("rememberMe")}
                  onChange={(e) => {
                    handleChange(e)
                    register("rememberMe").onChange(e)
                  }}
                />
                <label htmlFor="rememberMe">{t("auth.rememberMe")}</label>
                <div className="forgot-password">
                  <Link to="/forgot-password">{t("auth.forgotPassword")}</Link>
                </div>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <LoadingSpinner size="small" /> : t("auth.login")}
              </button>
            </form>

            <div className="auth-divider">
              <span>Or Sign in with</span>
            </div>

            <div className="social-login">
              <button
                className="social-btn google"
                onClick={() => handleSocialLogin("Google")}
                aria-label="Sign in with Google"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>
              <button
                className="social-btn apple"
                onClick={() => handleSocialLogin("Apple")}
                aria-label="Sign in with Apple"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M16.462,15.443c-0.401,0.733-0.589,1.061-1.1,1.707c-0.713,0.9-1.72,2.02-2.967,2.033c-1.103,0.013-1.382-0.705-2.879-0.694c-1.497,0.012-1.809,0.708-2.913,0.695c-1.247-0.013-2.2-1.021-2.913-1.92c-1.996-2.513-2.2-5.466-0.971-7.031c0.868-1.103,2.248-1.764,3.556-1.764c1.32,0,2.15,0.708,3.242,0.708c1.058,0,1.702-0.708,3.228-0.708c1.153,0,2.373,0.627,3.242,1.71C14.717,11.665,14.896,14.01,16.462,15.443z M12.07,5.292c0.556-0.714,0.976-1.708,0.821-2.717c-0.868,0.067-1.876,0.61-2.467,1.31c-0.54,0.635-0.987,1.629-0.815,2.584C10.527,6.536,11.513,6.007,12.07,5.292z" />
                </svg>
              </button>
              <button
                className="social-btn facebook"
                onClick={() => handleSocialLogin("Facebook")}
                aria-label="Sign in with Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M13.397,20.997v-8.196h2.765l0.411-3.209h-3.176V7.548c0-0.926,0.258-1.56,1.587-1.56h1.684V3.127C15.849,3.039,15.025,2.997,14.201,3c-2.444,0-4.122,1.492-4.122,4.231v2.355H7.332v3.209h2.753v8.202H13.397z" />
                </svg>
              </button>
            </div>

            <div className="auth-footer">
              <p>
                New to Craftify?{" "}
                <Link to="/register" className="sign-up-link">
                  Sign Up Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

