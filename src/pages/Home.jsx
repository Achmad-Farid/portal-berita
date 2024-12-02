import "swiper/css";
import "swiper/css/pagination";

import ArticleList from "../components/ArticleList";
import Carrousel from "../components/Carrousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchBerita, fetchPopularArticles } from "../redux/actions/articleAction";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import { useEffect } from "react";
import Sidebar from "../components/SideBar";

function Home() {
  const dispatch = useDispatch();
  const { articles, terkini, popularArticles, currentPage, totalPages, status, error, isLoading, popularError } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchBerita(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(fetchPopularArticles());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  function retry() {
    dispatch(fetchBerita());
  }

  return (
    <>
      <div className="mt-4">
        <div className="text-center flex flex-col">
          <h1 className="text-3xl font-heading font-bold text-secondary text-center">Selamat Datang di Portal Berita Kami</h1>
          <h5 className="text-base text-gray">Temukan berita terkini, terpercaya, dan informatif dari berbagai topik pilihan untuk menambah wawasan Anda.</h5>
        </div>
        <Carrousel popularArticles={popularArticles} isLoading={isLoading} popularError={popularError} />
      </div>
      <div className="container mx-auto p-4 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Konten Utama */}
        <main className="w-full md:w-3/4">
          <div className="text-center gap-4 flex flex-col mb-6">
            <h1 className="text-3xl font-heading font-bold text-secondary text-center">Artikel Terbaru</h1>
          </div>
          <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} error={error} status={status} retry={retry} />
        </main>

        {/* Sidebar */}
        <Sidebar editorPicks={terkini} popularArticles={popularArticles} />
      </div>
    </>
  );
}

export default Home;
