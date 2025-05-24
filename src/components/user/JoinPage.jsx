import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const JoinPage = () => {
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
      // join check
    }
  };

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
                  Join
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
