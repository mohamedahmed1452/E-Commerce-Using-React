import { useFormik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';

export default function Checkout() {
  const { orderCheckout, orderCash } = useContext(cartContext);
  const navigate = useNavigate();
  const formObj = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: () => {
      orderCash();
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    },
  });

  return (
    <div className="container mx-auto p-5 bg-blend-darkening">
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
            type="submit"
            className="w-1/2  bg-green-950 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-l"
          >
            Cash Order
          </button>
          {/* <button
            type="submit"
            className="w-1/2 bg-green-950 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-l"
          >
            Checkout
          </button> */}
        </div>
      </form>
    </div>
  );
}
