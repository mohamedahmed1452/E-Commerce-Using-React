import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { Formik, useFormik } from "formik";

export default function Checkout() {
  const { orderCheckout } = useContext(cartContext);
  const formObj = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: orderCheckout,
  });

  return (
    <div className="container mx-auto p-5 bg-blend-darkening">
      <h1 className="text-center text-3xl font-bold">Checkout Page</h1>

      <form onSubmit={formObj.handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium">
            Details
          </label>
          <input onChange={formObj.handleChange}
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
          <input onChange={formObj.handleChange}
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
          <input onChange={formObj.handleChange}
            value={formObj.values.city}
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
