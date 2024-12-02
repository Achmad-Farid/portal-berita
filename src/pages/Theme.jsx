import "swiper/css";
import "swiper/css/pagination";

import ArticleList from "../components/ArticleList";
import Carrousel from "../components/Carrousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticlesByTheme, fetchBerita } from "../redux/actions/articleAction";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

function Theme() {
  const dispatch = useDispatch();
  const { articlesTheme, articles, popularTheme, currentPage, totalPages, status, error, isLoading } = useSelector((state) => state.articles);
  const { categoryOrTag } = useParams();

  useEffect(() => {
    dispatch(fetchBerita(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticlesByTheme({ categoryOrTag }));
  }, [dispatch, categoryOrTag]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  function retry() {
    dispatch(fetchArticlesByTheme({ categoryOrTag }));
  }
  return (
    <>
      <div className="mt-4">
        <div className="text-center flex flex-col">
          <h1 className="text-3xl font-heading font-bold text-secondary text-center">Terpopuler di {categoryOrTag}</h1>
        </div>
        <Carrousel popularArticles={popularTheme} isLoading={isLoading} popularError={error} />
      </div>
      <div className="container mx-auto p-4 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Konten Utama */}
        <main className="w-full md:w-3/4">
          <div className="text-center gap-4 flex flex-col mb-6">
            <h1 className="text-3xl font-heading font-bold text-secondary text-center">Artikel {categoryOrTag} Terbaru</h1>
          </div>
          <ArticleList articles={articlesTheme} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} error={error} status={status} retry={retry} />
        </main>

        {/* Sidebar */}
        <Sidebar editorPicks={articles} popularArticles={popularTheme} />
      </div>
    </>
  );
}

export default Theme;
