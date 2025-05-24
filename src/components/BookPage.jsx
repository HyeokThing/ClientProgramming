import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BookPage({ book }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img
        src={book.thumbnail || "http://placehold.co/100x150"}
        alt=""
        width="100%"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={3}>
              <img
                src={book.thumbnail || "http://placehold.co/100x150"}
                alt=""
                width="100%"
              />
            </Col>
            <Col className="align-self-center">
              <h5>{book.title}</h5>
              <span>Price : {book.sale_price}원</span>
              <div>Author : {book.authors}</div>
              <div>Publisher : {book.publisher}</div>
              <div>ISBN : {book.isbn}</div>
              <div>Date : {book.datetime}</div>
            </Col>
          </Row>
          <hr />
          <div>{book.contents || "No contents"}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookPage;
{
}
