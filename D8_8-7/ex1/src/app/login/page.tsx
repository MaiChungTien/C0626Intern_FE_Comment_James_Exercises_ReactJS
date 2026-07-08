'use client'; 

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; 


import { useAppDispatch, useAppSelector } from "../../redux/hooks"; 
import { loginThunk } from "../../redux/authSlice";


interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập Email"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  const handleSubmit = (
    values: LoginValues, 
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    dispatch(loginThunk(values.email, values.password))
      .then(() => {
          toast.success("Đăng Nhập Thành Công");
          router.push("/student"); 
      })
      .catch((errorMessage: string) => {
          toast.error(errorMessage || "Đăng Nhập Thất Bại");
      })
      .finally(() => {
          setSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-130px)] px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="space-y-6">
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    touched.email && errors.email 
                      ? "border-red-500 focus:ring-red-500 bg-red-50" 
                      : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  placeholder="Enter email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1.5 font-medium" />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    touched.password && errors.password
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1.5 font-medium" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-md hover:shadow-lg"
              >
                {isSubmitting || loading ? (
                  <>
                    {/* SVG Spinner của Tailwind thay cho spinner-border của Bootstrap */}
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}