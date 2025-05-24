import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Todo from "./Todo";

const Todos = () => {
  const [last, setLast] = useState(1);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  const callAPI = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        const start = (page - 1) * 10 + 1;
        const end = page * 10;
        const data = json.filter((j) => j.id >= start && j.id <= end);
        setTodos(data);
        setLast(Math.ceil(json.length / 10));
        console.log(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    callAPI();
  }, [page]);

  if (loading) {
    return <h1 className="my-5 text-center">Loading...</h1>;
  }

  return (
    <div className="componentWrap">
      <h1>Todos Component</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t) => (
            <Todo todo={t} key={t.id} />
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center gap-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          이전
        </Button>
        <span>
          {page} / {last}
        </span>
        <Button disabled={page === last} onClick={() => setPage(page + 1)}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default Todos;
