import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import useAllProducts from "../../customHooks/useAllProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import HomeSlider from "../HomeSlider/HomeSlider";
import Spinner from "../Spinner/Spinner";
import { favoriteContext } from "../../context/FavoriteContext";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function Home() {
  const productQuery = useAllProducts();
  const { data, isError, isLoading } = productQuery;

  const { addProductToCart, removeCartItem, cartExists } =
    useContext(cartContext);
  const { addToFavorite, removeFromFavorite, isExistInFavorite } =
    useContext(favoriteContext);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError)
    return (
      <h1 className="text-center text-3xl text-red-500 font-semibold mt-10">
        ❌ Error fetching products. Please try again later.
      </h1>
    );

  const topProducts = data?.slice(0, 10);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto mt-5 px-4">
        <div className="flex flex-col gap-6">
          <HomeSlider />
          <CategoriesSlider />
        </div>
      </div>

      {/* Popular Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            🔥 Popular Products
          </h1>
          <Link
            to="/products"
            className="text-emerald-600 font-semibold hover:text-emerald-700 transition"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {topProducts?.map((product) => {
            const inCart = cartExists(product.id);
            const inFavorite = isExistInFavorite(product.id);

            return (
              <Link
                to={`/productdetails/${product.id}`}
                key={product.id}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      inFavorite
                        ? removeFromFavorite(product.id)
                        : addToFavorite(product.id);
                    }}
                    className="absolute top-3 left-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={22}
                      className={
                        inFavorite
                          ? "text-red-600 fill-red-600"
                          : "text-gray-400 hover:text-red-500"
                      }
                    />
                  </button>

                  {/* Cart Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      inCart
                        ? removeCartItem(product.id)
                        : addProductToCart(product.id);
                    }}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow hover:scale-110 transition-transform"
                  >
                    <ShoppingCart
                      size={22}
                      className={
                        inCart
                          ? "text-emerald-600 fill-emerald-600"
                          : "text-gray-400 hover:text-emerald-500"
                      }
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg truncate">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.category.name}
                    </p>
                  </div>

                  {/* Price + Rating */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-base font-semibold text-gray-700">
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="text-gray-400 line-through mr-2">
                            {product.price} EGP
                          </span>
                          <span className="text-emerald-600">
                            {product.priceAfterDiscount} EGP
                          </span>
                        </>
                      ) : (
                        <span>{product.price} EGP</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={18} fill="currentColor" />
                      <span className="text-gray-700 font-medium">
                        {product.ratingsAverage.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <Link to="/products">
            <button className="px-8 py-3 bg-emerald-600 text-white text-lg rounded-xl hover:bg-emerald-700 transition">
              Browse All Products
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
