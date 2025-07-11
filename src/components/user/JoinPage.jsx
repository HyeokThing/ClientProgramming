import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { app } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  const [form, setForm] = useState({
    email: "nunu00@gmail.com",
    pass: "nunu123456",
  });

  const { email, pass } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || pass === "") {
      alert("공란이 있습니다.");
    } else {
      // join check
      if (window.confirm("가입하시겠습니까?")) {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, pass)
            .then((success) => {
              alert("회원가입 성공");
              setLoading(false);
              navi("/login");
            })
            .catch((error) => {
              console.log(error.message);
              setLoading(false);
              alert("회원가입 실패");
            });
      }
    }
  };

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
        <Row className="justify-content-center my-5">
          <Col lg={4} md={6} xs={8}>
            <Card>
              <Card.Header>
                <h5>Join</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Control
                      className="mb-2"
                      name="email"
                      value={email}
                      onChange={onChange}
                  />
                  <Form.Control
                      type="password"
                      className="mb-2"
                      name="pass"
                      value={pass}
                      onChange={onChange}
                  />
                  <Button type="submit" className="w-100">
                    회원가입
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default JoinPage;
