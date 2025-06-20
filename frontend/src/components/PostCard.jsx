import { useState } from "react";
import api from "../api/axios";

export default function PostCard({ post, onDeleted }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/posts/${post.id}/`);
      onDeleted(post.id);  // notify parent to remove from UI
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <div className="relative border p-4 rounded bg-gray-50">
      <button
        onClick={() => setShowConfirm(true)}
        className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700 mb-2"
      >
        🗑 Delete
      </button>
      <p>{post.content}</p>
      <p className="text-xs text-gray-400 mt-1">
        by {post.creator?.username}
      </p>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4">Are you sure you want to delete this post?</p>
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
