import React, { useState, useEffect, useCallback } from "react";
import { Link, Outlet } from 'react-router-dom';
import { getStudentByName } from "../../service/studentService";
import Delete from "../../components/Delete";

const StudentList = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await getStudentByName(searchQuery);
      setStudents(results || []); 
    } catch (err) {
      setError("Không thể tải danh sách sinh viên. Vui lòng kiểm tra kết nối mạng.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents(searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchStudents]);

  const handleDeleteClick = (id) => {
    setSelectedStudentId(id);
  };

  // Callback gọi lại khi xóa thành công (giữ nguyên filter hiện tại)
  const handleDeleteSuccess = () => {
    fetchStudents(searchTerm);
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
      
      {/* Hiển thị lỗi nếu có */}
      {error && <div className="alert alert-danger">{error}</div>}

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
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  Không tìm thấy sinh viên nào khớp với từ khóa "{searchTerm}"
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}> 
                  <td>{student.id}</td> 
                  <td>{student.name}</td> 
                  <td>{student.age}</td> 
                  <td>{student.address}</td> 
                  <td>
                    <Link to={`/dashboard/edit/${student.id}`}>
                      <button className="btn btn-warning btn-sm me-2">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(student.id)} 
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

      <Delete 
        studentId={selectedStudentId} 
        onDeleteSuccess={handleDeleteSuccess} 
      />
    </div>
  );
};

export default StudentList;