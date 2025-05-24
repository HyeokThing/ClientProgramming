import { useState, useRef } from "react";
import { Button } from "react-bootstrap";

const Student = ({ stu, onDelete }) => {
  // s가 undefined일 경우를 대비한 방어 코드
  if (!stu) {
    return null; // 또는 <tr><td colSpan="4">학생 정보가 없습니다.</td></tr>
  }
  const { id, name, address, phone } = stu;
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>
        <Button size="sm" variant="outline-danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Student;
