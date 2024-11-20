import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import { fetchAllBerita, fetchUnderBerita, fetchSearchArticles } from "../redux/actions/adminAction";
import ArticleList from "../components/ArticleList";

const BeritaContent = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, status, error } = useSelector((state) => state.admin);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (searchQuery === "") {
      if (filter === "all") {
        dispatch(fetchAllBerita(currentPage));
      } else if (filter === "underReview") {
        dispatch(fetchUnderBerita(currentPage));
      }
    }
  }, [dispatch, currentPage, searchQuery, filter]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      dispatch(fetchSearchArticles({ query: searchQuery, currentPage }));
    } else {
      if (filter === "all") {
        dispatch(fetchAllBerita(currentPage));
      } else if (filter === "underReview") {
        dispatch(fetchUnderBerita(currentPage));
      }
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update filter state
    dispatch(setCurrentPage(1)); // Reset to page 1 when filter changes
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
        <input type="text" placeholder="Search..." className="border p-2 rounded w-full max-w-xs" value={searchQuery} onChange={handleSearchChange} />
        <button onClick={handleSearchClick} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={handleFilterChange} // Handle filter change
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="underReview">Under Review</option>
        </select>
      </div>

      {/* Articles */}
      <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default BeritaContent;
