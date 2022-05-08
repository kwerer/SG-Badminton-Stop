import React from "react";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "./styles.module.css";

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
          <ListGroupItem>
            Username: <span className={styles.Italics}>{username}</span>
          </ListGroupItem>
          <ListGroupItem>
            Telegram Handle:{" "}
            <span className={styles.Italics}>{telegramHandle}</span>
          </ListGroupItem>
          <ListGroupItem>
            Email: <span className={styles.Italics}>{email}</span>
          </ListGroupItem>
          <ListGroupItem>
            HP: <span className={styles.Italics}>{phoneNumber}</span>
          </ListGroupItem>
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
