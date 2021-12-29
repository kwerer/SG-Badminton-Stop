import React from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Logo from "../Images/Logo.jpg";
import AddButton from "./AddButton";
import styles from "./styles.module.css";

function GameCard(props) {
  const {
    title,
    date,
    players,
    time,
    level,
    format,
    fees,
  } = props;
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={Logo}
          className={styles.CardImage}
        />
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
        <ListGroup className="list-group-flush">
          {players.map((player, key) => {
            return (
              <ListGroupItem>
                {key + 1}. {player}
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <Card.Body>
          <AddButton
            variant="secondary"
            content="Sign Up"
            link="signup"
          />
        </Card.Body>
      </Card>
    </>
  );
}

export default GameCard;
