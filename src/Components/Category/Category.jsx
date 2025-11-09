import Spinner from "../Spinner/Spinner";
import useCategories from "../../customHooks/useCategories";
import { Link } from "react-router-dom";

export default function Category() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
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
          <Link key={category._id} to={`/subcategory/${category._id}`}>
            <div className="group bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-5 hover:shadow-2xl hover:shadow-lime-500/30 transition-all duration-300 cursor-pointer border border-neutral-700 hover:border-lime-400">
              {/* Category Image */}
              <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto mb-6">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-fill rounded-full transition-transform duration-500 group-hover:scale-105"
                />
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
          </Link>
        ))}
      </div>
    </div>
  );
}
