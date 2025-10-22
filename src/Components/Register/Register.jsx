import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState(null);
  let [successMessage, setSuccessMessage] = useState(null);

  const user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  function registerSubmit(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("login");
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  }
  function validate_errors(values) {
    let errors = {};
    const nameRegex = /^[A-Z ][a-z]{4,}$/;
    if (!nameRegex.test(values.name)) {
      errors.name = "Name Must Start With Capital Letter And More Than 4 Char";
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      errors.email = "Invalid Email Format";
    }
    const phoneRegex = /^(20)?01[0125][0-9]{8}$/;
    if (!phoneRegex.test(values.phone)) {
      errors.phone = "Invalid Phone Number must be Egyptian number";
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one letter and one number";
    }
    const rePasswordRegex = values.password;
    if (values.rePassword !== rePasswordRegex) {
      errors.rePassword = "Password and Confirm Password do not match";
    }
    console.log(errors);

    return errors;
  }

  const registerFormic = useFormik({
    initialValues: user,
    onSubmit: registerSubmit,
    validate: validate_errors,
  });

  return (
    <>
      <div className="container mx-auto py-10 mt-6 h-[88vh] ">
        <h1 className="text-center font-bold">Register Now</h1>
        {errorMessage ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-[35%] mx-auto mt-6"
            role="alert"
          >
            <span className="font-medium">Danger alert!</span> {errorMessage}
          </div>
        ) : successMessage ? (
          <div
            class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 mx-auto mt-6 dark:bg-gray-800 dark:text-green-400 w-[35%] "
            role="alert"
          >
            <span class="font-medium">Success alert!</span> Congratulation
          </div>
        ) : null}
        <form
          className="max-w-md mx-auto "
          onSubmit={registerFormic.handleSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              value={registerFormic.values.name}
              onChange={registerFormic.handleChange}
              onBlur={registerFormic.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {registerFormic.errors.name && registerFormic.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormic.errors.name}
              </div>
            ) : null}
          </div>
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
              type="tel"
              name="phone"
              id="phone"
              value={registerFormic.values.phone}
              onChange={registerFormic.handleChange}
              onBlur={registerFormic.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
            {registerFormic.errors.phone && registerFormic.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormic.errors.phone}
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={registerFormic.values.rePassword}
              onChange={registerFormic.handleChange}
              onBlur={registerFormic.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {registerFormic.errors.rePassword &&
            registerFormic.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormic.errors.rePassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
