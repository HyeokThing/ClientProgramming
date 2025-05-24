import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Table,
  Row,
  Col,
  Form,
  InputGroup,
  FormSelect,
} from "react-bootstrap";
import Book from "./Book";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [size, setSize] = useState(10);

  const callAPI = async () => {
    const url = "https://dapi.kakao.com/v3/search/book?target=title";
    const config = {
      headers: {
        Authorization: "KakaoAK 47d18512e80079439c076a3605f727e4",
      },
      params: {
        query: query,
        page: page,
        size: size,
      },
    };
    setLoading(true);
    const res = await axios.get(url, config);
    console.log(res.data);
    setBooks(res.data.documents);
    setLast(Math.ceil(res.data.meta.pageable_count / size));
    setLoading(false);
  };

  useEffect(() => {
    callAPI();
  }, [page, size]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      alert("input query");
      return;
    } else {
      setPage(1);
      callAPI();
    }
  };

  const onChangeSize = (e) => {
    setPage(1);
    setSize(e.target.value);
  };
  if (loading) {
    return <h1 className="text-center my-3">Loading..</h1>;
  }
  return (
    <div className="componentWrap">
      <h1 className="my-3">Books Component</h1>
      <Row>
        <Col className="d-flex justify-content-end my-3 me-2">
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
              <Form.Select
                value={size}
                className="form-select"
                onChange={onChangeSize}
              >
                <option value={5}>5행</option>
                <option value={10}>10행</option>
                <option value={20}>20행</option>
              </Form.Select>
              <Button type="submit">Search</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Table striped bordered hover>
        <colgroup>
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.isbn}>
                <td>
                  <img
                    src={book.thumbnail || "https://placehold.co/100x150"}
                    width="100"
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.price}</td>
                <td>
                  <Book book={book} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="text-center my-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <span className="mx-3">
          {page} / {last}
        </span>
        <Button disabled={page === last} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Books;
