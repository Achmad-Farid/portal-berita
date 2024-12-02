import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Loading from "./Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

function Carrousel({ popularArticles, isLoading, popularError }) {
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (popularError) {
    return <Error message={popularError} retry={retry}></Error>;
  }

  return (
    <div className="container mx-auto p-4">
      {popularArticles.length === 0 ? (
        <div className="text-center text-neutral-dark">
          <p className="text-2xl font-semibold text-accent mb-4">Oops! No articles available.</p>
          <p className="text-lg text-gray-500">Try again later or check out other sections of the website.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Carrousel;
