import React from "react";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import styles from "./styles.module.css";
import Logo from "../Images/Rectangle-logo-without-bg.png";
import { Link } from "react-router-dom";

export default function Header() {
  const NavLinks = [
    {
      title: "Look for games",
      link: "games",
      disabled: false,
    },
    {
      title: "About",
      link: "about",
      disabled: false,
    },
    {
      title: "News (Coming Soon!)",
      link: "News",
      disabled: true,
    },
    {
      title: "Shop (Coming Soon!)",
      link: "Shop",
      disabled: true,
    },
  ];
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="games">
            <Image
              src={Logo}
              className={styles.HeaderImage}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {NavLinks.map((val, key) => {
                return (
                  <Nav.Link
                    as={Link}
                    to={val.link}
                    disabled={val.disabled}
                    key={key}
                  >
                    {val.title}
                  </Nav.Link>
                );
              })}
            </Nav>

            <Button
              as={Link}
              to="register"
              variant="outline-primary"
            >
              Register
            </Button>
            <Button
              as={Link}
              to="login"
              variant="outline-primary"
            >
              Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
