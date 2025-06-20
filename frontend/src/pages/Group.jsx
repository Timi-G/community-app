import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const { user, isAuthenticated } = useAuth();
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const res = await api.get("/api/groups/");
      setGroups(res.data);
    } catch (err) {
      setError("Failed to fetch groups");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/groups/", form);
      setForm({ name: "", description: "" });
      fetchGroups(); // Refresh list
    } catch (err) {
      setError("Failed to create group");
      console.error(err);
    }
  };
  
  const handleDeleteGroup = async (id) => {
    try {
      await api.delete(`/groups/${id}/`);
      fetchGroups();
    } catch (err) {
      console.error("Group delete failed", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Group Name"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Create Group
          </button>
        </form>
      )}

      <ul className="space-y-4">
        {groups.map((group) => (
          <li key={group.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{group.name}</h2>
            <p className="text-sm text-gray-600">{group.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              Created by {group.user?.username}
            </p>
            {user?.username === group.user?.username && (
            <div className="text-right mt-2 space-x-2">
                <button onClick={() => handleDeleteGroup(group.id)} className="text-red-600">Delete</button>
            </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
