import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import Spinner from "../Spinner/Spinner";

export default function Orders() {
  const { userData, userToken } = useContext(authContext);
  const userId = userData.id;

  const fetchData = () =>
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        headers: { token: userToken },
      })
      .then((res) => res.data);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allorders", userId],
    queryFn: fetchData,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <h1 className="text-center text-3xl text-red-500 mt-10">
        ❌ Something went wrong fetching your orders.
      </h1>
    );

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white text-gray-700">
        <h1 className="text-4xl font-bold mb-5">🛒 No Orders Yet!</h1>
        <p className="text-gray-500">
          You haven’t placed any orders. Start shopping now!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 mb-24 px-5">
      <h1 className="text-4xl font-extrabold text-lime-400 text-center mb-10">
        🛒 My Orders
      </h1>

      <div className="flex flex-col gap-10">
        {data
          ?.slice()
          .reverse()
          .map((order) => (
            <div
              key={order.id}
              className="flex flex-col lg:flex-row bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300"
            >
              {/* Order Items */}
              <div className="lg:w-2/3 p-5 bg-gray-900 flex flex-col md:flex-row md:flex-wrap gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-lime-400 scrollbar-track-gray-700">
                {order.cartItems?.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-800 rounded-2xl flex flex-col items-center p-4 min-w-[180px] hover:shadow-lg hover:bg-gray-700 transition-all duration-300"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-3"
                    />
                    <p className="text-white font-semibold text-center text-sm md:text-base">
                      {item.product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm">
                      {item.product.brand.name}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm">
                      {item.product.category.name}
                    </p>
                    <p className="text-gray-300 font-medium mt-1">
                      Count: {item.count}
                    </p>
                    <p className="text-lime-400 font-bold">
                      Price: {item.price} EGP
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="lg:w-1/3 bg-white p-6 flex flex-col justify-between border-l border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  🧾 Order Summary
                </h2>

                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Items:</span>
                    <span className="text-gray-900">
                      {order.cartItems.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Shipping:</span>
                    <span>{order.shippingPrice + 10} EGP</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Tax:</span>
                    <span>{order.taxPrice + 5} EGP</span>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="font-bold text-lg text-green-600">
                      {order.totalOrderPrice + 10 + 5} EGP
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Payment:</span>
                    <span className="capitalize">
                      {order.paymentMethodType}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.isDelivered
                          ? "bg-green-100 text-green-700"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
