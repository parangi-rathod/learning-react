import { useFormik } from "formik";
import * as Yup from "yup";
import subjectsEnum from "../../utils/enums/subject";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, "Invalid email format")
    .required("Email is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  dateOfEnrollment: Yup.date().required("Date of Enrollment is required"),
  salary: Yup.number()
    .min(0, "Salary must be a positive number")
    .required("Salary is required"),
  class: Yup.string().required("Class is required"),
  subjectId: Yup.string().required("Subject is required"),
  qualification: Yup.string().required("Qualification is required"),
});

const AddTeacherModal = ({
  isOpen,
  onClose,
  onSubmit,
  isEditMode = false,
  teacherData = null,
}) => {
  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const subjects = subjectsEnum ? Object.keys(subjectsEnum) : [];

  const formik = useFormik({
    initialValues: {
      name: teacherData?.name || "",
      email: teacherData?.email || "",
      dateOfBirth: teacherData?.dateOfBirth || "",
      dateOfEnrollment: teacherData?.dateOfEnrollment || "",
      salary: teacherData?.salary || "",
      class: teacherData?.class || "",
      subjectId: teacherData?.subjectId || "",
      qualification: teacherData?.qualification || "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Convert class and subjectId to integers
      const payload = {
        ...values,
        class: parseInt(values.class, 10),
        subjectId: parseInt(values.subjectId, 10),
      };
      onSubmit(payload); // call parent handler with converted values
      setSubmitting(false);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] h-full items-center justify-center popup flex">
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow popup-body">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <svg className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium">
              {isEditMode ? "Edit Teacher" : "Add Teacher"}
            </h3>

            <form className="w-full max-w-xl" onSubmit={formik.handleSubmit}>
              {/* Name Field */}
              <div>
                <div className="relative flex items-center mt-4">
                  <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <span className="text-[0.7rem] text-red-500">
                    {formik.errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div>
                <div className="relative flex items-center mt-4">
                  <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <span className="text-[0.7rem] text-red-500">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              {/* Date Fields */}
              <div className="relative grid grid-cols-2 mt-4 gap-2">
                <div>
                  <div className="relative flex items-center mt-4">
                    <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                      {...formik.getFieldProps("dateOfBirth")}
                    />
                  </div>
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <span className="text-[0.7rem] text-red-500">
                      {formik.errors.dateOfBirth}
                    </span>
                  )}
                </div>

                <div>
                  <div className="relative flex items-center mt-4">
                    <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
                      Date Of Enrollment
                    </label>
                    <input
                      type="date"
                      name="dateOfEnrollment"
                      className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                      {...formik.getFieldProps("dateOfEnrollment")}
                    />
                  </div>
                  {formik.touched.dateOfEnrollment &&
                    formik.errors.dateOfEnrollment && (
                      <span className="text-[0.7rem] text-red-500">
                        {formik.errors.dateOfEnrollment}
                      </span>
                    )}
                </div>
              </div>

              {/* Class and Salary Fields */}
              <div className="relative grid grid-cols-2 mt-4 gap-2">
                <div>
                  <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[12px] font-semibold">
                    Class
                  </label>
                  <select
                    name="class"
                    className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                    {...formik.getFieldProps("class")}
                  >
                    <option value="" disabled>
                      Select class
                    </option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  {formik.touched.class && formik.errors.class && (
                    <span className="text-[0.7rem] text-red-500">
                      {formik.errors.class}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-[13px] bg-white absolute px-2 top-[-10px] right-[148px] font-semibold">
                    Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                    {...formik.getFieldProps("salary")}
                  />
                  {formik.touched.salary && formik.errors.salary && (
                    <span className="text-[0.7rem] text-red-500">
                      {formik.errors.salary}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <div className="relative flex items-center mt-4">
                  <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
                    Subject
                  </label>
                  <select
                    name="subjectId"
                    className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                    {...formik.getFieldProps("subjectId")}
                  >
                    <option value="" disabled>
                      Select subject
                    </option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subjectsEnum[subject]}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                {formik.touched.subjectId && formik.errors.subjectId && (
                  <span className="text-[0.7rem] text-red-500">
                    {formik.errors.subjectId}
                  </span>
                )}
              </div>

              {/* Qualification Field */}
              <div>
                <div className="relative flex items-center mt-4">
                  <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Enter qualification"
                    className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:bg-gray-100 focus:border-gray-400 focus:outline-none focus:shadow-outline-gray rounded outline-none"
                    {...formik.getFieldProps("qualification")}
                  />
                </div>
                {formik.touched.qualification &&
                  formik.errors.qualification && (
                    <span className="text-[0.7rem] text-red-500">
                      {formik.errors.qualification}
                    </span>
                  )}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-lg mt-4 bg-violet-600 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                {formik.isSubmitting ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal;
