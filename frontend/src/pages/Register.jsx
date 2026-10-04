import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", formData);

      setSuccess("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Branding Section */}
      <div className="login-brand">
        <div className="brand-content">
        <div>
          <div className="logo-mark">
            <img src={logo} alt="StoreRate Logo" />
          </div>
          <h1>
            Join Store Rating
            <span>Management System</span>
          </h1>
        </div>
          

          <p>
            Create your account and become part of a community
            that helps people discover better stores.
          </p>

          <div className="brand-features">

            <div className="brand-feature">
              <span>01</span>
              <div>
                <strong>Discover Stores</strong>
                <p>
                  Explore stores and find the best-rated places.
                </p>
              </div>
            </div>

            <div className="brand-feature">
              <span>02</span>
              <div>
                <strong>Rate Your Experience</strong>
                <p>
                  Share your experience by rating stores.
                </p>
              </div>
            </div>

            <div className="brand-feature">
              <span>03</span>
              <div>
                <strong>Help Others</strong>
                <p>
                  Your ratings help others make better decisions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Register Section */}
      <div className="login-form-section">

        <div className="login-card">

          <div className="mobile-logo">
            SR
          </div>

          <div className="login-header">

            <p className="welcome-text">
              GET STARTED
            </p>

            <h2>
              Create your account
            </h2>

            <p>
              Fill in your details to get started.
            </p>

          </div>

          {error && (
            <div className="login-error">
              <span>!</span>
              {error}
            </div>
          )}

          {success && (
            <div className="register-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="login-field">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  A
                </span>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={20}
                  maxLength={60}
                />

              </div>

            </div>

            {/* Email */}
            <div className="login-field">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="login-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  *
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={16}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <small className="password-hint">
                8–16 characters, including one uppercase letter
                and one special character.
              </small>

            </div>

            {/* Address */}
            <div className="login-field">

              <label htmlFor="address">
                Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon address-icon">
                  #
                </span>

                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  maxLength={400}
                />

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          <div className="login-divider">
            <span>ALREADY HAVE AN ACCOUNT?</span>
          </div>

          <button
            type="button"
            className="register-button"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            type="button"
            className="back-home"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;