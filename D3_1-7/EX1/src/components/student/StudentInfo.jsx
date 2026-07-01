import React from "react";
import "./StudentInfo.css";
import { getAll } from "../../service/studentService";
class StudentInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    students: [],
  };
  componentDidMount() {
    this.setState({
      students: [...getAll()],
    });
  }

  render() {
    return (
      <>
        <h1>Student List</h1>
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((student, i) => (
              <tr key={student.ID}>
                <td>{i + 1}</td>
                <td>{student.Name}</td>
                <td>{student.Age}</td>
                <td>{student.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default StudentInfo;
