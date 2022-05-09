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
import { fstore, storage } from "../../firebase-config.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
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
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (venue === "") {
      return alert("Venue cannot be left empty");
    } else if (fees === -1) {
      return alert("Fees cannot be left empty");
    } else if (venue.length > 50) {
      return alert("Venue characters cannot exceed 100");
    } else if (fees.length > 50) {
      return alert("Fees characters cannot exceed 100");
    } else {
      if (form.checkValidity()) {
        setOnHideModal(true);
        setValidated(true);
      }
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
    const newGame = await addDoc(gamesCollectionRef, addedGame);
    console.log(newGame.id, "newGame");
    uploadImage(newGame.id);
    setOnHideModal(true);
  }
  // states for user data
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [levelOfPlay, setLevelOfPlay] = useState("Beginner");
  const [formatOfPlay, setFormatOfPlay] = useState("Doubles");
  const [fees, setFees] = useState(-1);
  const [numPlayers, setNumPlayers] = useState(1);
  const [venue, setVenue] = useState("");
  const [imageUploaded, setImageUploaded] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // upload images -  called in handleSubmit function

  // reference to upload images
  async function uploadImage(id) {
    const userGameRef = doc(fstore, "userGames", id);
    if (imageUploaded == null) {
      await updateDoc(userGameRef, {
        // if no image was used, set the image to logo
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/sgbadmintonstop-7da0c.appspot.com/o/userGameImages%2FVVvov4EGLERVvzdHNAZ8?alt=media&token=aafe904c-66ed-4088-a44b-d38012d6d225",
      });
    } else {
      const imageRef = ref(storage, `userGameImages/${id}`);
      uploadBytes(imageRef, imageUploaded).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await updateDoc(userGameRef, {
            imageUrl: url,
          });
        });
      });
    }
  }

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

  console.log(imageUploaded, "imageUploaded");
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
                <Form.Label>Game Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  onChange={(e) => {
                    setImageUploaded(e.target.files[0]);
                  }}
                />
              </Col>
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
