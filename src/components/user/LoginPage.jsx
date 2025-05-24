import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

const LoginPage = () => {
  const basename = process.env.PUBLIC_URL;

  const [form, setForm] = useState({
    email: "inha1234@gmail.com",
    pass: "1234",
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
      alert("input your email or password");
    } else {
      // login check
    }
  };

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
                  Login
                </Button>
              </Form>
              <div className="mt-3 text-end">
                <a href={`${basename}/join`}>Join</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
