import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import ArticleList from "../components/ArticleList";
import { fetchBerita } from "../redux/actions/journalistAction";

const BeritaContent = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, status, error } = useSelector((state) => state.journalist);

  useEffect(() => {
    dispatch(fetchBerita(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  function retry() {
    dispatch(fetchBerita());
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Berita</h2>
      {/* Search and Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded w-full max-w-xs" />
        <select className="border p-2 rounded">
          <option value="published">Published</option>
          <option value="underReview">Under Review</option>
        </select>
      </div>

      {/* articles*/}
      <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} error={error} status={status} retry={retry} />
    </div>
  );
};

export default BeritaContent;
