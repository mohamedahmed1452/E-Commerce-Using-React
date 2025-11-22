import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(authContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = { email: "", password: "" };

  function loginSubmit(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((response) => {
        setSuccessMsg(response.data.message);
        localStorage.setItem("userToken", response.data.token);
        setUserToken(response.data.token);
        setTimeout(() => navigate("/home"), 1500);
      })
      .catch((error) => {
        setErrorMsg(error.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setErrorMsg(null);
          setSuccessMsg(null);
        }, 2500);
      });
  }

  function validateError(values) {
    const errors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) errors.email = "Invalid email format";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(values.password))
      errors.password =
        "Password must be at least 8 characters and contain a letter + number";

    return errors;
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: loginSubmit,
    validate: validateError,
  });

  return (
    <div className=" flex items-center justify-center min-h-[75vh] bg-gradient-to-br from-lime-100 via-white to-blue-100 p-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-white/30">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Welcome Back
        </h1>

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300">
             {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-100 border border-green-300">
             {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90"
              placeholder="you@example.com"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90"
              placeholder="••••••••"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-white font-medium transition-all ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
