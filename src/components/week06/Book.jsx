import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table, Row, Col } from "react-bootstrap";

const Book = ({ book }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Info
      </Button>

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
            <Col lg={3} className="text-center">
              <img
                src={book.thumbnail || "https://placehold.co/100x150"}
                width="100"
              />
            </Col>
            <Col className="mt-3">
              <h5>{book.title}</h5>
              <div>Author : {book.authors}</div>
              <div>Price : {book.sale_price}</div>
              <div>Publisher : {book.publisher}</div>
              <div>Isbn : {book.isbn}</div>
            </Col>
          </Row>
          <hr />
          <div>{book.contents || "No contents"}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Book;
