import "swiper/css";
import "swiper/css/pagination";

import ArticleList from "../components/ArticleList";
import Carrousel from "../components/Carrousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchBerita } from "../redux/actions/articleAction";
import { setCurrentPage } from "../redux/reducers/articleReducer";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchBerita(currentPage));
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
    <>
      <div>
        <Carrousel />
      </div>
      <div>
        {/* Hanya mempengaruhi ArticleList tanpa mereload seluruh halaman */}
        <ArticleList articles={articles} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
      </div>
    </>
  );
}

export default Home;
