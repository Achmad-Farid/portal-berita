import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function Carrousel() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center pb-4 gap-4 flex flex-col">
        <h1 className="text-3xl font-heading font-bold text-secondary text-center">Headline</h1>
        <h5 className="text-base text-gray">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum ipsum dolorem nihil illum ipsa sit magni, libero quasi sequi beatae!</h5>
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
          <div className="bg-primary h-64 flex items-center justify-center text-white rounded-lg shadow-md">Item 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-accent h-64 flex items-center justify-center text-white rounded-lg shadow-md">Item 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-secondary h-64 flex items-center justify-center text-white rounded-lg shadow-md">Item 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-primary h-64 flex items-center justify-center text-white rounded-lg shadow-md">Item 4</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carrousel;
