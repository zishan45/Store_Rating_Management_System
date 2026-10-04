import { useAuth } from "../../context/AuthContext";

const OwnerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Store Owner Dashboard</h1>

      <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default OwnerDashboard;