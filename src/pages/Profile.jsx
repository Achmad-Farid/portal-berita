import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/default-profile.png";

function Profile() {
  const [activeTab, setActiveTab] = useState("user");
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout()); // Tambahkan await untuk menunggu proses logout selesai
      navigate("/"); // Arahkan pengguna ke halaman utama setelah logout
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button onClick={() => setActiveTab("user")} className={`px-4 py-2 font-semibold ${activeTab === "user" ? "text-secondary" : "text-gray"}`}>
            User
          </button>
          <button onClick={() => setActiveTab("articles")} className={`px-4 py-2 font-semibold ${activeTab === "articles" ? "text-secondary" : "text-gray"}`}>
            Artikel yang Ditandai
          </button>
        </div>

        {/* Content */}
        {activeTab === "user" ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <img
                src={user?.profilePicture || defaultProfileImage} // Ganti dengan path gambar default jika kosong
                alt="Foto Profil"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-heading mb-2">{user?.username || "Pengguna Tanpa Nama"}</h2>
              <p className="text-gray">{user?.email || "Email tidak tersedia"}</p>
              <button onClick={handleLogout} className="mt-4 px-6 py-2 bg-primary text-white rounded-lg">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Kartu Artikel */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-heading text-lg mb-2 text-neutral-dark">Judul Artikel 1</h3>
              <p className="text-gray mb-4">Deskripsi singkat artikel ini.</p>
              <button className="text-accent font-semibold">Baca Selengkapnya</button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-heading text-lg mb-2 text-neutral-dark">Judul Artikel 2</h3>
              <p className="text-gray mb-4">Deskripsi singkat artikel ini.</p>
              <button className="text-accent font-semibold">Baca Selengkapnya</button>
            </div>
            {/* Tambahkan lebih banyak kartu artikel jika diperlukan */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
