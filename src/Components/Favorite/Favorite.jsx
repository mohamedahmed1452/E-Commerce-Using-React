import { useContext } from "react";
import { favoriteContext } from "../../context/FavoriteContext";
import Spinner from "../Spinner/Spinner";

export default function Favorite() {
  const { favoriteItems, removeFromFavorite } = useContext(favoriteContext);

  if (!favoriteItems) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }

   if (favoriteItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[75vh] bg-white text-gray-700">
        <h1 className="text-4xl font-bold mb-5">💔 No Favorites Yet!</h1>
        <p className="text-gray-500">Start adding your favorite products now.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] py-10 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          ❤️ My Favorite Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              {/* Product Image */}
              <div className="w-40 h-40 mb-4">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-full shadow-md"
                />
              </div>

              {/* Product Info */}
              <h2 className="text-xl w-full font-bold text-gray-900 text-center truncate">
                {product.title}
              </h2>
              <p className="text-gray-500 mt-1 text-center">
                {product.category.name}
              </p>

              {/* Price */}
              <p className="text-2xl font-semibold text-blue-700 mt-2">
                {product.price} EGP
              </p>

              {/* Remove Button */}
              <button
                onClick={() => removeFromFavorite(product.id)}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition flex items-center gap-2"
              >
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
