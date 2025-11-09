import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/img/slider-image-1.jpeg";
import img2 from "../../assets/img/slider-image-2.jpeg";
import img3 from "../../assets/img/slider-image-3.jpeg";
import img4 from "../../assets/img/slider-2.jpeg";


export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    
    
  };
  return (
    <div className="flex mb-5 mt-5 ">
      <div className="w-3/4 ">
        <Slider {...settings}>
          <div>
            <img className="w-full h-120" src={img1} alt="vagetables" />
          </div>
          <div>
            <img className="w-full h-120" src={img2} alt="vagetables" />
          </div>
          <div>
            <img className="w-full h-120" src={img3} alt="vagetables" />
          </div>
          <div>
            <img className="w-full h-120" src={img4} alt="vagetables" />
          </div>
        </Slider>
      </div>

      <div className="w-1/4 flex flex-col ">
        <img className="w-full h-60 " src={img3} alt="" />
        <img className="w-full h-60 " src={img2} alt="" />
      </div>
    </div>
  );
}
