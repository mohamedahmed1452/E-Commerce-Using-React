import { Heart, ShoppingCart, Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { favoriteContext } from "../../context/FavoriteContext";
import useAllProducts from "../../customHooks/useAllProducts";
import useCategories from "../../customHooks/useCategories";
import Spinner from "../Spinner/Spinner";

export default function Products() {
  const productQuery = useAllProducts();
  const { data, isError, isLoading } = productQuery;
  const [products, setProducts] = useState([]);

  const handleCategory = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "all") {
      setProducts(data);
    } else {
      const filteredProducts = data.filter(
        (product) => product.category.name.toLowerCase() === selectedCategory
      );
      setProducts(filteredProducts);
      console.log("Filtered Products:", filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setProducts(filteredProducts);
  };
  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  const { addProductToCart, removeCartItem, cartExists } =
    useContext(cartContext);
  const { addToFavorite, removeFromFavorite, isExistInFavorite } =
    useContext(favoriteContext);

  const { data: categories } = useCategories();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <h1 className="text-center text-3xl text-red-500 font-semibold mt-10">
         Something went wrong — failed to fetch products.
      </h1>
    );



  return (
    <section className="container mx-auto px-4 py-10  min-h-[100vh]">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
        🛍️ All Products
      </h1>

      <div className="w-full max-w-3xl mx-auto mb-10 flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md transition-all hover:shadow-lg">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-400 outline-none transition-all duration-200"
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
            />
          </svg>
        </div>
        <select
          name="category"
          id="category"
          className="h-12 w-48 rounded-xl border border-gray-300 bg-white text-gray-700 px-3 focus:border-lime-500 focus:ring-2 focus:ring-lime-400 outline-none transition-all duration-200 cursor-pointer"
          onChange={handleCategory}
        >
          <option value="all">All Categories</option>
          {categories?.map((category) => (
            <option key={category._id} value={category.name.toLowerCase()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {products.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white text-gray-700">
          <h1 className="text-4xl font-bold mb-5">🔍 No Products Found!</h1>
          <p className="text-gray-500">
            We couldn't find any products matching your search. Try different
            keywords.
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((product) => {
          const inCart = cartExists(product.id);
          const inFavorite = isExistInFavorite(product.id);

          return (
            <Link
              to={`/productdetails/${product.id}`}
              key={product.id}
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
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
                  className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
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
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
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
    </section>
  );
}
