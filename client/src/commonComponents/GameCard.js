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
    id,
    name,
    buttonFunction,
    buttonVariant,
    buttonText,
    registeredButtonText,
    registeredVariant,
    organiserButtonFunction,
    organiserButtonVariant,
    organiserButtonText,
    MyGame,
    handlePlayerDetails,
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
        {/*  logic to list players  */}
        {players.length !== 0 ? (
          <ListGroup className={`${styles.ListGroup} list-group-flush`}>
            {players !== {}
              ? playerNames.map((player, key) => {
                  return (
                    <ListGroupItem
                      key={key}
                      className={styles.ListGroupItem}
                    >
                      <span className={MyGame ? styles.ListPlayer : null}>
                        {key + 1}. {player}
                      </span>
                      {MyGame ? (
                        <span className={styles.ListPlayerButton}>
                          <Button
                            variant="info"
                            value={player}
                            onClick={handlePlayerDetails}
                          >
                            Details
                          </Button>
                        </span>
                      ) : null}
                    </ListGroupItem>
                  );
                })
              : null}
          </ListGroup>
        ) : null}
        {/* logic for organiser button on all games page */}
        {MyGame === true ? null : (
          <>
            {loggedIn.username !== name ? (
              <>
                <Card.Body>
                  {!players.includes(loggedIn.username) ? (
                    <Button
                      value={id}
                      onClick={buttonFunction}
                      variant={buttonVariant}
                    >
                      {buttonText}
                    </Button>
                  ) : (
                    <Button disabled variant={registeredVariant}>
                      {registeredButtonText}
                    </Button>
                  )}
                </Card.Body>
              </>
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
          </>
        )}
      </Card>
    </>
  );
}

export default GameCard;
