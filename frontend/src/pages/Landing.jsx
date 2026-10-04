import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import landingBg from "../assets/background.png";

function Landing() {
  return (
    <div
      className="page landing-page"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      <div className="landing-overlay"></div>

      {/* NAVBAR */}
      <header className="site-navbar">
        <div className="site-navbar-inner">

          <Link to="/" className="site-brand">
            <img
              src={logo}
              alt="Store Rating Management System"
              className="site-brand-logo"
            />

            <span className="site-brand-name">
              Store Rating Management System
            </span>
          </Link>

          <nav className="site-nav-actions">
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>

            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </nav>

        </div>
      </header>

      {/* HERO */}
      <main className="landing-main">

        <section className="landing-hero">

          {/* LEFT */}
          <div className="landing-content">

            <div className="landing-badge">
              Simple. Trusted. Transparent.
            </div>

            <h1 className="landing-title">
              Discover stores.
              <br />
              Share your experience.
            </h1>

            <p className="landing-description">
              StoreRate makes it easy to discover stores, view ratings,
              and share your own experience with the community.
            </p>

            <div className="landing-actions">
              <Link to="/login" className="btn btn-primary btn-large">
                Login
              </Link>

              <Link to="/register" className="btn btn-outline btn-large">
                Create Account
              </Link>
            </div>

            <div className="landing-stats">

              <div className="landing-stat">
                <strong>5★</strong>
                <span>Rating System</span>
              </div>

              <div className="landing-stat">
                <strong>1–5</strong>
                <span>Simple Ratings</span>
              </div>

              <div className="landing-stat">
                <strong>3</strong>
                <span>User Roles</span>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="rating-preview">

            <div className="rating-card">

              <div className="rating-card-top">
                <div className="rating-store-icon">
                  S
                </div>

                <div>
                  <h3>Featured Store</h3>
                  <p>Customer Rating</p>
                </div>
              </div>

              <div className="rating-score">
                4.8
              </div>

              <div className="rating-stars">
                ★ ★ ★ ★ ★
              </div>

              <div className="rating-heading">
                Excellent Rating
              </div>

              <div className="rating-progress">
                <span></span>
              </div>

              <div className="rating-trust">
                <span>Trusted by customers</span>
                <strong>92%</strong>
              </div>

            </div>
 &nbsp; &nbsp; &nbsp; &nbsp;
            <div className="rating-floating-card">
              <span className="floating-check">✓</span>
            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <span>
          Rate stores. Discover better experiences.
        </span>
      </footer>

    </div>
  );
}

export default Landing;