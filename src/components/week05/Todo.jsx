import React from "react";

const Todo = ({ todo }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" checked={todo.completed} />
      </td>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
    </tr>
  );
};

export default Todo;
