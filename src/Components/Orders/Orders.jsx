import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import Spinner from '../Spinner/Spinner';

export default function Orders() {
  const { userData, userToken } = useContext(authContext);
  const userId = userData.id;

  function fetchData() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allorders', userId],
    queryFn: fetchData,
  });

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Spinner />
      </div>
    );
  }
  console.log(data[0]);

  if (isError) {
    return (
      <h1 className=" text-center text-3xl text-red-500">
        Something went wrong error fetching data 404
      </h1>
    );
  }

  return (
    <div className="relative  shadow-md sm:rounded-lg">
      <div className="container mx-auto mt-5 min-h-[100vh]">
        <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {data?.map((order) => (
            <div
              key={order.id}
              className="mb-10 bg-gray-800 w-full h-full flex justify-between items-center  border-2 rounded-lg"
            >
              <div className="w-3/4 flex p-3 rounded-t-lg  items-center">
                {order.cartItems?.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-col items-center m-2 rounded-lg"
                  >
                    <div className="p-4">
                      <img
                        src={item.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={item.product.title}
                      />
                    </div>
                    <div className="px-6 py-1 font-semibold text-gray-900 dark:text-white">
                      {item.product.title.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="px-6 py-1 font-semibold text-gray-900 dark:text-white">
                      {item.product.brand.name}
                    </div>
                    <div className="px-6 py-1 font-semibold text-gray-900 dark:text-white">
                      {item.product.category.name}
                    </div>
                    <div className="px-6 py-1 font-semibold text-gray-900 dark:text-white">Count : {item.count}</div>
                    <div className="px-6 py-1 font-semibold text-gray-900 dark:text-white">
                      Price : {item.price} EGP
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-1/4 h-full flex  p-3 rounded-t-lg justify-between items-center flex-col">
                <h1 className="m-3 font-bold text-3xl">Order Details</h1>
                <div className="mt-5 m-4">
                  <p className=" py-1 font-semibold text-gray-900 dark:text-white text-[22px]">
                    Number Of order Items : {order.cartItems.length}
                  </p>
                  <p className=" py-1 font-semibold text-gray-900 dark:text-white  text-[22px]">
                    Shipping Price : {order.shippingPrice} EGP
                  </p>
                  <p className=" py-1 font-semibold text-gray-900 dark:text-white  text-[22px]">
                    Tax Price : {order.taxPrice} EGP
                  </p>
                  <p className=" py-1 font-semibold text-gray-900 dark:text-white  text-[22px]">
                    Total Order Price : {order.totalOrderPrice} EGP
                  </p>
                  <p className=" py-1 font-semibold text-gray-900 dark:text-white  text-[22px]">
                    Payment Method : {order.paymentMethodType}
                  </p>
                  <p className=" py-1 font-semibold text-gray-900 dark:text-white  text-[22px]">
                    Status : {order.isDelivered ? 'Delivered' : 'Pending'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
