import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteArticle, publishArticle, unpublishArticle } from "../redux/actions/adminAction";
import Error from "../components/Error";
import Loading from "../components/Loading";
import BookmarkButton from "../components/BookmarkButton";
import CommentSection from "../components/CommentSection";
import { fetchBerita, fetchPopularArticles } from "../redux/actions/articleAction";
import Sidebar from "../components/Sidebar";

function NewsDetail() {
  const { id } = useParams();
  const [articleDetail, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { articles, popularArticles } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchBerita(1));
  }, [dispatch, 1]);

  useEffect(() => {
    dispatch(fetchPopularArticles());
  }, [dispatch]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${apiUrl}/articles/detail/${id}`;
      if (user) {
        if (user.role === "admin") {
          url = `${apiUrl}/admin/articles/${id}`;
        } else if (user.role === "journalist") {
          url = `${apiUrl}/journalist/articles/${id}`;
        }
      }

      const response = await axios.get(url);
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
    return <Loading></Loading>;
  }

  if (error) {
    return <Error error={error} onRetry={fetchArticle}></Error>;
  }

  if (!articleDetail) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading text-secondary mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-gray">Mohon periksa kembali URL atau pilih artikel lain.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 dark:bg-neutral-dark dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <HelmetProvider>
          <Helmet>
            <title>{articleDetail.title}</title>
            <meta name="description" content={`Artikel tentang ${articleDetail.title}`} />
            <meta name="keywords" content={articleDetail.tags.join(", ")} />
          </Helmet>
        </HelmetProvider>

        <header className="mb-8">
          <h1 className="text-4xl font-heading text-secondary mb-4 dark:text-neutral-light">{articleDetail.title}</h1>
          {articleDetail.status == "under review" ? <p className="text-red-600 dark:text-red-400">{articleDetail.status}</p> : <p className="text-gray dark:text-gray-400">Tanggal Publikasi: {articleDetail.publishedAt}</p>}
        </header>

        <section className="mb-8">
          {articleDetail.content.map((item, index) => {
            switch (item.type) {
              case "text":
                return (
                  <p key={index} className="text-lg text-neutral-dark leading-relaxed mb-4 whitespace-pre-line dark:text-neutral-light">
                    {item.value}
                  </p>
                );
              case "subtitle":
                return (
                  <h2 key={index} className="text-2xl font-heading text-secondary mb-4 dark:text-neutral-light">
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
            {articleDetail.status === "under review" && (
              <button onClick={handlePublish} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600">
                Publish
              </button>
            )}
            {articleDetail.status === "published" && (
              <button onClick={handleUnpublish} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-600">
                Unpublish
              </button>
            )}
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600">
              Delete
            </button>
          </div>
        )}

        {user && user.role === "journalist" && articleDetail.author === user.username && (
          <div className="flex gap-4 mt-6">
            <button onClick={() => navigate(`/edit-article/${articleDetail._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
              Edit
            </button>
          </div>
        )}

        {showNotification && <div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-md shadow-md z-50">{notification}</div>}

        {user && <BookmarkButton id={articleDetail._id}></BookmarkButton>}

        <footer className="border-t pt-6 mt-8">
          <p className="text-gray dark:text-gray-400">Ditulis oleh: {articleDetail.author}</p>
          <p className="text-gray dark:text-gray-400">
            Tags:{" "}
            {articleDetail.tags.map((tag, index) => (
              <span className="cursor-pointer dark:text-neutral-light" onClick={() => navigate(`/tema/${tag}`)} key={index}>
                {tag}
                {index < articleDetail.tags.length - 1 && ", "}
              </span>
            ))}
          </p>
        </footer>

        <CommentSection article={articleDetail} user={user}></CommentSection>
      </div>
      <Sidebar editorPicks={articles} popularArticles={popularArticles} />
    </div>
  );
}

export default NewsDetail;
