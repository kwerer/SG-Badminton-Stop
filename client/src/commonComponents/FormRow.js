import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import styles from "./styles.module.css";

function FormRow(props) {
  const {
    label,
    feedback,
    placeholder,
    negativeFeedback,
  } = props;
  return (
    <Row
      className={`mb-3 ${styles.FormRowGroup}`}
    >
      <Form.Group
        as={Col}
        md="8"
        controlId="validationCustom01"
      >
        <Form.Label>{label}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={
            placeholder !== undefined
              ? placeholder
              : "Enter your answer"
          }
        />
        <Form.Control.Feedback>
          {feedback}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {negativeFeedback}
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
}

export default FormRow;
