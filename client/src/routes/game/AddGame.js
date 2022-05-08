import React, { useState, useContext } from "react";
// import Context object
import { LoginContext } from "../../commonComponents/Context";
// import date picker and css
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import bootstrap form from common
import FormRow from "../../commonComponents/FormRow";
import { Row, Form, Col, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import FormRowSelect from "../../commonComponents/FormRowSelect";
import SubmitModal from "../../commonComponents/SubmitModal";
import AxiosInstance from "../../commonComponents/AxiosInstance";
import LoginModal from "../../commonComponents/LoginModal";
import { TailSpin } from "react-loader-spinner";
import { fstore } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

function AddGame() {
  // Context object to get the username of the logged in person who registered game
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  // states, function for user form
  const [onHideModal, setOnHideModal] = useState(false);
  const [validated, setValidated] = useState(false);

  async function handleSubmit(e) {
    const form = e.currentTarget;

    e.preventDefault();
    e.stopPropagation();
    console.log(form.checkValidity(), "form");
    if (form.checkValidity()) {
      setOnHideModal(true);
      setValidated(true);
    }

    // user games details
    const addedGame = {
      numOfPlayers: numPlayers,
      startTime: Timestamp.fromDate(new Date(startDate)),
      endTime: Timestamp.fromDate(new Date(endDate)),
      levelOfPlay: levelOfPlay,
      formatOfPlay: formatOfPlay,
      fees: fees,
      venue: venue,
      // gets the username of the user that is currently loggedIn
      orgName: loggedIn.username,
      players: [],
    };
    // submit user game details
    // users collection from firestore
    const gamesCollectionRef = collection(fstore, "userGames");
    await addDoc(gamesCollectionRef, addedGame);
  }
  // states for user data
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [levelOfPlay, setLevelOfPlay] = useState("Beginner");
  const [formatOfPlay, setFormatOfPlay] = useState("Doubles");
  const [fees, setFees] = useState(0);
  const [numPlayers, setNumPlayers] = useState(1);
  const [venue, setVenue] = useState("");

  // constant options
  const levelOfPlayList = [
    "Beginner",
    "High Beginner",
    "Low Intermediate",
    "Intermediate",
    "Advanced",
    "Professional",
  ];

  const formatOfPlayList = ["Doubles", "Singles", "Singles & Doubles"];
  // change when can more than 5 people
  const numPlayersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <LoginModal show={!loggedIn.login} />
      <div className={styles.AddGameMain}>
        <div className={styles.AddGameForm}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FormRow
              label="Venue"
              feedback="Looks Good!"
              placeholder="e.g. Pasir Ris Sports Hall"
              negativeFeedback="Please provide a valid venue."
              onChangeFunction={(e) => {
                setVenue(e.target.value);
              }}
            />
            <FormRow
              label="Fees ($)"
              feedback="Looks Good!"
              placeholder="12"
              negativeFeedback="Please provide a valid fee."
              onChangeFunction={(e) => {
                setFees(e.target.value);
              }}
            />
            <FormRowSelect
              label="Number of players"
              options={numPlayersList}
              onChangeFunction={(e) => {
                setNumPlayers(e.target.value);
              }}
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
            <Row className={`mb-3 ${styles.FormRowGroup}`}>
              <Form.Group
                as={Col}
                md="8"
                controlId="validationCustom01"
                className={styles.FormTime}
              >
                <div>
                  <Form.Label>Start Time</Form.Label>
                  <DatePicker
                    selected={startDate}
                    showTimeSelect
                    onChange={(date) => setStartDate(date)}
                    dateFormat="Pp"
                  />
                </div>

                <div>
                  <Form.Label>End Time</Form.Label>
                  <DatePicker
                    selected={endDate}
                    showTimeSelect
                    onChange={(date) => setEndDate(date)}
                    dateFormat="Pp"
                  />
                </div>
              </Form.Group>
            </Row>
            <Row className={`mb-3 ${styles.FormRowGroup}`}>
              <Col md="8">
                <Button type="submit">Submit</Button>
                {loggedIn.isLoading ? (
                  <TailSpin color="#00BFFF" height={80} width={80} />
                ) : null}
              </Col>
            </Row>
          </Form>
          <SubmitModal
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
    </>
  );
}

export default AddGame;
