import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getStudentByID, editStudentByID } from "../../service/studentService";
import * as Yup from "yup";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ thanh địa chỉ URL

  // State chứa dữ liệu mặc định ban đầu
  const [initialStudent, setInitialStudent] = useState({
    Name: "",
    Age: "",
    Address: "",
  });

  // Gọi API lấy dữ liệu cũ ngay khi vừa vào trang
  useEffect(() => {
    const fetchOldData = async () => {
      try {
        const oldData = await getStudentByID(id);
        setInitialStudent({
          Name: oldData.Name,
          Age: oldData.Age,
          Address: oldData.Address,
        });
      } catch (error) {
        toast.error("Không tìm thấy dữ liệu sinh viên!");
        navigate("/dashboard");
      }
    };
    fetchOldData();
  }, [id, navigate]);

  const handleEdit = async (values) => {
    try {
      await editStudentByID(id, values);
      toast.success("Updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student!");
    }
  };

 const validation = Yup.object({
     Name: Yup.string()
       .required("Yêu cầu nhập tên")
       .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/, "Tên không đúng định dạng (Vd: Nguyen Van A)"),
     Age: Yup.number()
       .typeError("Tuổi phải là một số") 
       .required("Yêu cầu nhập tuổi")
       .min(1, "Tuổi phải lớn hơn 0")
       .max(100, "Tuổi không hợp lệ"),
     Address: Yup.string()
       .required("Yêu cầu nhập địa chỉ")
       .min(5, "Địa chỉ quá ngắn, vui lòng nhập chi tiết hơn"), 
   });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-warning text-dark py-3">
              <h4 className="mb-0 fw-bold">Edit Student ID: {id}</h4>
            </div>

            <div className="card-body p-4">
              <Formik
                enableReinitialize={true} // BẮT BUỘC: Cho phép Formik cập nhật lại giá trị khi state initialStudent thay đổi từ API
                initialValues={initialStudent}
                onSubmit={handleEdit}
                validationSchema={validation}
              >
                <Form>
                  <div className="mb-4">
                    <label htmlFor="studentName" className="form-label fw-semibold">
                      Student Name <span className="text-danger">*</span>
                    </label>
                    <Field type="text" className="form-control" id="studentName" name="Name" />
                    <ErrorMessage name="Name" component="div" className="text-danger mt-1 small" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="studentAge" className="form-label fw-semibold">
                      Age <span className="text-danger">*</span>
                    </label>
                    <Field type="number" className="form-control" id="studentAge" name="Age" />
                    <ErrorMessage name="Age" component="div" className="text-danger mt-1 small" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="studentAddress" className="form-label fw-semibold">
                      Address <span className="text-danger">*</span>
                    </label>
                    <Field as="textarea" className="form-control" id="studentAddress" name="Address" rows="3" />
                    <ErrorMessage name="Address" component="div" className="text-danger mt-1 small" />
                  </div>

                  <div className="d-flex justify-content-end gap-3 mt-5">
                    <button type="button" className="btn btn-light border px-4" onClick={() => navigate("/dashboard")}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning px-4 fw-bold">
                      Save Changes
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;