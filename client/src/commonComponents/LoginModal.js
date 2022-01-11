import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginModal(props) {
  const { show, handleClose } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>You are not logged in!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Login or Register for a free account to continue!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" as={Link} to="/register">
          Register
        </Button>
        <Button variant="primary" as={Link} to="/login">
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
