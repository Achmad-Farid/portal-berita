import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBerita } from "../redux/actions/journalistAction"; // Pastikan pathnya sesuai dengan actions Anda
import { setCurrentPage } from "../redux/reducers/journalistReducer";
import ArticleList from "../components/ArticleList"; // Impor komponen ArticleList

const BeritaContent = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, articlesPerPage, status, error } = useSelector((state) => state.journalist);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBerita()); // Mengambil data artikel dari API atau sumber lain
    }
  }, [dispatch, status]);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber)); // Mengupdate halaman aktif di Redux
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Berita</h2>

      {/* Pencarian dan Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded w-full max-w-xs" />
        <select className="border p-2 rounded">
          <option value="published">Published</option>
          <option value="underReview">Under Review</option>
        </select>
      </div>

      <ArticleList articles={articles} currentPage={currentPage} articlesPerPage={articlesPerPage} paginate={paginate} />
    </div>
  );
};

export default BeritaContent;
