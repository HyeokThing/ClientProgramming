import { useState } from "react";
import Table from "react-bootstrap/Table";
import Student from "./Student";
import Register from "./Register";
const Students = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "John", address: "Incheon", phone: "010-1234-5678" },
    { id: 2, name: "Kim", address: "Seoul", phone: "010-5555-5678" },
    { id: 3, name: "Choi", address: "Suwon", phone: "010-3333-5678" },
  ]);

  const onDelete = (id) => {
    if (window.confirm(`${id} : delete?`)) {
      const data = students.filter((s) => s.id !== id);
      setStudents(data);
    }
  };

  const onRegister = (student) => {
    const data = students.concat(student);
    setStudents(data);
  };

  return (
    <div className="componentWrap">
      <h1 className="text-center">Students Component</h1>
      <Register onRegister={onRegister} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <Student stu={stu} onDelete={onDelete} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Students;
