import React, { useEffect } from "react";
import ArticleList from "../components/ArticleList";
import { useParams } from "react-router-dom";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import { searchArticles } from "../redux/actions/articleAction";
import { useDispatch, useSelector } from "react-redux";

function SearchResult() {
  const { query } = useParams();
  const { articles, currentPage, totalPages, status, error } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchArticles({ page: 1, limit: 9, query: query }));
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  function retry() {
    dispatch(searchArticles({ page: 1, limit: 9, query: query }));
  }
  return (
    <div className="mt-4">
      <div className="text-center  gap-4 flex flex-col">
        <h1 className="text-3xl font-heading font-bold text-secondary text-center">Hasil Pencarian : {query}</h1>
      </div>
      <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} error={error} status={status} retry={retry} />
    </div>
  );
}

export default SearchResult;
