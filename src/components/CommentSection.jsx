import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ article, user }) => {
  const [comments, setComments] = useState(article.comments || []);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fungsi untuk mengurutkan komentar dari yang terbaru
  const sortComments = (comments) => {
    return comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${apiUrl}/user/${article._id}/comments`, { content: newComment });

      const addedComment = response.data.article.comments.pop();
      // Tambahkan komentar baru dan urutkan kembali
      setComments((prev) => sortComments([...prev, addedComment]));
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while adding the comment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    setError("");

    try {
      await axios.delete(`${apiUrl}/user/${article._id}/comments/${commentId}`);

      // Hapus komentar dan urutkan ulang
      setComments((prev) => sortComments(prev.filter((comment) => comment._id !== commentId)));
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while deleting the comment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Urutkan komentar saat pertama kali di-load
    setComments(sortComments(comments));
  }, [comments]);

  return (
    <div className="bg-neutral-light dark:bg-neutral-dark p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-secondary dark:text-secondary-dark font-heading text-xl mb-4">Comments</h2>

      {/* Form untuk menambahkan komentar */}
      {user ? (
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            className="w-full bg-white dark:bg-neutral-dark border border-gray dark:border-gray-600 rounded-lg p-4 text-neutral-dark dark:text-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="4"
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={loading}
          ></textarea>
          <button
            type="submit"
            className={`mt-2 ${loading ? "bg-gray cursor-not-allowed" : "bg-primary hover:bg-secondary"} dark:bg-primary dark:hover:bg-secondary text-white font-heading px-6 py-2 rounded-lg shadow transition`}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <button onClick={() => navigate("/login")} className="bg-primary dark:bg-primary text-white font-heading px-6 py-2 rounded-lg shadow hover:bg-secondary dark:hover:bg-secondary transition mb-4">
          Log in to comment
        </button>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Daftar komentar */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow flex justify-between items-start">
            <div>
              <p className="text-neutral-dark dark:text-white font-sans text-sm">{comment.content}</p>
              <span className="text-gray dark:text-gray-400 text-xs">{`Posted by ${comment.author || "Anonymous"} on ${new Date(comment.createdAt).toLocaleDateString()}`}</span>
            </div>
            {(user?.role !== "admin" && user?.username === comment.author) || user?.role === "admin" ? (
              <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 dark:text-red-400 text-sm hover:underline" disabled={loading}>
                Delete
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
