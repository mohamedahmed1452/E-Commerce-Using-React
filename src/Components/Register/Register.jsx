import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  function registerSubmit(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || "Something went wrong");
        setTimeout(() => setErrorMessage(null), 3000);
      })
      .finally(() => setLoading(false));
  }

  function validateErrors(values) {
    const errors = {};
    const nameRegex = /^[A-Z ][a-z\s]{3,}$/;
    if (!nameRegex.test(values.name))
      errors.name = "Name must start with a capital letter and be at least 4 chars";

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) errors.email = "Invalid email format";

    const phoneRegex = /^(20)?01[0125][0-9]{8}$/;
    if (!phoneRegex.test(values.phone)) errors.phone = "Invalid Egyptian phone number";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(values.password))
      errors.password = "Password must be 8+ chars with letters & numbers";

    if (values.rePassword !== values.password)
      errors.rePassword = "Passwords do not match";

    return errors;
  }

  const formik = useFormik({
    initialValues,
    onSubmit: registerSubmit,
    validate: validateErrors,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Register Now</h2>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">{successMessage}</div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Input Fields */}
          {["name", "email", "phone", "password", "rePassword"].map((field, idx) => (
            <div key={idx} className="relative">
              <input
                type={field.includes("password") ? "password" : field === "phone" ? "tel" : "text"}
                name={field}
                id={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="peer w-full border-b-2 border-gray-300 focus:border-blue-700 outline-none py-2 text-gray-900 bg-transparent"
                required
              />
              <label
                htmlFor={field}
                className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-200"
              >
                {field === "rePassword"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-red-600 text-sm mt-1">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition duration-200 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-700 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
