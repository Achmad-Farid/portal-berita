import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import { fetchAllBerita } from "../redux/actions/adminAction";
import ArticleList from "../components/ArticleList";

const BeritaContent = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, status, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllBerita(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
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
      {/* Search and Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded w-full max-w-xs" />
        <select className="border p-2 rounded">
          <option value="published">Published</option>
          <option value="underReview">Under Review</option>
        </select>
      </div>

      {/* articles*/}
      <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default BeritaContent;
