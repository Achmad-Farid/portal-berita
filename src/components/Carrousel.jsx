import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function Carrousel() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center pb-4 gap-4 flex flex-col">
        <h1 className="text-3xl">Headline</h1>
        <h5 className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum ipsum dolorem nihil illum ipsa sit magni, libero quasi sequi beatae!</h5>
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
        <SwiperSlide>
          <div className="bg-blue-500 h-64 flex items-center justify-center text-white">Item 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-green-500 h-64 flex items-center justify-center text-white">Item 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-red-500 h-64 flex items-center justify-center text-white">Item 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-500 h-64 flex items-center justify-center text-white">Item 4</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carrousel;
