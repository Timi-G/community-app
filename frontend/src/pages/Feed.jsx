import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import GroupCard from "../components/GroupCard"
import PostCard from "../components/PostCard";

export default function Feed() {
  const { isAuthenticated} = useAuth();
  const [groups, setGroups] = useState([]);
  const [postsByGroup, setPostsByGroup] = useState({});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [groupForm, setGroupForm] = useState({ name: "", description: "" });
  const [groupError, setGroupError] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await api.get("/api/groups/");
      setGroups(res.data);
      res.data.forEach((group) => fetchPosts(group.id));
    } catch (err) {
      console.error("Failed to fetch groups", err);
    }
  };

  const fetchPosts = async (groupId) => {
    try {
      const res = await api.get(`/api/posts/?group=${groupId}`);
      setPostsByGroup((prev) => ({ ...prev, [groupId]: res.data }));
    } catch (err) {
      console.error(`Failed to fetch posts for group ${groupId}`, err);
    }
  };

  const handlePostChange = (groupId, value) => {
    setFormData((prev) => ({ ...prev, [groupId]: value }));
  };

  const handlePostSubmit = async (e, groupId) => {
    e.preventDefault();
    const content = formData[groupId]?.trim();

    if (!content) return;

    try {
      await api.post("/api/posts/", {
        group: groupId,
        content,
      });

      const res = await api.get(`/api/posts/?group=${groupId}`);
      setPostsByGroup((prev) => ({ ...prev, [groupId]: res.data }));

      setFormData((prev) => ({ ...prev, [groupId]: "" }));

      setShowPostForm((prev) => ({
        ...prev,
        [groupId]: false,
      }));
    } catch (err) {
      console.error("Failed to post:", err);
    }
  };

  const handleGroupCreate = async (e) => {
    e.preventDefault();
    setGroupError("");

    try {
      await api.post("/api/groups/", groupForm);
      setGroupForm({ name: "", description: "" });
      fetchGroups();
      setShowCreateGroup(false);
    } catch (err) {
      console.error("Failed to create group", err);
      setGroupError("Group creation failed.");
    };
  };

  const toggleGroupPosts = (groupId) => {
    setExpandedGroups((prev) =>
    prev.includes(groupId)
      ? prev.filter((id) => id !== groupId)
      : [...prev, groupId]
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Community Feed */}
      <h1 className="text-3xl font-bold mb-4">Community Feed</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Groups */}
      {isAuthenticated && (
      <div className="border p-4 rounded shadow mb-6">
        <button
          className="text-left font-semibold text-blue-600 mb-2"
          onClick={() => setShowCreateGroup(!showCreateGroup)}
        >
          {showCreateGroup ? "➖ Cancel Create Group" : "➕ Create Group"}
        </button>

        {showCreateGroup && (
          <form onSubmit={handleGroupCreate} className="space-y-2">
            {groupError && <p className="text-red-500">{groupError}</p>}
            <input
              type="text"
              placeholder="Group Name"
              value={groupForm.name}
              onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
            <textarea
              placeholder="Group Description"
              value={groupForm.description}
              onChange={(e) =>
                setGroupForm({ ...groupForm, description: e.target.value })
              }
              className="w-full border rounded p-2"
              rows={3}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create Group
            </button>
          </form>
        )}
      </div>
      )}

      {groups.length === 0 ? (
        <p className="text-gray-500">No groups yet.</p>
      ) : (
        groups.map((group) => (
          <div key={group.id} className="border rounded p-4 shadow space-y-3">
            <GroupCard
            key={group.id}
            group={group}
            onDeleted={(id) => setGroups(groups.filter((g) => g.id !== id))}
            />

            {/* Posts */}
            {isAuthenticated && (
            <div className="mb-2">
              <button
                onClick={() =>
                  setShowPostForm((prev) => ({
                    ...prev,
                    [group.id]: !prev[group.id],
                  }))
                }
                className="text-blue-600 font-medium"
              >
                {showPostForm[group.id] ? "➖ Cancel Post" : "➕ Create Post"}
              </button>

              {showPostForm[group.id] && (
                <form onSubmit={(e) => handlePostSubmit(e, group.id)} className="mt-2 space-y-2">
                  <textarea
                    className="w-full border rounded p-2"
                    placeholder="Write a post..."
                    value={formData[group.id] || ""}
                    onChange={(e) => handlePostChange(group.id, e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Post
                  </button>
                </form>
              )}
            </div>
            )}

            
            <button onClick={() => toggleGroupPosts(group.id)} className="text-blue-500 text-sm mt-2">
              {expandedGroups.includes(group.id) ? "Hide Posts" : "View Posts"}
            </button>

            {expandedGroups.includes(group.id)&& (
              <ul className="space-y-3">
                {(postsByGroup[group.id] || []).map((post) => (
                  <li key={post.id}>
                    <PostCard
                      key={post.id}
                      post={post}
                      onDeleted={(id) =>
                        setPostsByGroup((prev) => ({
                          ...prev,
                          [group.id]: prev[group.id].filter((p) => p.id !== id),
                        }))
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}
