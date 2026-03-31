import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination } from 'swiper/modules';
import "./slider.css";
import {Link} from "react-router";
// Images
import hero1 from "../../Images/banner_Hero1.jpg";
import hero2 from "../../Images/banner_Hero2.jpg";
import hero3 from "../../Images/banner_Hero3.jpg";
function Slider() {
  return (
    <>
    <div className="slider">
      <div className="container">
        <Swiper
          loop = {true}
          pagination={true} modules={[Pagination, Autoplay]} className="mySwiper"
          autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        >
            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Microsoft Xbox
                  <br />
                  360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to={"/"} className='btn'>Shop Now</Link>
              </div>
              <img src={hero1} alt="Slider Img 1" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Microsoft Xbox
                  <br />
                  360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to="/" className='btn'>Shop Now</Link>
              </div>
              <img src={hero2} alt="Slider Img 2" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Microsoft Xbox
                  <br />
                  360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to={"/"} className='btn'>Shop Now</Link>
              </div>
              <img src={hero3} alt="Slider Img 3" />
            </SwiperSlide>
        </Swiper>
      </div>
    </div>
    </>
  )
}

export default Slider 