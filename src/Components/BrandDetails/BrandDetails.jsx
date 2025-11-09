import { Link, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { favoriteContext } from "../../context/FavoriteContext";
import useAllProducts from "../../customHooks/useAllProducts";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function BrandDetails() {
  const { id } = useParams();
  const { data, isError, isLoading } = useAllProducts();

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
        ❌ Something went wrong — failed to fetch products.
      </h1>
    );

  const productsBrand = data.filter((product) => product.brand._id === id);

  if (!productsBrand.length) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          😕 No products found for this brand
        </h2>
        <p className="text-gray-500 mt-2">
          Try exploring other brands instead!
        </p>
        <Link
          to="/brand"
          className="mt-5 px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-lg hover:shadow-lg transition"
        >
          Back to Brands
        </Link>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent mb-12 drop-shadow-sm">
        🛍️ Brand Products
      </h1>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productsBrand.map((product) => {
          const inCart = cartExists(product.id);
          const inFavorite = isExistInFavorite(product.id);

          return (
            <Link
              to={`/productdetails/${product.id}`}
              key={product.id}
              className="group relative bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Product Image */}
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
                  className="absolute top-3 left-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform"
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
                  className="absolute top-3 right-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform"
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

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg truncate">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category.name}
                  </p>
                </div>

                {/* Price & Rating */}
                <div className="flex items-center justify-between mt-2">
                  <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {product.priceAfterDiscount ? (
                      <>
                        <span className="text-gray-400 line-through mr-2">
                          {product.price} EGP
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {product.priceAfterDiscount} EGP
                        </span>
                      </>
                    ) : (
                      <span>{product.price} EGP</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={18} fill="currentColor" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {product.ratingsAverage?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
