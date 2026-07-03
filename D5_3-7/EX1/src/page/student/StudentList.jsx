import React, { useState, useEffect } from "react";
import { Link, Outlet } from 'react-router-dom';
import { getStudents, getStudentByName } from "../../service/studentService"; // Import hàm tìm kiếm
import Delete from "../../components/Delete";

const StudentList = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm load dữ liệu mặc định ban đầu
  const fetchItems = async () => {
    const items = await getStudents();
    setStudents([...items]); 
  };


  useEffect(() => {
      try {
        const results = getStudentByName(searchTerm);
        setStudents([...results]);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
  }, [searchTerm]); 

  const handleDeleteClick = (id) => {
    setSelectedStudentId(id);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Student by Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-center">
          <h2 className="text-success fw-bold m-0">Student Details</h2>
        </div>
        <div className="col-md-4 text-end">
          <Link to="/dashboard/add">
            <button className="btn btn-primary">Add New Student</button>
          </Link>
        </div>
      </div>
       
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle text-center mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  Không tìm thấy sinh viên nào khớp với từ khóa "{searchTerm}"
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.ID}>
                  <td>{student.ID}</td>
                  <td>{student.Name}</td>
                  <td>{student.Age}</td>
                  <td>{student.Address}</td>
                  <td>
                    <Link to={`/dashboard/edit/${student.ID}`}>
                      <button className="btn btn-warning btn-sm me-2">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(student.ID)} 
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <Outlet /> 
      </div>

      <Delete studentId={selectedStudentId} onDeleteSuccess={fetchItems} />
    </div>
  );
};

export default StudentList;