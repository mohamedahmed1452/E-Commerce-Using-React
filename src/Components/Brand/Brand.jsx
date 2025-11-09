import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

export default function Brand() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brandData"],
    queryFn: () =>
      axios
        .get("https://ecommerce.routemisr.com/api/v1/brands")
        .then((res) => res.data.data),
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
        ❌ Something went wrong while fetching brand data.
      </h1>
    );
  }

  return (
    <div className="container mx-auto mt-10 mb-24 px-5">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-lime-400 tracking-wide mb-2">
          Explore Our Brands
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover top global brands offering the best products and quality you can trust.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((brand) => (
          <Link
            to={`/brandDetails/${brand._id}`}
            key={brand._id}
            className="group bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-lime-500/20 transition-all duration-300 border border-neutral-700 hover:border-lime-400"
          >
            {/* Brand Image */}
            <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto mb-6">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-fill rounded-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>

            {/* Brand Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                {brand.name}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{brand.slug}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
