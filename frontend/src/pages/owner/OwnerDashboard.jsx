import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function OwnerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="dashboard-navbar">

        <div className="dashboard-brand">

          <div className="dashboard-brand-mark">
            S
          </div>

          <div>
            <h2>StoreRate</h2>
            <span>Store Rating Management</span>
          </div>

        </div>


        <div className="dashboard-user-area">

          <div className="dashboard-user-info">

            <div className="dashboard-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "O"}
            </div>

            <div className="dashboard-user-text">
              <strong>{user?.name || "Store Owner"}</strong>
              <span>Store Owner</span>
            </div>

          </div>

          <button
            className="dashboard-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="dashboard-main">

        {/* PAGE HEADING */}

        <section className="dashboard-heading">

          <span className="dashboard-eyebrow">
            STORE OWNER DASHBOARD
          </span>

          <h1>
            Understand your customers.
            <br />
            Improve your store.
          </h1>

          <p>
            Monitor customer feedback, ratings, and your
            store's overall performance.
          </p>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="stat-icon">
              ★
            </div>

            <div>
              <span>Average Rating</span>
              <strong>0.0</strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              U
            </div>

            <div>
              <span>Total Reviews</span>
              <strong>0</strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              S
            </div>

            <div>
              <span>My Store</span>
              <strong>1</strong>
            </div>

          </div>

        </section>


        {/* =================================================
            STORE SUMMARY
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <span className="panel-eyebrow">
              MY STORE
            </span>

            <h2>Store Overview</h2>

            <p>
              A summary of your store's current rating performance.
            </p>

          </div>


          <div className="owner-store-summary">

            <div className="owner-store-identity">

              <div className="owner-store-avatar">
                S
              </div>

              <div>

                <span className="owner-small-label">
                  STORE
                </span>

                <h3>
                  Your Store
                </h3>

                <p>
                  Store information will appear here.
                </p>

              </div>

            </div>


            <div className="owner-rating-display">

              <span className="owner-small-label">
                AVERAGE RATING
              </span>

              <div className="owner-rating-number">
                <strong>0.0</strong>

                <span>
                  ★
                </span>

                <small>
                  / 5
                </small>
              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            CUSTOMER RATINGS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <span className="panel-eyebrow">
              CUSTOMER FEEDBACK
            </span>

            <h2>Customers Who Rated Your Store</h2>

            <p>
              View customers who have submitted ratings for your store.
            </p>

          </div>


          <div className="owner-rating-table">

            <div className="owner-table-header">

              <span>Customer</span>
              <span>Email</span>
              <span>Rating</span>
              <span>Date</span>

            </div>


            <div className="owner-empty-state">

              <div className="state-icon">
                ★
              </div>

              <h3>No ratings yet</h3>

              <p>
                Customer ratings will appear here when users
                submit feedback for your store.
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            ACCOUNT SETTINGS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <span className="panel-eyebrow">
              ACCOUNT
            </span>

            <h2>Account Settings</h2>

            <p>
              Manage your account and security settings.
            </p>

          </div>


          <div className="owner-setting-row">

            <div>

              <h3>
                Change Password
              </h3>

              <p>
                Update your account password to keep your
                account secure.
              </p>

            </div>

            <button
              className="secondary-btn"
            >
              Change Password
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default OwnerDashboard;