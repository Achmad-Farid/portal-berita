import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/default-profile.png";
import ArticleList from "../components/ArticleList";
import { fetchBookmarkedArticles } from "../redux/actions/userAction";
import { setCurrentPage } from "../redux/reducers/userReducer";

function Profile() {
  const [activeTab, setActiveTab] = useState("user");
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBookmarkedArticles());
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  function retry() {
    dispatch(fetchBookmarkedArticles());
  }

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-neutral-dark p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button onClick={() => setActiveTab("user")} className={`px-4 py-2 font-semibold ${activeTab === "user" ? "text-secondary" : "text-gray dark:text-gray-400"}`}>
            User
          </button>
          <button onClick={() => setActiveTab("articles")} className={`px-4 py-2 font-semibold ${activeTab === "articles" ? "text-secondary" : "text-gray dark:text-gray-400"}`}>
            Artikel yang Ditandai
          </button>
        </div>

        {/* Content */}
        {activeTab === "user" ? (
          <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <img crossOrigin="anonymous" src={user?.profilePicture || defaultProfileImage} alt="Foto Profil" className="w-24 h-24 rounded-full mb-4" />
              <h2 className="text-xl font-heading text-neutral-dark dark:text-text-dark mb-2">{user?.username || "Pengguna Tanpa Nama"}</h2>
              <p className="text-gray dark:text-text-dark">{user?.email || "Email tidak tersedia"}</p>

              {/* Conditional Buttons based on Role */}
              {user?.role === "admin" && (
                <button onClick={() => navigate("/admin")} className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg">
                  Admin Dashboard
                </button>
              )}
              {user?.role === "journalist" && (
                <button onClick={() => navigate("/journalist")} className="mt-4 px-6 py-2 bg-accent text-white rounded-lg">
                  Journalist Tools
                </button>
              )}

              <button onClick={handleLogout} className="mt-4 px-6 py-2 bg-primary text-white rounded-lg">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} error={error} status={status} retry={retry} />
        )}
      </div>
    </div>
  );
}

export default Profile;
