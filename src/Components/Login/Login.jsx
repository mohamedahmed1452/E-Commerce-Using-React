import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const user = {
    email: '',
    password: '',
  };
  function loginSubmit(values) {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((response) => {
        setSuccessMsg(response.data.message);

        setTimeout(() => {
          setSuccessMsg(null);
        }, 2000);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setTimeout(() => {
          setErrorMsg(null);
        }, 2000);
      });
  }
  const registerFormic = useFormik({
    initialValues: user,
    onSubmit: loginSubmit,
    validate: (values) => {
      let errors = {};
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid Email Format';
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(values.password)) {
        errors.password =
          'Password must be at least 8 characters long and contain at least one letter and one number';
      }
      return errors;
    },
  });
  return (
    <>
      <div className="Container mt-20 h-[80vh] ">
        <h1 className="text-center">Login Now</h1>
        {errorMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-[30%] m-auto"
            role="alert"
          >
            <span className="font-medium">Danger alert!</span> {errorMsg}
          </div>
        )}
        {successMsg && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-[30%] m-auto"
            role="alert"
          >
            <span className="font-medium">Success alert!</span> Welcome Back
          </div>
        )}

        <form
          className="max-w-md mx-auto "
          onSubmit={registerFormic.handleSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={registerFormic.values.email}
              onChange={registerFormic.handleChange}
              onBlur={registerFormic.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {registerFormic.errors.email && registerFormic.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormic.errors.email}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={registerFormic.values.password}
              onChange={registerFormic.handleChange}
              onBlur={registerFormic.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {registerFormic.errors.password &&
            registerFormic.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormic.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
