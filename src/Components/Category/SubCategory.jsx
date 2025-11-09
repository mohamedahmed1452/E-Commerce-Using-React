import Spinner from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function SubCategory() {
  const { id } = useParams();

  function fetchSubCategories() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      )
      .then((res) => res.data.data)
      .catch((error) => {
        console.error("Error fetching sub-categories:", error);
      });
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ["categories", id],
    queryFn: fetchSubCategories,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <h1 className="text-center text-3xl text-red-500 mt-10">
        ❌ Something went wrong while fetching category data.
      </h1>
    );
  }

  return (
    <div className="container mx-auto mt-12 mb-24 px-5">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-lime-400 tracking-wide mb-2">
          🏷️ Popular Categories
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our top categories and find the best products curated for you.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((category) => (
          <div
            key={category._id}
            className="group bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-5 hover:shadow-2xl hover:shadow-lime-500/30 transition-all duration-300 cursor-pointer border border-neutral-700 hover:border-lime-400"
          >
            {/* Category Image */}
            <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto mb-6">
            
              <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>

            {/* Category Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{category.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
