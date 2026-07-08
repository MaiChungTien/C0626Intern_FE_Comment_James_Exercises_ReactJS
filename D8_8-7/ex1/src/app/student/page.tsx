"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link"; // Import chuẩn của Next.js thay vì react-router-dom
import { getStudentByName } from "../../service/studentService";
import Delete from "../../components/Delete";

interface Student {
  id: string | number;
  name: string;
  age: number | string;
  address: string;
}

export default function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<
    string | number | null
  >(null);

  const fetchStudents = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await getStudentByName(searchQuery);
      setStudents(results || []);
    } catch (err) {
      setError(
        "Không thể tải danh sách sinh viên. Vui lòng kiểm tra kết nối mạng.",
      );
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

  // 3. Hàm này giờ đây vừa lưu ID, vừa ra lệnh mở Modal
  const handleDeleteClick = (id: string | number) => {
    setSelectedStudentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    fetchStudents(searchTerm);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Thanh công cụ: Search & Nút Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="Search Student by Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 text-center">
          <h2 className="text-2xl font-bold text-green-600 m-0">
            Student Details
          </h2>
        </div>
        <div className="w-full md:w-1/3 flex justify-end">
          <Link
            href="/student/add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md"
          >
            + Add New Student
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      {/* Bảng dữ liệu Tailwind */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12">
                    <div className="flex justify-center items-center space-x-2">
                      <svg
                        className="animate-spin h-6 w-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-gray-500 font-medium">
                        Loading...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-gray-500 font-medium"
                  >
                    Không tìm thấy sinh viên nào khớp với từ khóa{" "}
                    <span className="font-bold">"{searchTerm}"</span>
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3 flex justify-center">
                      <Link
                        href={`/student/edit/${student.id}`}
                        className="text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-md transition-colors"
                        onClick={() => handleDeleteClick(student.id)}
                        // data-bs-* đã bị loại bỏ hoàn toàn
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
      </div>

      {/* Component Delete giờ đây được truyền đủ 4 Props */}
      <Delete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        studentId={selectedStudentId}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
