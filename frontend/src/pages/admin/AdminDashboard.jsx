import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
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
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="dashboard-user-text">
              <strong>{user?.name || "Administrator"}</strong>
              <span>System Administrator</span>
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
            ADMIN DASHBOARD
          </span>

          <h1>
            Manage your platform.
            <br />
            Everything in one place.
          </h1>

          <p>
            Monitor users, stores, and ratings from a
            centralized administration dashboard.
          </p>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="stat-icon">
              U
            </div>

            <div>
              <span>Total Users</span>
              <strong>0</strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              S
            </div>

            <div>
              <span>Total Stores</span>
              <strong>0</strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon">
              ★
            </div>

            <div>
              <span>Total Ratings</span>
              <strong>0</strong>
            </div>

          </div>

        </section>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="dashboard-panel admin-actions-panel">

          <div className="panel-header">

            <span className="panel-eyebrow">
              MANAGEMENT
            </span>

            <h2>Quick Actions</h2>

            <p>
              Manage the main resources of the rating platform.
            </p>

          </div>


          <div className="admin-action-grid">

            <button className="admin-action-card">

              <div className="admin-action-icon">
                +
              </div>

              <div>
                <h3>Add User</h3>

                <p>
                  Create a normal user or administrator account.
                </p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>

            </button>


            <button className="admin-action-card">

              <div className="admin-action-icon">
                +
              </div>

              <div>
                <h3>Add Store</h3>

                <p>
                  Register a new store and assign an owner.
                </p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>

            </button>


            <button className="admin-action-card">

              <div className="admin-action-icon">
                U
              </div>

              <div>
                <h3>Manage Users</h3>

                <p>
                  View, search, filter, and manage users.
                </p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>

            </button>


            <button className="admin-action-card">

              <div className="admin-action-icon">
                S
              </div>

              <div>
                <h3>Manage Stores</h3>

                <p>
                  View stores, owners, and ratings.
                </p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* =================================================
            USERS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <span className="panel-eyebrow">
              USERS
            </span>

            <h2>User Management</h2>

            <p>
              Search and manage registered users and administrators.
            </p>

          </div>


          <div className="admin-toolbar">

            <div className="search-input-wrapper">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search users by name or email..."
                disabled
              />

            </div>

            <button
              className="secondary-btn"
              disabled
            >
              Filter
            </button>

          </div>


          <div className="admin-empty-state">

            <div className="state-icon">
              U
            </div>

            <h3>User management is ready</h3>

            <p>
              User records will appear here once the admin
              management API is connected.
            </p>

          </div>

        </section>


        {/* =================================================
            STORES
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <span className="panel-eyebrow">
              STORES
            </span>

            <h2>Store Management</h2>

            <p>
              View stores, owners, addresses, and ratings.
            </p>

          </div>


          <div className="admin-toolbar">

            <div className="search-input-wrapper">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search stores..."
                disabled
              />

            </div>

            <button
              className="secondary-btn"
              disabled
            >
              Sort
            </button>

          </div>


          <div className="admin-empty-state">

            <div className="state-icon">
              S
            </div>

            <h3>Store management is ready</h3>

            <p>
              Store records will appear here once the admin
              store API is connected.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;