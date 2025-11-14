import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { authContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";


export default function Checkout() {
  const {userToken} = useContext(authContext);
  const { cartId,resetValues } = useContext(cartContext);
  const [isCash, setIsCash] = useState(true);
  const navigate = useNavigate();


  function orderCash(shippingAddress) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingAddress,
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Checkout initiated successfully!", {
            duration: 1000,
            position: "top-center",
          });
          resetValues();
          setTimeout(() => {
            navigate("/home");
          }
          , 1000);
        }
      })
      .catch(()=> {
        toast.error("Failed at Checkout ", {
          duration: 1000,
          position: "top-center",
        });
      });
  }
  function orderCheckout(shippingAddress) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        shippingAddress,
        {
          headers: {
            token: userToken,
          },
          params: {
            url: "https://e-commerce-using-react-taupe.vercel.app/",
          },
        }
      )
      .then((res) => {

          window.open(res.data.session.url, "_self");

      })
      .catch(() => {
        toast.error("Failed to initiate checkout.", {
          duration: 1000,
          position: "top-center",
        });
      });
  }



  const formObj = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => {
      isCash ? orderCash() : orderCheckout();
    },
  });

  return (
    <div className="min-h-[100vh] container mx-auto p-5 bg-blend-darkening">
      <h1 className="text-center text-3xl font-bold">Checkout Page</h1>

      <form onSubmit={formObj.handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium">
            Details
          </label>
          <input
            onChange={formObj.handleChange}
            value={formObj.values.details}
            type="text"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium">
            Your Phone
          </label>
          <input
            onChange={formObj.handleChange}
            value={formObj.values.phone}
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium">
            Your City
          </label>
          <input
            onChange={formObj.handleChange}
            value={formObj.values.city}
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-center container mx-auto gap-3">
          <button
            onClick={() => {
              setIsCash(true);
            }}
            type="submit"
            className="w-1/2  bg-green-950 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-l"
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setIsCash(false);
            }}
            type="submit"
            className="w-1/2 bg-green-950 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-l"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}
