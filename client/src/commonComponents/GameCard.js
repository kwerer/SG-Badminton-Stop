import React, { useContext, useState } from "react";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { LoginContext } from "./Context.js";
import Logo from "../Images/Logo.jpg";
import styles from "./styles.module.css";
import LoginModal from "../commonComponents/LoginModal.js";

function GameCard(props) {
  const { title, date, players, time, level, format, fees, id } = props;
  // Use context object to check if user is logged in or not
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // modal show state
  const [showModal, setShowModal] = useState(false);
  function handleClose() {
    setShowModal(false);
  }

  //when user click sign up for games
  function handleSignUp() {
    // if user is logged in, open modal
    if (loggedIn.login) {
      // add user into games player list
    } // else if user is no logged in
    else {
      setShowModal(true);
    }
  }
  // return names of players as an array
  const playerNames = Object.values(players);

  return (
    <>
      <LoginModal show={showModal} handleClose={handleClose} />
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={Logo} className={styles.CardImage} />
        <Card.Body>
          <Card.Title>Venue: {title}</Card.Title>
          <Card.Text>
            Date: {date}
            <br />
            Time: {time}
            <br />
            Level of play: {level}
            <br />
            Format of play: {format}
            <br />
            Fees: {fees}
          </Card.Text>
        </Card.Body>
        {/* list of players - to be updated */}
        <ListGroup className="list-group-flush">
          {players !== {}
            ? playerNames.map((player, key) => {
                return (
                  <ListGroupItem key={key}>
                    {key + 1}. {player}
                  </ListGroupItem>
                );
              })
            : null}
        </ListGroup>
        <Card.Body>
          <Button onClick={handleSignUp} variant="secondary">
            Sign Up
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default GameCard;
