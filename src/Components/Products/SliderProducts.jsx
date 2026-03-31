import Product from "./Product"
import "./SliderProducts.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
function SliderProducts({title , data}) {
  return (
    <>
    <div className="slider-products">
        <div className="container">
            <div className="head">
                <h2>{title}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, accusamus.</p>
            </div>
        <Swiper
          loop = {true}
          slidesPerView={5}
            breakpoints={{
              0: { slidesPerView: 1},
              600: { slidesPerView: 2},
              900: { slidesPerView: 3},
              1200: { slidesPerView: 4},
              1500: { slidesPerView: 5 },
            }}
          navigation={true}
          pagination={true}
          modules={[Navigation , Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
          className="mySwiper"
        >
          {data.map((product , i) => {
            return(
              <SwiperSlide key={i}><Product product={product}/></SwiperSlide>
            )
          })}
        </Swiper>
            
        </div>
    </div>
    </>
  )
}

export default SliderProducts