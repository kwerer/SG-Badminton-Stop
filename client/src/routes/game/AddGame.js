import React, { useState } from "react";
// import date picker and css
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import bootstrap form from common
import FormRow from "../../commonComponents/FormRow";
import {
  Row,
  Form,
  Col,
  Button,
} from "react-bootstrap";
import styles from "./styles.module.css";
import FormRowSelect from "../../commonComponents/FormRowSelect";

function AddGame() {
  // states, function for user form
  const [validated, setValidated] =
    useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    // alert/modal for confirmation
    // redirect user back to games page
  };
  // states for user data
  const [startDate, setStartDate] = useState(
    new Date()
  );
  const [endDate, setEndDate] = useState(
    new Date()
  );
  const [name, setName] = useState("");

  // constant options
  const levelOfPlayList = [
    "Beginner",
    "High Beginner",
    "Low Intermediate",
    "Intermediate",
    "Advanced",
  ];

  const formatOfPlayList = [
    "Singles",
    "Doubles",
    "Singles & Doubles",
  ];
  return (
    <div className={styles.AddGameMain}>
      <div className={styles.AddGameForm}>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <FormRow
            label="Venue"
            feedback="Looks Good!"
            placeholder="e.g. Pasir Ris Sports Hall"
            negativeFeedback="Please provide a valid venue."
          />
          <FormRow
            label="Fees"
            feedback="Looks Good!"
            negativeFeedback="Please provide a valid fee."
          />
          <FormRowSelect
            label="Level Of Play"
            options={levelOfPlayList}
          />
          <FormRowSelect
            label="Format Of Play"
            options={formatOfPlayList}
          />
          <Row
            className={`mb-3 ${styles.FormRowGroup}`}
          >
            <Form.Group
              as={Col}
              md="8"
              controlId="validationCustom01"
            >
              <Form.Label>Start Time</Form.Label>
              <DatePicker
                selected={startDate}
                showTimeSelect
                onChange={(date) =>
                  setStartDate(date)
                }
                dateFormat="Pp"
              />
              <Form.Label>End Time</Form.Label>
              <DatePicker
                selected={endDate}
                showTimeSelect
                onChange={(date) =>
                  setEndDate(date)
                }
                dateFormat="Pp"
              />
            </Form.Group>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col>
              <Button type="submit">
                Submit
              </Button>
            </Col>

            <Col xs={2}></Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default AddGame;
