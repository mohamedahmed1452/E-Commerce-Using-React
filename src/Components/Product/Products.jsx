import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import useAllProducts from "../../customHooks/useAllProducts";
import Spinner from "../Spinner/Spinner";
import { favoriteContext } from "../../context/FavoriteContext";

export default function Products() {
  const productQuery = useAllProducts();

  const { data, isError, isLoading } = productQuery;

  const { addProductToCart, removeCartItem, cartExists } =
    useContext(cartContext);
  const { addToFavorite, removeFromFavorite, isExistInFavorite } =
    useContext(favoriteContext);

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

  return (
    <>
      <div className="container mx-auto mb-50 mt-15">
        <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold">
          Show All Products
        </h1>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 relative ">
          {data?.map((product) => (
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
                        <span>{product.priceAfterDiscount}</span>
                      </div>
                    ) : (
                      <p>{product.price}</p>
                    )}
                    <p>
                      <i className="text-amber-500 fa-solid fa-star "></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      cartExists(product.id)
                        ? removeCartItem(product.id)
                        : addProductToCart(product.id);
                    }}
                    className="text-3xl absolute top-2 right-2 translate-x-[200%] group-hover:translate-x-0 transition-transform duration-600 ease-out delay-150"
                  >
                    <i
                      className={`cursor-pointer fa-solid fa-cart-shopping ${
                        cartExists(product.id)
                          ? "fa-solid text-lime-950"
                          : "fa-regular text-gray-400"
                      } transition-colors duration-300`}
                    ></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      isExistInFavorite(product.id)
                        ? removeFromFavorite(product.id)
                        : addToFavorite(product.id);
                    }}
                    className="text-3xl absolute top-2 left-2 -translate-x-[200%] group-hover:translate-x-0 transition-transform duration-600 ease-out delay-150"
                  >
                    <i
                      className={`cursor-pointer fa-heart ${
                        isExistInFavorite(product.id)
                          ? "fa-solid text-red-600"
                          : "fa-regular text-gray-400"
                      } transition-colors duration-300`}
                    ></i>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="container mx-auto mb-50 mt-15"></div>
      </div>
    </>
  );
}
