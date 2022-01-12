import React from "react";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";

function UserDetailsModal(props) {
  const {
    show,
    handleClose,
    username,
    telegramHandle,
    email,
    phoneNumber,
  } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroupItem>Username: {username}</ListGroupItem>
          <ListGroupItem>Telegram Handle: {telegramHandle}</ListGroupItem>
          <ListGroupItem>Email: {email}</ListGroupItem>
          <ListGroupItem>HP: {phoneNumber}</ListGroupItem>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetailsModal;
