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

function AddGame() {
  // Context object to get the username of the logged in person who registered game
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  // states, function for user form
  const [onHideModal, setOnHideModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState("");
  const [levelOfPlay, setLevelOfPlay] = useState("Beginner");
  const [formatOfPlay, setFormatOfPlay] = useState("Doubles");
  const [fees, setFees] = useState(0);
  const [numPlayers, setNumPlayers] = useState(1);
  const [venue, setVenue] = useState("");

  // axios post request to send email
  async function confirmationEmail(to, subject, text) {
    const userData = {
      to: to,
      subject: subject,
      text: text,
    };
    const response = await AxiosInstance.post("/mail", userData);
    console.log(response, "confirmationemailresponse");
  }
  // axios post request
  async function postGames() {
    // object add game to games collection
    const addedGame = {
      numOfPlayers: numPlayers,
      time: `${
        startDate.getHours() < 10 ? "0" : ""
      }${startDate.getHours()}${
        startDate.getMinutes() < 10 ? "0" : ""
      }${startDate.getMinutes()} 
       -
        ${endDate.getHours() < 10 ? "0" : ""}${endDate.getHours()}${
        endDate.getMinutes() < 10 ? "0" : ""
      }${endDate.getMinutes()}
      `,
      levelOfPlay: levelOfPlay,
      formatOfPlay: formatOfPlay,
      fees: fees,
      venue: venue,
      date: `${startDate.getDate()}-${
        startDate.getMonth() + 1
      }-${startDate.getFullYear()}`,
      // gets the username of the user that is currently loggedIn
      orgName: loggedIn.username,
      players: [],
      startTimeInMs: startDate,
    };
    // post games to
    setLoggedIn({ ...loggedIn, isLoading: true });
    const response = await AxiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/games/new`,
      addedGame
    );
    if (response.data.isDone) {
      setLoggedIn({ ...loggedIn, isLoading: false });
      // function to send email
      confirmationEmail(
        loggedIn.email,
        "Game Successfully added!",
        loggedIn.username
      );
    }

    // console.log(addedGame, "addedGame");
  }

  // constant options
  const levelOfPlayList = [
    "Beginner",
    "High Beginner",
    "Low Intermediate",
    "Intermediate",
    "Advanced",
  ];

  const formatOfPlayList = ["Doubles", "Singles", "Singles & Doubles"];
  // change when can more than 5 people
  const numPlayersList = [1, 2, 3, 4, 5];

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
              label="Fees"
              feedback="Looks Good!"
              placeholder="$12"
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
                <Button type="submit" onClick={postGames}>
                  Submit
                </Button>
                {loggedIn.isLoading ? (
                  <TailSpin color="#00BFFF" height={80} width={80} />
                ) : null}
              </Col>
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
    </>
  );
}

export default AddGame;
