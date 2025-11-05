import Login from "../Login/Login";
import { SyncLoader } from "react-spinners";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import Spinner from "./../Spinner/Spinner";
import useAllProducts from "../../customHooks/useAllProducts";

export default function Home() {
  const productQuery = useAllProducts();
  const { data, isError, isLoading } = productQuery;

  const { addProductToCart } = useContext(cartContext);
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center text-3xl text-red-500">
        Something went wrong error fetching data 404
      </h1>
    );
  }
  const topProducts = data?.slice(0, 10);

  return (
    <>
      <div className="container mx-auto  mt-5 ">
        <div className="flex flex-col gap-5">
          <HomeSlider />
          <CategoriesSlider />
        </div>
      </div>

      <div className="container mx-auto mb-50 mt-15">
        <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold">
          Show Popular Products
        </h1>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 relative ">
          {topProducts?.map((product) => (
            <Link to={`/productdetails/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="bg-gray-600 rounded-lg  group relative overflow-hidden"
              >
                <img
                  className="p-2 rounded-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="flex-col-reverse items-center justify-between ">
                  <h3 className="ps-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <p className="ps-3">{product.category.name}</p>
                  <div className="flex justify-between p-3 text-[20px] gap-1">
                    {product.priceAfterDiscount ? (
                      <div className="flex gap-2">
                        <span className="text-red-500 line-through">
                          {product.price}
                        </span>
                        <span >
                          {product.priceAfterDiscount}
                        </span>
                      </div>
                    ) : (
                      <p>{product.price}</p>
                    )}
                    <p >
                      <i className="text-amber-500 fa-solid fa-star "></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addProductToCart(product.id);
                    }}
                    className="text-3xl absolute top-2 right-2 translate-x-[200%] group-hover:translate-x-0 "
                  >
                    <i className="cursor-pointer text-lime-950 fa-solid fa-cart-shopping"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addProductToCart(product.id);
                    }}
                    className="text-3xl absolute top-2 left-2 -translate-x-[200%] group-hover:translate-x-0 "
                  >
                    <i className="cursor-pointer text-red-700 fa-solid fa-heart"></i>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="container mx-auto mb-50 mt-15">
          <Link to="/products">
            <button className="block mx-auto p-5 text-shadow-amber-200 text-2xl bg-neutral-600">
              Show All Products
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
