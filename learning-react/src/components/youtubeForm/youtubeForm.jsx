import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export const YoutubeForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
  });
  const { register, control, formState } = form;
  const { errors } = formState;
  // const {name, ref, onChange, onBlur} = register('username');

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        YouTube Channel Registration
      </h2>

      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })} // Register the input with react-hook-form
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            placeholder="Enter your username"
          />
        </div>
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
              validate: {
                notadmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "This email is not allowed"
                  );
                },
                notBlacklisted: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("@blacklist.com") ||
                    "This email domain is not allowed"
                  );
                },
              },
            })} // Register the input with react-hook-form
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        <div>
          <label
            htmlFor="channel" // Register the input with react-hook-form
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Channel:
          </label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: { value: true, message: "Channel is required" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            placeholder="Enter your channel name"
          />
        </div>

        {errors.channel && (
          <p className="text-red-500 text-sm mt-1">{errors.channel.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};



//using formik
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const YoutubeFormFormikField = () => {
  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
      .test('notadmin', 'This email is not allowed', value => value !== 'admin@example.com')
      .test('notBlacklisted', 'This email domain is not allowed', value => !value?.endsWith('@blacklist.com'))
      .required('Email is required'),
    channel: Yup.string().required('Channel is required'),
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        YouTube Channel Registration (Formik Field)
      </h2>

      <Formik
        initialValues={{
          username: '',
          email: '',
          channel: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
        }}
      >
        <Form className="space-y-4" noValidate>
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username:
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter your username"
            />
            <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Channel Field */}
          <div>
            <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-2">
              Channel:
            </label>
            <Field
              type="text"
              id="channel"
              name="channel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter your channel name"
            />
            <ErrorMessage name="channel" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
