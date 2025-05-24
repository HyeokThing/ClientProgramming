import { useState, useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";

const Register = ({ onRegister }) => {
  const next_id = useRef(4);
  const ref_name = useRef("");

  const [form, setForm] = useState({
    id: next_id.current,
    name: "",
    address: "",
    phone: "",
  });

  const { id, name, address, phone } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickRegister = () => {
    onRegister(form);
    next_id.current++;
    setForm({
      id: next_id.current,
      name: "",
      address: "",
      phone: "",
    });
    ref_name.current.focus();
  };

  const onKeyDownPhone = (e) => {
    if (e.key === "Enter") {
      onClickRegister();
    }
  };

  return (
    <div className="">
      <Card>
        <Card.Header>
          Register Address<b>(component)</b>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Control
              onChange={onChange}
              name="name"
              value={name}
              className="mb-2"
              type="text"
              placeholder="Name"
              ref={ref_name}
            />
            <Form.Control
              onChange={onChange}
              name="address"
              value={address}
              className="mb-2"
              type="text"
              placeholder="Address"
            />
            <Form.Control
              onChange={onChange}
              name="phone"
              value={phone}
              className="mb-2"
              type="text"
              placeholder="Phone"
              onKeyDown={onKeyDownPhone}
            />
            <div>
              <Button
                className="w-50"
                variant="primary"
                onClick={onClickRegister}
              >
                Register
              </Button>
              <Button className="w-50" variant="secondary">
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
