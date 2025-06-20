import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login/", form); // Replace with actual login route if different
      login(res.data.token);
      navigate("/feed"); // Redirect after login
    } catch (err) {
      setError("Invalid credentials");
      console.error(err.response || err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {!isAuthenticated && (
      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold underline">
          Sign up here
        </Link>
      </p>
      )}
    </div>
  );
}
