import React, { useContext, useState } from "react";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { LoginContext } from "./Context.js";
import Logo from "../Images/Logo.jpg";
import styles from "./styles.module.css";
import LoginModal from "../commonComponents/LoginModal.js";
import { DashCircle } from "react-bootstrap-icons";

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
    NumPlayers,
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
    handleDeleteGame,
    handleRemoveUser,
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
      {/* renders too many modals here  */}
      <LoginModal show={showModal} handleClose={handleClose} />
      <Card style={{ width: "18rem" }} className={styles.MainCard}>
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
            Num of Players: {NumPlayers}
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
                      <span
                        className={`${styles.ListPlayer} ${
                          key >= NumPlayers ? styles.ListPlayer456 : null
                        }`}
                      >
                        {key + 1}. {player}{" "}
                        {key >= NumPlayers ? "(reserve)" : null}
                      </span>
                      {player === loggedIn.username ? (
                        <span>
                          <Button
                            onClick={(e) => handleRemoveUser(e)}
                            value={[player, id]}
                            className={styles.RemoveUserButton}
                          >
                            Remove
                          </Button>
                        </span>
                      ) : null}
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

        {MyGame ? (
          <Card.Body>
            <Button
              variant="danger"
              onClick={(e) => {
                handleDeleteGame(e);
              }}
              value={id}
            >
              Delete Game
            </Button>
          </Card.Body>
        ) : (
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
