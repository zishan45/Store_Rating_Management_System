import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect according to role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">

      <div className="auth-container">

        {/* LEFT PANEL */}
        <section className="auth-info">

          <Link to="/" className="auth-brand">
            <img
              src={logo}
              alt="Store Rating Management System"
              className="auth-brand-logo"
            />

    
            <h3>Store Rating Managemant System</h3>
          </Link>

          <div className="auth-info-content">

          <h1>WELCOME</h1>

            <h2 className="auth-info-title">
              Your experience
              <br />
              matters.
            </h2>

            <p className="auth-info-description">
              Sign in to discover stores, manage your ratings,
              and help others make better decisions.
            </p>

            <div className="auth-features">

              <div className="auth-feature">
                <span className="auth-feature-number">
                  01
                </span>

                <div>
                  <h3>Discover Stores</h3>
                  <p>
                    Explore stores and find highly rated places.
                  </p>
                </div>
              </div>

              <div className="auth-feature">
                <span className="auth-feature-number">
                  02
                </span>

                <div>
                  <h3>Share Ratings</h3>
                  <p>
                    Rate your experience from 1 to 5.
                  </p>
                </div>
              </div>

              <div className="auth-feature">
                <span className="auth-feature-number">
                  03
                </span>

                <div>
                  <h3>Help Others</h3>
                  <p>
                    Your feedback helps people choose better stores.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* FORM PANEL */}
        <section className="auth-form-section">

          <div className="auth-form-wrapper">

            <span className="auth-eyebrow">
              SIGN IN
            </span>

            <h2 className="auth-form-title">
              Welcome back
            </h2>

            <p className="auth-form-description">
              Enter your details to continue.
            </p>

            {error && (
              <div className="form-alert form-alert-error">
                {error}
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}
              <div className="form-field">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />

              </div>

              {/* PASSWORD */}
              <div className="form-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

            <div className="auth-switch">
              <span>Don't have an account?</span>

              <Link to="/register">
                Create Account
              </Link>
            </div>

            <Link
              to="/"
              className="auth-back-link"
            >
              ← Back to Home
            </Link>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Login;