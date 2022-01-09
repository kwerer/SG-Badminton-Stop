import React, { useContext, useState } from "react";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { LoginContext } from "./Context.js";
import Logo from "../Images/Logo.jpg";
import styles from "./styles.module.css";
import LoginModal from "../commonComponents/LoginModal.js";

function GameCard(props) {
  const {
    title,
    date,
    players,
    time,
    level,
    format,
    fees,
    name,
    id,
    buttonFunction,
    buttonVariant,
    buttonText,
    organiserButtonFunction,
    organiserButtonVariant,
    organiserButtonText,
  } = props;
  // Use context object to check if user is logged in or not
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // modal show state
  const [showModal, setShowModal] = useState(false);
  function handleClose() {
    setShowModal(false);
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
            <br />
            Organiser: {name}
          </Card.Text>
        </Card.Body>

        {players.length !== 0 ? (
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
        ) : null}
        {loggedIn.username !== name ? (
          <Card.Body>
            <Button
              value={id}
              onClick={(e) => {
                buttonFunction(e);
              }}
              variant={buttonVariant}
            >
              {buttonText}
            </Button>
          </Card.Body>
        ) : (
          <Card.Body>
            <Button
              onClick={organiserButtonFunction}
              variant={organiserButtonVariant}
            >
              {organiserButtonText}
            </Button>
          </Card.Body>
        )}
      </Card>
    </>
  );
}

export default GameCard;
