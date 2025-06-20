import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function GroupDetail() {
    const { groupId } = useParams();
    const { isAuthenticated, user } = useAuth();
    const [group, setGroup] = useState(null);
    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({ content: "" });

    const fetchGroup = async () => {
        const res = await api.get(`/groups/${groupId}/`);
        setGroup(res.data);
    };

    const fetchPosts = async () => {
        const res = await api.get(`/posts/?group=${groupId}`);
        setPosts(res.data);
    };

    useEffect(() => {
        fetchGroup();
        fetchPosts();
    }, [groupId]);

    const handlePost = async (e) => {
        e.preventDefault();
        try {
        await api.post("/api/posts/", {
            content: form.content,
            group: groupId,
        });
        setForm({ content: "" });
        fetchPosts();
        } catch (err) {
        console.error("Failed to post:", err);
        }
    };

  
    const handleDeletePost = async (id) => {
    try {
        await api.delete(`/posts/${id}/`);
        fetchPosts();
    } catch (err) {
        console.error("Delete failed", err);
    }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
        {group && (
            <>
            <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
            <p className="text-gray-600 mb-4">{group.description}</p>
            </>
        )}

        {isAuthenticated && (
            <form onSubmit={handlePost} className="mb-6">
            <textarea
                className="w-full border p-2 rounded"
                name="content"
                value={form.content}
                onChange={(e) => setForm({ content: e.target.value })}
                placeholder="Write your post..."
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
                Post
            </button>
            </form>
        )}

        <ul className="space-y-4">
            {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
                <p>{post.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                by {post.user?.username}
                </p>
                {user?.username === post.user?.username && (
                <div className="text-right mt-2 space-x-2">
                    <button onClick={() => handleDeletePost(post.id)} className="text-red-600">Delete</button>
                </div>
                )}
            </li>
            ))}
        </ul>
        </div>
    );
}
