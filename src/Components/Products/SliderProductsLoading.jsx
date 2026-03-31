import "./SliderProducts.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

function SliderProductsLoading() {
    return (
        <div className="slider-products">
            <div className="container">
                <div className="head">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-subtitle"></div>
                </div>
                <Swiper
                    loop={true}
                    slidesPerView={5}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        600: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 },
                        1500: { slidesPerView: 5 },
                    }}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className="card skeleton-card">
                                <div className="image">
                                    <div className="skeleton"></div>
                                </div>
                                <div className="name skeleton"></div>
                                <div className="stars">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="skeleton"></div>
                                    ))}
                                </div>
                                <div className="price skeleton"></div>
                                <div className="icons">
                                    <span className="skeleton"></span>
                                    <span className="skeleton"></span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default SliderProductsLoading;