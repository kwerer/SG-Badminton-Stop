import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import styles from "./styles.module.css";

function FormRowSelect(props) {
  const { label, options, onChangeFunction } =
    props;

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
        <Form.Select
          aria-label="Default select example"
          onChange={onChangeFunction}
        >
          {options.map((val, key) => {
            return (
              <option key={key} value={val}>
                {val}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
    </Row>
  );
}

export default FormRowSelect;
