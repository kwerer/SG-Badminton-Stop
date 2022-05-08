import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function SubmitModal(props) {
  const { header, subheader, body, onHide, link } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{subheader}</h4>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button as={Link} to={link} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SubmitModal;
