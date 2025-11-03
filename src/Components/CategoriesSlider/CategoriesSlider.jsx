import Slider from "react-slick";
import { ClipLoader, SyncLoader } from "react-spinners";
import useCategories from "./../../customHooks/useCategories";
import Spinner from "../Spinner/Spinner";
export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const { data, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 ">
        <Spinner />
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {data.map((category) => (
        <div key={category.id} className="px-2 mb-10">
          <img
            className="w-full h-120 object-cover rounded-lg"
            src={category.image}
            alt={category.name}
          />
        </div>
      ))}
    </Slider>
  );
}
