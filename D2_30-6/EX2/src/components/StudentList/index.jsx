import Students from "./Students.js";
import './StudentList.css'

const studentList = () => {
  return (
    <>
      <h1>Students List</h1>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>country</th>
          </tr>
        </thead>
        <tbody>
          {Students.map((student) => (
            <tr>
              <th>{student.company}</th>
              <th>{student.contact}</th>
              <th>{student.country}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default studentList;
