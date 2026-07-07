import api from "../axiosConfig/api";

export async function getStudents() {
  try {
    const res = await api.get(`/students`);
    return res.data;
  } catch (e) {
    console.error("Lỗi fetch danh sách sinh viên:", e);
    throw e;
  }
}

export async function getStudentByName(student_name) {
  try {
    if (!student_name || student_name.trim() === "") {
      return await getStudents();
    }
    const res = await api.get(`/students`, {
      params: { "name:contains": student_name.trim() },
    });
    return res.data;
  } catch (e) {
    console.error(`Lỗi fetch sinh viên có tên ${student_name}:`, e);
    throw e;
  }
}

export async function getStudentByID(student_id) {
  try {
    const res = await api.get(`/students/${student_id}`);
    return res.data;
  } catch (e) {
    console.error(`Lỗi fetch sinh viên ID ${student_id}:`, e);
    return null;
  }
}

export async function addStudent(newStudent) {
  try {
    const res = await api.post(`/students`, newStudent);
    return res.status >= 200 && res.status < 300;
  } catch (e) {
    console.error("Lỗi khi thêm sinh viên mới:", e);
    throw e;
  }
}

export async function editStudentByID(student_id, updatedData) {
  try {
    const res = await api.put(`/students/${student_id}`, updatedData);
    return res.status >= 200 && res.status < 300;
  } catch (e) {
    console.error(`Lỗi khi cập nhật sinh viên ID ${student_id}:`, e);
    throw e;
  }
}

export async function removeStudentByID(student_id) {
  try {
    const res = await api.delete(`/students/${student_id}`);
    return res.status >= 200 && res.status < 300;
  } catch (e) {
    console.error(`Lỗi khi xóa sinh viên ID ${student_id}:`, e);
    throw e;
  }
}
