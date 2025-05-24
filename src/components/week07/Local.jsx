import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const Local = ({ local }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Location
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{local.place_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Map
            center={{ lat: local.y, lng: local.x }}
            style={{ width: "100%", height: "360px" }}
          >
            <MapMarker
              onMouseOver={() => setToggle(true)}
              onMouseOut={() => setToggle(false)}
              position={{ lat: local.y, lng: local.x }}
            >
              {toggle && <div>{local.address_name}</div>}
            </MapMarker>
          </Map>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Local;
