import { useFormik } from "formik";
import * as Yup from "yup";


const initialValues = {
    userName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    dateOfEnrollment: "",
    role: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Required")
      .max(18, "Username must be at most 18 characters")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .required("Required")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        "Invalid email format"
      ),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    gender: Yup.string().required("Required"),
    dateOfEnrollment: Yup.date()
      .min(new Date(), "Enrollment date cannot be in the past")
      .required("Date of enrollment is required"),
    role: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Required"),
  });

const Register = () => {
  const registerForm = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
  });
  console.log(registerForm);

  

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Add Student
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details to add a new student
            </p>
          </div>
          <form
            onSubmit={registerForm.handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.userName}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.userName &&
                    registerForm.errors.userName
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                  placeholder="Enter username"
                />
                {registerForm.touched.userName &&
                  registerForm.errors.userName && (
                    <p className="mt-2 text-sm text-red-600">
                      {registerForm.errors.userName}
                    </p>
                  )}
              </div>

              {/* Email */}
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
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.email}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.email && registerForm.errors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                  placeholder="Enter email address"
                />
                {registerForm.touched.email && registerForm.errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {registerForm.errors.email}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.dateOfBirth}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.dateOfBirth &&
                    registerForm.errors.dateOfBirth
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                />
                {registerForm.touched.dateOfBirth &&
                  registerForm.errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600">
                      {registerForm.errors.dateOfBirth}
                    </p>
                  )}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.gender}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.gender && registerForm.errors.gender
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {registerForm.touched.gender && registerForm.errors.gender && (
                  <p className="mt-2 text-sm text-red-600">
                    {registerForm.errors.gender}
                  </p>
                )}
              </div>

              {/* Date of Enrollment */}
              <div>
                <label
                  htmlFor="dateOfEnrollment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Enrollment
                </label>
                <input
                  id="dateOfEnrollment"
                  name="dateOfEnrollment"
                  type="date"
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.dateOfEnrollment}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.dateOfEnrollment &&
                    registerForm.errors.dateOfEnrollment
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                />
                {registerForm.touched.dateOfEnrollment &&
                  registerForm.errors.dateOfEnrollment && (
                    <p className="mt-2 text-sm text-red-600">
                      {registerForm.errors.dateOfEnrollment}
                    </p>
                  )}
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.role}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.role && registerForm.errors.role
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
                {registerForm.touched.role && registerForm.errors.role && (
                  <p className="mt-2 text-sm text-red-600">
                    {registerForm.errors.role}
                  </p>
                )}
              </div>
            </div>

            {/* Password Fields - Full Width */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
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
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.password}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.password &&
                    registerForm.errors.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                  placeholder="Enter password"
                />
                {registerForm.touched.password &&
                  registerForm.errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {registerForm.errors.password}
                    </p>
                  )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.confirmPassword}
                  className={`block w-full px-3 py-3 border ${
                    registerForm.touched.confirmPassword &&
                    registerForm.errors.confirmPassword
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 sm:text-sm`}
                  placeholder="Confirm password"
                />
                {registerForm.touched.confirmPassword &&
                  registerForm.errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {registerForm.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={registerForm.isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-200 transform ${
                  registerForm.isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                }`}
              >
                {registerForm.isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Create Account
                  </>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500 transition duration-200"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
