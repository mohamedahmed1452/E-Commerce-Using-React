import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import Spinner from "../Spinner/Spinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center  h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-2xl text-red-600 mt-20">
        ⚠️ Something went wrong — unable to fetch product details.
      </div>
    );
  }

  const product = data;

  return (
    <div className="max-w-6xl mx-auto mt-12 mb-32 px-5 md:px-10 min-h-[100vh]">
      <div className="flex flex-col md:flex-row items-start gap-10 bg-neutral-800 rounded-2xl shadow-lg p-6 md:p-10 transition-all duration-300 hover:shadow-2xl">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={product.imageCover}
            alt={product.title}
            className="rounded-xl w-full max-w-sm object-cover shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-2/3 text-gray-100 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            {product.title}
          </h1>

          <p className="text-gray-400 text-base leading-relaxed">
            {product.description}
          </p>

          <p className="text-sm text-lime-400 uppercase tracking-wide font-semibold">
            {product.category.name}
          </p>

          {/* Price and Rating */}
          <div className="flex justify-between items-center mt-3">
            {product.priceAfterDiscount ? (
              <div className="flex items-baseline gap-3">
                <span className="text-red-500 line-through text-lg">
                  {product.price} EGP
                </span>
                <span className="text-2xl font-bold text-lime-400">
                  {product.priceAfterDiscount} EGP
                </span>
              </div>
            ) : (
              <p className="text-2xl font-bold text-lime-400">
                {product.price} EGP
              </p>
            )}

            <p className="flex items-center text-yellow-400 font-semibold">
              <i className="fa-solid fa-star mr-1"></i>
              {product.ratingsAverage}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addProductToCart(product.id)}
            className="mt-6 bg-lime-500 hover:bg-lime-600 active:scale-95 transition-transform duration-150 text-white font-semibold py-3 px-5 rounded-lg shadow-md w-full md:w-auto"
          >
            <i className="fa-solid fa-cart-plus mr-2"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
