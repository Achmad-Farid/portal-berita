import "swiper/css";
import "swiper/css/pagination";

import ArticleList from "../components/ArticleList";
import Carrousel from "../components/Carrousel";

function Home() {
  return (
    <>
      <div>
        <Carrousel></Carrousel>
      </div>
      <div>
        <ArticleList></ArticleList>
      </div>
    </>
  );
}

export default Home;
