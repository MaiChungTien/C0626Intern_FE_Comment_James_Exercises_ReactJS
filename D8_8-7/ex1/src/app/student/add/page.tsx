'use client'; 

import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { addStudent } from "../../../service/studentService";
import * as Yup from "yup"; 

interface StudentValues {
  name: string;
  age: string | number;
  address: string;
}

export default function AddStudent() {
  const router = useRouter(); 

  const initialValues: StudentValues = {
    name: "",
    age: "",
    address: "",
  };

  const handleAdd = async (values: StudentValues, { setSubmitting }: FormikHelpers<StudentValues>) => {
    try {
      const isSuccess = await addStudent(values);
      if (isSuccess) {
        toast.success("Added Successfully");
        router.push("/student"); 
      } else {
        toast.error("Thêm sinh viên thất bại: Yêu cầu bị từ chối!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi hệ thống: Không thể kết nối đến máy chủ!");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Yêu cầu nhập tên")
      .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/, "Tên phải viết hoa chữ cái đầu (Vd: Nguyen Van A)"),
    age: Yup.number()
      .typeError("Tuổi phải là một số") 
      .required("Yêu cầu nhập tuổi")
      .min(1, "Tuổi phải lớn hơn 0")
      .max(100, "Tuổi không hợp lệ"),
    address: Yup.string()
      .required("Yêu cầu nhập địa chỉ")
      .min(5, "Địa chỉ quá ngắn"), 
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="mb-6 pb-4 border-b">
        <h4 className="text-2xl font-bold text-gray-800">Add New Student</h4>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleAdd}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            {/* Tên */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Student Name *</label>
              <Field
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                name="name" 
                placeholder="e.g., John Doe"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Tuổi */}
            <div>
              <label htmlFor="age" className="block text-sm font-semibold mb-2">Age *</label>
              <Field
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                name="age"
                placeholder="e.g., 20"
              />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Địa chỉ */}
            <div>
              <label htmlFor="address" className="block text-sm font-semibold mb-2">Address *</label>
              <Field
                as="textarea"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                name="address"
                rows="3"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-end gap-3 pt-5">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                onClick={() => router.push("/student")}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Student"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}