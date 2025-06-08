import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import Local from "./Local";

const Locals = () => {
  //DOCU
  const [documents, setDocuments] = useState([]);

  //QUERY
  const [query, setQuery] = useState("apple");

  // PAGE
  const [page, setPage] = useState(1);

  // LAST PAGE
  const [last, setLast] = useState(1);

  // SIZE
  const [size, setSize] = useState(10);

  //API CALL
  const callAPI = async () => {
    const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
    const config = {
      headers: {
        Authorization: "KakaoAK 927c8f2f8b2101623eaa4b44f626c707",
      },
      params: {
        query: query,
        size: size,
        page: page,
      },
    };
    const res = await axios.get(url, config);
    console.log(res);
    setDocuments(res.data.documents);
    setLast(Math.ceil(res.data.meta.pageable_count / size));
  };

  useEffect(() => {
    callAPI();
  }, [page, size]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      alert("검색어를 입력해주세요");
    } else {
      setPage(1);
      callAPI();
    }
  };

  const onChangeSize = (e) => {
    setPage(1);
    setSize(parseInt(e.target.value));
  };

  return (
    <div className="componentWrap">
      <h1>Locals Component</h1>
      <Row>
        <Form onSubmit={onSubmit}>
          <Row className="align-items-center mx-1">
            <Col md={2}>
              <Form.Select
                value={size}
                onChange={onChangeSize}
                className="my-3"
              >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={15}>15 rows</option>
              </Form.Select>
            </Col>
            <Col md={10}>
              <InputGroup className="my-3">
                <Form.Control
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search"
                  value={query}
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Place Name</th>
            <th>Address</th>
            <th>TEL</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.place_name}</td>
              <td>{doc.address_name}</td>
              <td>{doc.phone}</td>
              <td>
                <Local local={doc} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center my-2">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          이전
        </Button>
        <span className="mx-2">
          {page} / {last}
        </span>
        <Button disabled={page === last} onClick={() => setPage(page + 1)}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default Locals;
