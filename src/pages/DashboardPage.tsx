import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, loading, error, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.email}</h1>

      {loading && <p>Loading user...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div>
          <button
            type="button"
            onClick={logout}
            className="mt-4 rounded bg-slate-800 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
