import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import ArticleList from "../components/ArticleList";
import { fetchArticles, fetchBerita, searchArticles } from "../redux/actions/journalistAction";

const BeritaContent = ({ username }) => {
  const dispatch = useDispatch();

  // Redux state
  const { articles, currentPage, totalPages, status, error } = useSelector((state) => state.journalist);

  // State lokal untuk pencarian dan filter status
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch artikel berdasarkan status atau pencarian saat komponen di-mount atau ada perubahan filter
  useEffect(() => {
    if (searchQuery) {
      // Jika ada query pencarian
      dispatch(searchArticles({ query: searchQuery, page: currentPage, limit: 10 }));
    } else if (filterStatus === "all") {
      // Jika filter status adalah 'all', ambil semua artikel
      dispatch(fetchBerita({ page: currentPage, limit: 10 }));
    } else {
      // Jika filter status spesifik (published/under review)
      dispatch(fetchArticles({ status: filterStatus, page: currentPage, limit: 10, username }));
    }
  }, [dispatch, currentPage, filterStatus, searchQuery, username]);

  // Handle perubahan halaman
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    if (searchQuery) {
      dispatch(searchArticles({ query: searchQuery, page, limit: 10 }));
    } else if (filterStatus === "all") {
      dispatch(fetchBerita({ page, limit: 10 }));
    } else {
      dispatch(fetchArticles({ status: filterStatus, page, limit: 10, username }));
    }
  };

  // Retry jika gagal
  const retry = () => {
    if (searchQuery) {
      dispatch(searchArticles({ query: searchQuery, page: currentPage, limit: 10 }));
    } else if (filterStatus === "all") {
      dispatch(fetchBerita({ page: currentPage, limit: 10 }));
    } else {
      dispatch(fetchArticles({ status: filterStatus, page: currentPage, limit: 10, username }));
    }
  };

  return (
    <div className="p-6 bg-neutral-light dark:bg-background-dark text-neutral-dark dark:text-text-dark">
      <h2 className="text-xl font-bold mb-4">Berita</h2>

      {/* Search dan Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full max-w-xs bg-white dark:bg-neutral-dark text-neutral-dark dark:text-text-dark placeholder-gray-400 dark:placeholder-gray-600"
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setSearchQuery(""); // Reset pencarian saat filter berubah
          }}
          className="border p-2 rounded bg-white dark:bg-neutral-dark text-neutral-dark dark:text-text-dark"
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="under review">Under Review</option>
        </select>
      </div>

      {/* Daftar Artikel */}
      <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} error={error} status={status} retry={retry} />
    </div>
  );
};

export default BeritaContent;
