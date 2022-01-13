import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./styles.module.css";

function LogoutModal(props) {
  const { show, handleClose } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={styles.LogoutModalContainer}>
        <Modal.Title>Logged out!</Modal.Title>
      </Modal.Header>
      <Modal.Footer className={styles.LogoutModalContainer}>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;
