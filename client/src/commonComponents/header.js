import React, { useContext, useState } from "react";
import { LoginContext } from "./Context";
import { FiUser } from "react-icons/fi";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Button,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import styles from "./styles.module.css";
import Logo from "../Images/Rectangle-logo-without-bg.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";

export default function Header() {
  // user context for login check
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // to bring user back to main page using navigate
  const navigate = useNavigate();
  // logout modal state
  const [loggedOutModal, setLoggedOutModal] = useState(false);
  // function to close logout modal
  function handleCloseLogoutModal() {
    setLoggedOutModal(false);
  }
  // function to clear login details
  function handleLogOut() {
    sessionStorage.clear();
    setLoggedIn({ loggedIn: false, username: "" });
    setLoggedOutModal(true);
    navigate("/games");
    // create modal here to log out user
  }

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
      <LogoutModal
        handleClose={handleCloseLogoutModal}
        show={loggedOutModal}
      />
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="games">
            <Image src={Logo} className={styles.HeaderImage} />
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

            {loggedIn.login ? (
              <>
                <div className={styles.HeaderUserAccountsLoggedIn}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-primary"
                      id="dropdown-basic"
                    >
                      Hello, {loggedIn.username}
                      <FiUser />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to={`mygames/${loggedIn.username}`}
                      >
                        My Games
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogOut}>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : (
              <ButtonGroup className={styles.HeaderUserAccounts}>
                <Button as={Link} to="login" variant="outline-primary">
                  Login
                </Button>

                <Button as={Link} to="register" variant="outline-primary">
                  Register
                </Button>
              </ButtonGroup>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
