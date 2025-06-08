import React, { useEffect, useState } from "react";
import BookPage from "./BookPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import { app } from "../firebase";
import { getDatabase, ref, get, set, onValue, remove } from 'firebase/database'
import moment from "moment";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

const Home = () => {
  const db = getDatabase(app);
  const uid = sessionStorage.getItem("uid");

  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [heart, setHeart] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [last, setLast] = useState(1);

  const callAPI = async () => {
    const url = "https://dapi.kakao.com/v3/search/book?target=title";
    const config = {
      headers: {
        Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_REST_KEY,
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

  const onClickCart = (book) => {
    if (uid) {
      get(ref(db, `cart/${uid}/${book.isbn}`)).then((snapshot) => {
        if (snapshot.exists()) {
          alert("이미 장바구니에 있습니다.");
          return;
        } else {
          const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          set(ref(db, `cart/${uid}/${book.isbn}`), { ...book, date });
          alert("장바구니 담기 성공");
        }
      });
    } else {
      alert("로그인이 필요합니다.");
      navi("/login");
    }
  };

  const onClickHeart = (book) => {
    remove(ref(db, `heart/${uid}/${book.isbn}`));
    alert('즐겨찾기가 취소되었습니다.')
  }

  const onClickRegHeart = (book) => {
    if(uid) {
      set(ref(db, `heart/${uid}/${book.isbn}`), book);
      alert('즐겨찾기에 등록되었습니다.');
    } else {
      navi('/login');
    }
  }

  const checkHeart = () => {
    setLoading(true);
    onValue(ref(db, `heart/${uid}`), snapshot => {
      const rows = [];
      snapshot.forEach(row => {
        rows.push(row.val().isbn);
      });

      setHeart(rows);
      setLoading(false);
    });
  }

  useEffect(() => {
    checkHeart();
  }, []);

  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );
  }

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
                    <BookPage book={doc}/>
                    <div className='heart text-end'>
                      {heart.includes(doc.isbn) ?
                          <FaHeart onClick={() => onClickHeart(doc)}/>
                          :
                          <FaRegHeart onClick={() => onClickRegHeart(doc)}/>
                      }
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="text-truncate">{doc.title}</div>
                    <Row>
                      <Col>{doc.sale_price}원</Col>
                      <Col className="text-end cart">
                        <BsCart4 onClick={() => onClickCart(doc)} />
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            이전
          </Button>
          <span className="mx-2 my-2">
          {page} / {last}
        </span>
          <Button disabled={page === last} onClick={() => setPage(page + 1)}>
            다음
          </Button>
        </div>
      </div>
  );
};

export default Home;
