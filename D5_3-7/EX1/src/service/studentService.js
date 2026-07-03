const Students = [
  {
    ID: "1",
    Name: "Maria Anders",
    Age: "18",
    Address: "Germany",
  },
  {
    ID: "2",
    Name: "Francisco Chang",
    Age: "25",
    Address: "Mexico",
  },
  {
    ID: "3",
    Name: "Roland Mendel",
    Age: "30",
    Address: "Austria",
  },
  {
    ID: "4",
    Name: "Helen Bennett",
    Age: "22",
    Address: "UK",
  },
  {
    ID: "5",
    Name: "Yoshi Tannamuri",
    Age: "28",
    Address: "Canada",
  },
  {
    ID: "6",
    Name: "Giovanni Rovelli",
    Age: "35",
    Address: "Italy",
  },
];

export function getStudents() {
  //CALL API
  return Students;
}

export function getStudentByName(student_name) {
  //CAll API
  if (!student_name || student_name.trim() === "") {
    return getStudents();
  }

  const keyword = student_name.toLowerCase();
  return Students.filter((student) =>
    student.Name.toLowerCase().includes(keyword),
  );
}

export async function getStudentByID(student_id) {
  //CALL API
  const student = Students.find((s) => s.ID === student_id);
  if (!student) throw new Error("Không tìm thấy sinh viên");
  return student;
}


export function addStudent(newStudent) {
  // CALL API
  const newId =
    Students.length > 0
      ? (Math.max(...Students.map((s) => parseInt(s.ID))) + 1).toString()
      : "1";

  const studentToInsert = {
    ID: newId,
    ...newStudent,
  };

  Students.push(studentToInsert);
  return studentToInsert;
}

export function editStudentByID(student_id, updatedData) {
  const index = Students.findIndex((student) => student.ID === student_id);

  if (index === -1) {
    throw new Error("Can find Student!");
  }
  Students[index] = { ...Students[index], ...updatedData };
  return Students[index];
}

export function removeStudentByID(student_id) {
  //CALL API
  const index = Students.findIndex((student) => student.ID === student_id);
  if (index !== -1) {
    Students.splice(index, 1);
  }
}
