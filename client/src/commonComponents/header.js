import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <Navbar bg="light" variant="light">
      <Container
        fluid
        className={styles.HeaderContainer}
      >
        <Nav className={styles.HeaderContainer}>
          <Nav.Link href="#games">Games</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Navbar.Brand href="#home">
            Image
          </Navbar.Brand>
          <Nav.Link href="#news">News</Nav.Link>
          <Nav.Link href="#shop">Shop</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
