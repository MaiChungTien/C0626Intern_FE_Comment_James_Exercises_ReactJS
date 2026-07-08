"use client";

import React from "react";
import { removeStudentByID } from "../service/studentService";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | number | null;
  onDeleteSuccess?: () => void;
}

const Delete = ({
  isOpen,
  onClose,
  studentId,
  onDeleteSuccess,
}: DeleteModalProps) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    if (studentId) {
      await removeStudentByID(studentId);
      console.log("Đã xóa thành công ID:", studentId);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Hộp thoại Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h5 className="text-xl font-bold text-gray-800">Confirm Deletion</h5>
          {/* Nút X trên góc */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <div className="text-gray-600 mb-6">
          Are you sure you want to delete this student (ID:{" "}
          <span className="font-bold text-red-500">{studentId}</span>)? This
          action cannot be undone.
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
