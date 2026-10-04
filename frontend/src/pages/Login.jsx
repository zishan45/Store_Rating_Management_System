import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      const { token, user } = response.data;

      login(token, user);

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/user");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
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
            <div className="logo-mark">
                  <img src={logo} alt="StoreRate Logo" />
            </div>
        
          <h1>
            Store Rating
            <span> Management System</span>
          </h1>

          <p>
            Discover stores, share your experience, and help others
            make better decisions through trusted ratings.
          </p>

          <div className="brand-features">
            <div className="brand-feature">
              <span>01</span>
              <div>
                <strong>Discover Stores</strong>
                <p>Find stores based on location and ratings.</p>
              </div>
            </div>

            <div className="brand-feature">
              <span>02</span>
              <div>
                <strong>Share Your Experience</strong>
                <p>Rate stores and share your valuable feedback.</p>
              </div>
            </div>

            <div className="brand-feature">
              <span>03</span>
              <div>
                <strong>Trusted Ratings</strong>
                <p>Help the community make informed choices.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Login Section */}
      <div className="login-form-section">

        <div className="login-card">

          <div className="mobile-logo">
            SR
          </div>

          <div className="login-header">
            <p className="welcome-text">WELCOME BACK</p>

            <h2>Sign in to your account</h2>

            <p>
              Enter your credentials to continue.
            </p>
          </div>

          {error && (
            <div className="login-error">
              <span>!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

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

            <div className="login-field">
              <div className="password-label">
                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>
              </div>

              <div className="input-wrapper">
                <span className="input-icon">
                  *
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          <div className="login-divider">
            <span>NEW TO THE PLATFORM?</span>
          </div>

          <button
            type="button"
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Create an Account
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

export default Login;