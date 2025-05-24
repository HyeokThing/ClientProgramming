import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import BookPage from "./BookPage";

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [last, setLast] = useState(1);

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
    const res = await axios.get(url, config);
    setDocuments(res.data.documents);
    setLast(Math.ceil(res.data.meta.pageable_count / size));
  };

  useEffect(() => {
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      alert("검색어를 입력하세요");
      return;
    }
    setPage(1);
    callAPI();
  };

  return (
    <div>
      <h1 className="title">Home</h1>
      <Row className="mb-3">
        <Col>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </InputGroup>
          </Form>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        {documents.map((doc) => (
          <Col key={doc.isbn} className="mb-4" lg={2} md={4} xs={6}>
            <Card>
              <Card.Body>
                <BookPage book={doc} />
              </Card.Body>
              <Card.Footer>
                <div className="text-truncate">{doc.title}</div>
                <div>{doc.sale_price}원</div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <span className="mx-2 my-2">
          {page} / {last}
        </span>
        <Button disabled={page === last} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
