import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/register/", form);
      login(res.data.token); 
      navigate("/feed");
    } catch (err) {
      setError("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Register</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {!isAuthenticated && (
      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold underline">
          Login here
        </Link>
      </p>
      )}
    </div>
  );
}
