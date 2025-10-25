import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";

export default function ProductDetails() {
  const res = useParams();

  const dataQuery = useQuery({
    queryKey: ["productDetails", res.id],
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/products/${res.id}`)
        .then((res) => res.data.data),
  });
  const { data, isError, isLoading } = dataQuery;
  const product = data;

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <SyncLoader />
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
      <div
        key={product.id}
        className="flex flex-col md:flex-row justify-around items-center 
             max-w-7xl mx-auto p-5 md:p-10 
             mb-40 mt-6 bg-white rounded-xl shadow-md "
      >

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <img
            className="rounded-md w-full h-full "
            src={product.imageCover}
            alt={product.title}
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-3/4 md:pl-10 flex flex-col justify-between">
          <h1 className="font-bold text-xl md:text-2xl mb-3">
            {product.title}
          </h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">{product.category.name}</p>

          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-lg">${product.price}</p>
            <p className="text-yellow-500 font-medium">
              ⭐ {product.ratingsAverage}
            </p>
          </div>

          <button className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 rounded-lg w-full">
            +Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
