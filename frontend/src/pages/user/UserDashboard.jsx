import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";



function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratings, setRatings] = useState({});

  const fetchStores = async (searchValue = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/stores", {
        params: {
          search: searchValue,
        },
      });

      setStores(response.data.stores || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Unable to load stores. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores(search);
  };

  const handleClear = () => {
    setSearch("");
    fetchStores("");
  };

  const handleRatingChange = (storeId, value) => {
    setRatings((prev) => ({
      ...prev,
      [storeId]: value,
    }));
  };

  const handleRatingSubmit = async (store) => {
    const selectedRating = ratings[store.id];

    if (!selectedRating) {
      alert("Please select a rating first.");
      return;
    }

    try {
      if (store.user_rating && Number(store.user_rating) > 0) {
        await api.put(`/ratings/${store.id}`, {
          rating: Number(selectedRating),
        });
      } else {
        await api.post("/ratings", {
          storeId: store.id,
          rating: Number(selectedRating),
        });
      }

      await fetchStores(search);

      setRatings((prev) => ({
        ...prev,
        [store.id]: "",
      }));
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to submit rating."
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalStores = stores.length;

  const ratedStores = stores.filter(
    (store) => Number(store.user_rating) > 0
  ).length;

  const averageRating =
    stores.length > 0
      ? (
          stores.reduce(
            (sum, store) => sum + Number(store.overall_rating || 0),
            0
          ) / stores.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="dashboard-page">

      {/* ================= NAVBAR ================= */}
      <header className="dashboard-navbar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">S</div>

          <div>
            <h2>StoreRate</h2>
            <span>Store Rating Management</span>
          </div>
        </div>

        <div className="dashboard-user-area">
          <div className="dashboard-user-info">
            <div className="dashboard-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="dashboard-user-text">
              <strong>{user?.name || "User"}</strong>
              <span>Normal User</span>
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

      {/* ================= MAIN ================= */}
      <main className="dashboard-main">

        {/* HEADER */}
        <section className="dashboard-heading">
          <div>
            <span className="dashboard-eyebrow">
              USER DASHBOARD
            </span>

            <h1>
              Discover stores.
              <br />
              Share your experience.
            </h1>

            <p>
              Find stores, check ratings, and share your
              experience with the community.
            </p>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="stat-icon">▣</div>

            <div>
              <span>Total Stores</span>
              <strong>{totalStores}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">★</div>

            <div>
              <span>Average Rating</span>
              <strong>{averageRating}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">✓</div>

            <div>
              <span>My Ratings</span>
              <strong>{ratedStores}</strong>
            </div>
          </div>

        </section>

        {/* ================= SEARCH ================= */}
        <section className="dashboard-panel">

          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">
                STORE DIRECTORY
              </span>

              <h2>Available Stores</h2>

              <p>
                Search for a store by name or address.
              </p>
            </div>
          </div>

          <form
            className="dashboard-search"
            onSubmit={handleSearch}
          >
            <div className="search-input-wrapper">
              <span className="search-icon">⌕</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by store name or address..."
              />
            </div>

            <button
              type="submit"
              className="primary-btn"
            >
              Search
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleClear}
            >
              Clear
            </button>
          </form>

          {/* ================= CONTENT ================= */}

          {loading && (
            <div className="dashboard-state">
              <div className="loading-spinner"></div>
              <p>Loading stores...</p>
            </div>
          )}

          {!loading && error && (
            <div className="dashboard-state error-state">
              <div className="state-icon">!</div>
              <h3>Something went wrong</h3>
              <p>{error}</p>

              <button
                className="primary-btn"
                onClick={() => fetchStores(search)}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && stores.length === 0 && (
            <div className="dashboard-state">
              <div className="state-icon">⌕</div>
              <h3>No stores found</h3>
              <p>
                Try searching with another store name or address.
              </p>
            </div>
          )}

          {!loading && !error && stores.length > 0 && (
            <div className="store-list">

              {stores.map((store) => {
                const hasRating =
                  Number(store.user_rating) > 0;

                return (
                  <article
                    className="store-card"
                    key={store.id}
                  >

                    <div className="store-card-main">

                      <div className="store-avatar">
                        {store.name
                          ?.charAt(0)
                          ?.toUpperCase() || "S"}
                      </div>

                      <div className="store-information">

                        <h3>{store.name}</h3>

                        <p className="store-address">
                          {store.address}
                        </p>

                        <p className="store-email">
                          {store.email}
                        </p>

                      </div>

                    </div>

                    <div className="store-rating-section">

                      <span className="rating-label">
                        Overall Rating
                      </span>

                      <div className="overall-rating">
                        <span className="rating-number">
                          {Number(
                            store.overall_rating || 0
                          ).toFixed(1)}
                        </span>

                        <span className="rating-star">
                          ★
                        </span>

                        <span className="rating-max">
                          / 5
                        </span>
                      </div>

                    </div>

                    <div className="store-my-rating">

                      <span className="rating-label">
                        My Rating
                      </span>

                      {hasRating ? (
                        <div className="my-rating-value">
                          <span>
                            {"★".repeat(
                              Number(store.user_rating)
                            )}
                          </span>

                          <small>
                            {store.user_rating}/5
                          </small>
                        </div>
                      ) : (
                        <span className="not-rated">
                          Not rated yet
                        </span>
                      )}

                    </div>

                    <div className="store-action">

                      <select
                        value={ratings[store.id] || ""}
                        onChange={(e) =>
                          handleRatingChange(
                            store.id,
                            e.target.value
                          )
                        }
                        className="rating-select"
                      >
                        <option value="">
                          Select rating
                        </option>

                        <option value="1">
                          ★ 1 - Poor
                        </option>

                        <option value="2">
                          ★★ 2 - Fair
                        </option>

                        <option value="3">
                          ★★★ 3 - Good
                        </option>

                        <option value="4">
                          ★★★★ 4 - Very Good
                        </option>

                        <option value="5">
                          ★★★★★ 5 - Excellent
                        </option>
                      </select>

                      <button
                        className="rating-btn"
                        onClick={() =>
                          handleRatingSubmit(store)
                        }
                      >
                        {hasRating
                          ? "Update Rating"
                          : "Submit Rating"}
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default UserDashboard;