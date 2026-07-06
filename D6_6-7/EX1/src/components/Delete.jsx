import React from 'react';
import { removeStudentByID } from '../service/studentService';

// Bổ sung prop onDeleteSuccess
const Delete = ({ studentId, onDeleteSuccess }) => {

  const handleDelete = async () => {
    if (studentId) {
      await removeStudentByID(studentId);
      console.log("Đã xóa thành công ID:", studentId);
      // Gọi hàm này để báo cho StudentList render lại
      if (onDeleteSuccess) {
        onDeleteSuccess(); 
      }
    }
  };

  return (
    <>
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this student (ID: {studentId})? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleDelete}
                data-bs-dismiss="modal" /* Thêm thuộc tính này để tự đóng modal sau khi bấm */
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delete;