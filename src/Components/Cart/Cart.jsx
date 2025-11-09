import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    updateCartItem,
    removeCartItem,
    totalCartPrice,
    numberOfCartItems,
    products,
  } = useContext(cartContext);

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-700">
        <h1 className="text-4xl font-bold mb-5">🛒 Your Cart is Empty</h1>
        <Link
          to="/products"
          className="px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">🛒 My Cart</h1>

      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col md:flex-row items-center bg-gray-800 dark:bg-gray-900 rounded-2xl shadow-xl p-5 hover:scale-105 transition-transform duration-300"
          >
            {/* Product Image */}
            <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
              <img
                src={product.product.imageCover}
                alt={product.product.title}
                className="rounded-full w-32 h-32 object-cover shadow-md"
              />
            </div>

            {/* Product Info */}
            <div className="w-full md:w-2/4 px-5 flex flex-col justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {product.product.title}
              </h2>
              <p className="text-gray-300 mt-2">
                Brand: <span className="text-lime-400">{product.product.brand.name}</span>
              </p>
              <p className="text-gray-300">
                Category: <span className="text-lime-400">{product.product.category.name}</span>
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-4 gap-4">
                <button
                  onClick={() =>
                    updateCartItem(product.product._id, product.count - 1)
                  }
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white hover:bg-gray-600 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={product.count}
                  readOnly
                  className="w-12 text-center rounded-md bg-gray-900 text-white"
                />
                <button
                  onClick={() =>
                    updateCartItem(product.product._id, product.count + 1)
                  }
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white hover:bg-gray-600 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="w-full md:w-1/4 flex flex-col items-center justify-between mt-4 md:mt-0">
              <p className="text-2xl font-bold text-lime-400 mb-4">{product.price} EGP</p>
              <button
                onClick={() => removeCartItem(product.product._id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
              >
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-gray-900 dark:bg-gray-800 p-6 rounded-2xl shadow-2xl">
        <div className="text-white text-2xl font-semibold">
          Total Items: {numberOfCartItems} | Total Price: {totalCartPrice} EGP
        </div>
        <Link
          to="/checkout"
          className="mt-4 md:mt-0 px-8 py-3 bg-lime-600 text-white rounded-xl text-xl font-bold hover:bg-lime-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
