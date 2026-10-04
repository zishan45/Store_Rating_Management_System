import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import landingBg from "../assets/background.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
<div
  className="landing-page"
  style={{ backgroundImage: `url(${landingBg})` }} >
    
 <div className="landing-overlay"></div>

      {/* Navbar */}
      <nav className="landing-navbar">

  <div className="landing-logo">

    <div className="logo-mark">
      <img src={logo} alt="StoreRate Logo" />
    </div>
    <div>
        <h1>Store Rating Management System</h1>
    </div>
  </div>

  <div className="landing-nav-actions">

    <button
      className="nav-login"
      onClick={() => navigate("/login")}
    >
      Login
    </button>

    <button
      className="nav-register"
      onClick={() => navigate("/register")}
    >
      Register
    </button>

  </div>

</nav>


      {/* Hero Section */}
      <main className="landing-hero">

        <div className="hero-content">

          <div className="hero-badge">
            Simple. Trusted. Transparent.
          </div>

          <h1>
            Discover stores.
            <br />

            <span>Share your experience.</span>
          </h1>

          <p>
            StoreRate makes it easy to discover stores, view ratings,
            and share your own experience with the community.
          </p>

          {/* Main Buttons */}
          <div className="hero-actions">

            <button
              className="hero-login"
              onClick={() => navigate("/login")}
            >
              Login
              <span>→</span>
            </button>

            <button
              className="hero-register"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

          </div>

          {/* Small information */}
          <div className="hero-info">

            <div>
              <strong>5★</strong>
              <span>Rating System</span>
            </div>

            <div className="info-divider"></div>

            <div>
              <strong>1–5</strong>
              <span>Simple Ratings</span>
            </div>

            <div className="info-divider"></div>

            <div>
              <strong>3</strong>
              <span>User Roles</span>
            </div>

          </div>

        </div>


        {/* Right Visual */}
        <div className="hero-visual">

          <div className="visual-circle circle-one"></div>
          <div className="visual-circle circle-two"></div>

          <div className="rating-card">

            <div className="rating-card-header">
              <div className="store-icon">
                S
              </div>

              <div>
                <h3>Featured Store</h3>
                <p>Customer Rating</p>
              </div>
            </div>

            <div className="rating-score">
              <strong>4.8</strong>

              <div>
                <div className="stars">
                  ★ ★ ★ ★ ★
                </div>

                <span>Excellent Rating</span>
              </div>
            </div>

            <div className="rating-bar">
              <span style={{ width: "92%" }}></span>
            </div>

            <div className="rating-footer">
              <span>Trusted by customers</span>
              <strong>92%</strong>
            </div>

          </div>


          <div className="floating-card floating-card-one">
            <span>★</span>
            <div>
              <strong>5.0</strong>
              <small>New Rating</small>
            </div>
          </div>


          <div className="floating-card floating-card-two">
            <span>✓</span>
            <div>
              <strong>Trusted</strong>
              <small>Community Reviews</small>
            </div>
          </div>

        </div>

      </main>


      {/* Bottom Message */}
      <div className="landing-bottom">
        <p>
          Rate stores. Discover better experiences.
        </p>
      </div>

    </div>
  );
};

export default Landing;