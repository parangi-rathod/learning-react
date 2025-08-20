import { useFormik } from "formik";
import * as Yup from "yup";
import authService from '../services/AuthService';

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
      "Invalid email format"
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Required"),
});

const Login = () => {
  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Submitting", values);
        
        // Call AuthService login method
        const result = await authService.login(values);
        
        if (result.success) {
          setStatus({ type: "success", message: result.message || "Login successful!" });
          
          // Optional: Redirect after successful login
          setTimeout(() => {
            window.location.href = '/dashboard'; // or use React Router navigate
          }, 1500);
        } else {
          setStatus({ type: "error", message: result.message || "Login failed. Try again." });
        }
      } catch (err) {
        console.error("Login error:", err);
        setStatus({ type: "error", message: "Network error. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
            <svg
              className="h-6 w-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Success/Error Messages */}
        {loginForm.status && (
          <div
            className={`p-4 rounded-lg ${
              loginForm.status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            <div className="flex items-center">
              {loginForm.status.type === "success" ? (
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>{loginForm.status.message}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={loginForm.handleSubmit}
          noValidate
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
              className={`block w-full pl-3 pr-3 py-3 border ${
                loginForm.touched.email && loginForm.errors.email
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
              placeholder="Enter your email"
            />
            {loginForm.touched.email && loginForm.errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                {loginForm.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
              className={`block w-full pl-3 pr-3 py-3 border ${
                loginForm.touched.password && loginForm.errors.password
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
              placeholder="Enter your password"
            />
            {loginForm.touched.password && loginForm.errors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                {loginForm.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 text-sm font-medium rounded-lg text-white transition duration-200 ${
              loginForm.isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
            disabled={loginForm.isSubmitting}
          >
            {loginForm.isSubmitting ? "Signing in..." : "Sign in"}
          </button>

       
        </form>
      </div>
    </div>
  );
};

export default Login;
