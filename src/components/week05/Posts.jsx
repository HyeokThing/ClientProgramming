import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [displayPosts, setDisplayPosts] = useState([]);

  function callAPI() {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setPosts(json);
        setLast(Math.ceil(json.length / 10));
        updateDisplayPosts(json, page);
      });
  }

  const updateDisplayPosts = (allPosts, currentPage) => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    setDisplayPosts(allPosts.slice(start, end));
  };

  useEffect(() => {
    callAPI();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      updateDisplayPosts(posts, page);
    }
  }, [page, posts]);

  if (loading) {
    return <h1 className="text-center">Loading Posts...</h1>;
  }
  return (
    <div className="componentWrap">
      <h1>Posts Component</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {displayPosts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <Link to={`/posts/${p.id}`}>{p.title}</Link>
              </td>
            </tr>
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

export default Posts;
