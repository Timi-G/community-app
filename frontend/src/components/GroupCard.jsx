import { useState } from "react";
import api from "../api/axios";

export default function GroupCard({ group, onDeleted }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/groups/${group.id}/`);
      onDeleted(group.id);  // notify parent to remove from UI
    } catch (err) {
      console.error("Failed to delete group", err);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold">{group.name}</h2>
      <p className="text-gray-600">{group.description}</p>
      <p className="text-sm text-gray-400">
        Created by {group.creator?.username}
      </p>
      <button
        onClick={() => setShowConfirm(true)}
        className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
      >
        🗑 Delete
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4">Are you sure you want to delete this group?</p>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
