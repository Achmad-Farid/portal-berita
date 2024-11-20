import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteArticle, publishArticle, unpublishArticle } from "../redux/actions/adminAction";

function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // State untuk notifikasi
  const [showNotification, setShowNotification] = useState(false); // Kontrol tampilan notifikasi

  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiUrl}/articles/${id}`);
      setArticle(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleNotification = (message) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handlePublish = async () => {
    await dispatch(publishArticle(id));

    fetchArticle();

    handleNotification("Artikel berhasil dipublish!");
  };

  const handleUnpublish = async () => {
    await dispatch(unpublishArticle(id));

    fetchArticle();

    handleNotification("Artikel berhasil diunpublish!");
  };

  const handleDelete = async () => {
    await dispatch(deleteArticle(id));

    fetchArticle();

    handleNotification("Artikel berhasil dihapus!");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray">Sedang memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading text-secondary mb-4">Terjadi Kesalahan</h1>
        <p className="text-gray">{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading text-secondary mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-gray">Mohon periksa kembali URL atau pilih artikel lain.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HelmetProvider>
        <Helmet>
          <title>{article.title}</title>
          <meta name="description" content={`Artikel tentang ${article.title}`} />
          <meta name="keywords" content={article.tags.join(", ")} />
        </Helmet>
      </HelmetProvider>

      <header className="mb-8">
        <h1 className="text-4xl font-heading text-secondary mb-4">{article.title}</h1>
        <p className="text-gray">Tanggal Publikasi: {article.publishedAt}</p>
      </header>

      <section className="mb-8">
        {article.content.map((item, index) => {
          switch (item.type) {
            case "text":
              return (
                <p key={index} className="text-lg text-neutral-dark leading-relaxed mb-4 whitespace-pre-line">
                  {item.value}
                </p>
              );
            case "subtitle":
              return (
                <h2 key={index} className="text-2xl font-heading text-secondary mb-4">
                  {item.value}
                </h2>
              );
            case "image":
              return <img key={index} src={item.value} alt="Deskripsi gambar" className="w-full h-auto object-cover mb-4 rounded-lg shadow-md" />;
            default:
              return null;
          }
        })}
      </section>

      {user && user.role === "admin" && (
        <div className="flex gap-4 mt-6">
          {article.status === "under review" && (
            <button onClick={handlePublish} className="px-4 py-2 bg-green-500 text-white rounded-md">
              Publish
            </button>
          )}
          {article.status === "published" && (
            <button onClick={handleUnpublish} className="px-4 py-2 bg-yellow-500 text-white rounded-md">
              Unpublish
            </button>
          )}
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">
            Delete
          </button>
        </div>
      )}

      {showNotification && <div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-md shadow-md z-50">{notification}</div>}

      <footer className="border-t pt-6 mt-8">
        <p className="text-gray">Ditulis oleh: {article.author}</p>
        <p className="text-gray">Tags: {article.tags.join(", ")}</p>
      </footer>
    </div>
  );
}

export default NewsDetail;
