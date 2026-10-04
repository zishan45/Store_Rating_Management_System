import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [ratingValues, setRatingValues] = useState({});

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
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load stores"
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

  const handleRatingChange = (storeId, value) => {
    setRatingValues({
      ...ratingValues,
      [storeId]: value,
    });
  };

  const handleRatingSubmit = async (store) => {
    const rating = ratingValues[store.id];

    if (!rating) {
      setError("Please select a rating between 1 and 5.");
      return;
    }

    try {
      setError("");
      setMessage("");

      if (Number(store.user_rating) > 0) {
        await api.put(`/ratings/${store.id}`, {
          rating: Number(rating),
        });

        setMessage("Rating updated successfully.");
      } else {
        await api.post("/ratings", {
          storeId: store.id,
          rating: Number(rating),
        });

        setMessage("Rating submitted successfully.");
      }

      await fetchStores(search);

      setRatingValues((previous) => {
        const updated = { ...previous };
        delete updated[store.id];
        return updated;
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save rating"
      );
    }
  };

  return (
    <div className="user-dashboard">

      <nav className="dashboard-navbar">
        <h2>Store Rating System</h2>

        <div className="navbar-right">
          <span>
            Welcome, {user?.name}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-container">

        <div className="dashboard-header">
          <h1>Store Dashboard</h1>

          <p>
            Search stores and submit your ratings.
          </p>
        </div>

        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search by store name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            Search
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setSearch("");
              fetchStores("");
            }}
          >
            Clear
          </button>
        </form>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <section className="store-section">

          <div className="section-header">
            <h2>Available Stores</h2>

            <span>
              {stores.length} store
              {stores.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="loading">
              Loading stores...
            </div>
          ) : stores.length === 0 ? (
            <div className="empty-state">
              No stores found.
            </div>
          ) : (
            <div className="store-table-wrapper">

              <table className="store-table">

                <thead>
                  <tr>
                    <th>Store Name</th>
                    <th>Address</th>
                    <th>Overall Rating</th>
                    <th>My Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {stores.map((store) => {

                    const hasRated =
                      Number(store.user_rating) > 0;

                    return (
                      <tr key={store.id}>

                        <td>
                          <strong>
                            {store.name}
                          </strong>
                        </td>

                        <td>
                          {store.address}
                        </td>

                        <td>
                          <span className="rating-display">
                            {Number(
                              store.overall_rating
                            ).toFixed(1)}{" "}
                            / 5
                          </span>
                        </td>

                        <td>
                          {hasRated
                            ? `${store.user_rating} / 5`
                            : "Not rated"}
                        </td>

                        <td>
                          <div className="rating-action">

                            <select
                              value={
                                ratingValues[
                                  store.id
                                ] || ""
                              }
                              onChange={(e) =>
                                handleRatingChange(
                                  store.id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">
                                Select rating
                              </option>

                              <option value="1">
                                1 - Poor
                              </option>

                              <option value="2">
                                2 - Fair
                              </option>

                              <option value="3">
                                3 - Good
                              </option>

                              <option value="4">
                                4 - Very Good
                              </option>

                              <option value="5">
                                5 - Excellent
                              </option>
                            </select>

                            <button
                              onClick={() =>
                                handleRatingSubmit(store)
                              }
                            >
                              {hasRated
                                ? "Modify"
                                : "Submit"}
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default UserDashboard;