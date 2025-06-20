import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/feed">
        <h1 className="text-xl font-bold">🌐 JendZ </h1>
      </Link>

      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm">Welcome, {user?.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
