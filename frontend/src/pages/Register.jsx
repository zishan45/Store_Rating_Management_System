import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
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
      await api.post("/auth/register", formData);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
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

            <span>
              Store Rating Management System
            </span>

          </Link>

          <div className="auth-info-content">

            <span className="auth-eyebrow">
              JOIN OUR COMMUNITY
            </span>

            <h1 className="auth-info-title">
              Join Store Rating
              <br />
              Management System
            </h1>

            <p className="auth-info-description">
              Create your account and become part of a community
              that helps people discover better stores.
            </p>

            <div className="auth-features">

              <div className="auth-feature">

                <span className="auth-feature-number">
                  01
                </span>

                <div>
                  <h3>Discover Stores</h3>

                  <p>
                    Explore stores and find the best-rated places.
                  </p>
                </div>

              </div>

              <div className="auth-feature">

                <span className="auth-feature-number">
                  02
                </span>

                <div>
                  <h3>Rate Your Experience</h3>

                  <p>
                    Share your experience by rating stores.
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
                    Your ratings help others make better decisions.
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
              GET STARTED
            </span>

            <h2 className="auth-form-title">
              Create your account
            </h2>

            <p className="auth-form-description">
              Fill in your details to get started.
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

              {/* NAME */}
              <div className="form-field">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  minLength={20}
                  maxLength={60}
                  required
                />

              </div>

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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={16}
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

                <span className="form-help">
                  8–16 characters, including one uppercase
                  letter and one special character.
                </span>

              </div>

              {/* ADDRESS */}
              <div className="form-field">

                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  maxLength={400}
                  rows={4}
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            <div className="auth-switch">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign In
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

export default Register;