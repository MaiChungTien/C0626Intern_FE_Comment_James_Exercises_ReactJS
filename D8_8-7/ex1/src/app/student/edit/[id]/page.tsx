'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { getStudentByID, editStudentByID } from "../../../../service/studentService";
import * as Yup from "yup";

interface StudentValues {
  name: string;
  age: string | number;
  address: string;
}

export default function EditStudent() {
  const router = useRouter();
  const params = useParams(); 
  const [id, setId] = useState<string | null>(null);

  const [initialStudent, setInitialStudent] = useState<StudentValues>({
    name: "",
    age: "",
    address: "",
  });


  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id as string);
    }
    resolveParams();
  }, [params]);


  useEffect(() => {
    if (!id) return;
    const fetchOldData = async () => {
      try {
        const oldData = await getStudentByID(id);
        setInitialStudent({
          name: oldData.name,
          age: oldData.age,
          address: oldData.address,
        });
      } catch (error) {
        toast.error("Không tìm thấy dữ liệu sinh viên!");
        router.push("/student");
      }
    };
    fetchOldData();
  }, [id, router]);

  const handleEdit = async (values: StudentValues, { setSubmitting }: FormikHelpers<StudentValues>) => {
    if (!id) return;
    try {
      await editStudentByID(id, values);
      toast.success("Updated Successfully");
      router.push("/student");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student!");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Yêu cầu nhập tên")
      .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/, "Tên không đúng định dạng (Vd: Nguyen Van A)"),
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
        <h4 className="text-2xl font-bold text-gray-800">Edit Student ID: {id}</h4>
      </div>

      <Formik
        enableReinitialize={true} 
        initialValues={initialStudent}
        onSubmit={handleEdit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Student Name *</label>
              <Field type="text" className="w-full p-2 border rounded" name="name" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Age *</label>
              <Field type="number" className="w-full p-2 border rounded" name="age" />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Address *</label>
              <Field as="textarea" className="w-full p-2 border rounded" name="address" rows="3" />
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
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}