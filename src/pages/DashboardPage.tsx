import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

type User = {
  email: string;
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Missing access token.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (err) {
        setError("Unable to load user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {loading && <p>Loading user...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div>
          <p>Logged in as:</p>
          <p className="font-semibold">{user?.email ?? "Unknown user"}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded bg-slate-800 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
