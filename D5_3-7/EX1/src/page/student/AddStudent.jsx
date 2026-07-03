import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addStudent } from "../../service/studentService";
import * as Yup from "yup"; 

const AddStudent = () => {
  const navigate = useNavigate();

  const initialStudent = {
    Name: "",
    Age: "",
    Address: "",
  };

  const handleAdd = async (values) => {
    try {
      await addStudent(values);
      toast.success("Added Successfully");
      navigate("/dashboard"); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to add student!");
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
            <div className="card-header bg-primary text-white py-3">
              <h4 className="mb-0 fw-bold">Add New Student</h4>
            </div>

            <div className="card-body p-4">
              <Formik
                initialValues={initialStudent}
                onSubmit={handleAdd}
                validationSchema={validation}
              >
                <Form>
                  {/* Trường: Name */}
                  <div className="mb-4">
                    <label htmlFor="studentName" className="form-label fw-semibold">
                      Student Name <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="studentName"
                      name="Name"
                      placeholder="e.g., John Doe"
                    />
                    <ErrorMessage name="Name" component="div" className="text-danger mt-1 small" />
                  </div>

                  {/* Trường: Age */}
                  <div className="mb-4">
                    <label htmlFor="studentAge" className="form-label fw-semibold">
                      Age <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="number"
                      className="form-control"
                      id="studentAge"
                      name="Age"
                      placeholder="e.g., 20"
                      min="1"
                    />
                    <ErrorMessage name="Age" component="div" className="text-danger mt-1 small" />
                  </div>

                  {/* Trường: Address */}
                  <div className="mb-4">
                    <label htmlFor="studentAddress" className="form-label fw-semibold">
                      Address <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="textarea" // Cách để Formik render thẻ textarea thay vì input thuần
                      className="form-control"
                      id="studentAddress"
                      name="Address"
                      rows="3"
                      placeholder="Enter full address"
                    />
                    <ErrorMessage name="Address" component="div" className="text-danger mt-1 small" />
                  </div>

                  {/* Vùng Actions */}
                  <div className="d-flex justify-content-end gap-3 mt-5">
                    <button
                      type="button"
                      className="btn btn-light border px-4"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary px-4 fw-bold">
                      Save Student
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

export default AddStudent;