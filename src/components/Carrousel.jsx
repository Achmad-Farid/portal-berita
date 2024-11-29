import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchPopularArticles } from "../redux/actions/articleAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

function Carrousel() {
  const dispatch = useDispatch();
  const { popularArticles, isLoading, popularError } = useSelector((state) => state.articles);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPopularArticles());
  }, [dispatch]);

  function retry() {
    dispatch(fetchPopularArticles());
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (popularError) {
    return <Error message={popularError} retry={retry}></Error>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center pb-4 gap-4 flex flex-col">
        <h1 className="text-3xl font-heading font-bold text-secondary text-center">Selamat Datang di Portal Berita Kami</h1>
        <h5 className="text-base text-gray">Temukan berita terkini, terpercaya, dan informatif dari berbagai topik pilihan untuk menambah wawasan Anda.</h5>
      </div>
      <Swiper
        slidesPerView={1} // Default 1 item
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2, // 2 items for screens larger than 640px
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {popularArticles &&
          popularArticles.map((item) => (
            <SwiperSlide className="cursor-pointer" onClick={() => navigate(`/detail/${item._id}`)} key={item._id}>
              <div className="bg-primary h-64 relative rounded-lg shadow-md overflow-hidden">
                {item.content.find((contentItem) => contentItem.type === "image")?.value ? (
                  <img src={item.content.find((contentItem) => contentItem.type === "image")?.value} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">No Image Available</p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Carrousel;
