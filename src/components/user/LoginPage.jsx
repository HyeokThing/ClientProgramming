import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { app } from "../../firebase";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const auth = getAuth(app);
  const basename = process.env.PUBLIC_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    } else {
      // login check
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
          .then((success) => {
            alert("로그인 성공");
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("uid", success.user.uid);
            setLoading(false);

            if(sessionStorage.getItem('target')){
              navigate(sessionStorage.getItem('target'));
            }else{
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
          });
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
        <Row className="my-5 justify-content-center">
          <Col lg={4} md={6} xs={8}>
            <Card>
              <Card.Header>
                <h5>Login</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Control
                      name="email"
                      placeholder="Email"
                      className="mb-2"
                      value={email}
                      onChange={onChange}
                  />
                  <Form.Control
                      name="pass"
                      type="password"
                      placeholder="Password"
                      value={pass}
                      onChange={onChange}
                  />
                  <Button type="submit" className="w-100 mt-2">
                    로그인
                  </Button>
                </Form>
                <div className="mt-3 text-end">
                  <a href={`${basename}/join`}>회원가입</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default LoginPage;
