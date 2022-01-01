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
import SubmitModal from "../../commonComponents/SubmitModal";
import axiosInstance from "../../commonComponents/axiosInstance";

function AddGame() {
  // states, function for user form
  const [onHideModal, setOnHideModal] =
    useState(false);
  const [validated, setValidated] =
    useState(false);
  const [showAlert, setShowAlert] =
    useState(true);
  const handleSubmit = (e) => {
    const form = e.currentTarget;

    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity)
      if (form.checkValidity() === false) {
        // if there are wrong fields
      } else {
        // alert/modal for confirmation
        setOnHideModal(true);
      }

    // false if form is submitted
    // true if form is not submitted
    setValidated(true);
  };

  // states for user data
  const [startDate, setStartDate] = useState(
    new Date()
  );
  const [endDate, setEndDate] = useState(
    new Date()
  );
  const [name, setName] = useState("");
  const [levelOfPlay, setLevelOfPlay] =
    useState("Beginner");
  const [formatOfPlay, setFormatOfPlay] =
    useState("Doubles");

  // axios post request
  function postGames() {
    // complete the number of options before you start to create post request
    // fees and number of players
    axiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/new`,
      { level: levelOfPlay, format: formatOfPlay }
    );
  }

  // constant options
  const levelOfPlayList = [
    "Beginner",
    "High Beginner",
    "Low Intermediate",
    "Intermediate",
    "Advanced",
  ];

  const formatOfPlayList = [
    "Doubles",
    "Singles",
    "Singles & Doubles",
  ];

  console.log(formatOfPlay, "format");
  console.log(levelOfPlay, "level");
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
            onChangeFunction={(e) => {
              setLevelOfPlay(e.target.value);
            }}
          />
          <FormRowSelect
            label="Format Of Play"
            options={formatOfPlayList}
            onChangeFunction={(e) => {
              setFormatOfPlay(e.target.value);
            }}
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
        <SubmitModal
          onHide={onHideModal}
          show={onHideModal}
          onHide={() => {
            setOnHideModal(false);
          }}
          link="/games"
          header="Game Successfully Added!"
          body="Close to see your game!"
        />
      </div>
    </div>
  );
}

export default AddGame;
