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
import EditUserProfile from "./EditUserProfile";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  // user context for login check
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // to bring user back to main page using navigate
  const navigate = useNavigate();
  // logout modal state
  const [loggedOutModal, setLoggedOutModal] = useState(false);
  // user profile modal
  const [userProfileModal, setUserProfileModal] = useState(false);
  // function to close logout modal
  function handleCloseLogoutModal() {
    setLoggedOutModal(false);
  }
  // function to close user profile modal
  function handleCloseUserProfileModal() {
    setUserProfileModal(false);
  }
  const auth = getAuth();
  // function to clear login details
  function handleLogOut() {
    signOut(auth);
    localStorage.clear();
    setLoggedIn({ login: false, username: "", email: "" });
    setLoggedOutModal(true);
    navigate("/games");
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
  ];

  function handleEditProfile() {
    setUserProfileModal(true);
  }
  return (
    <>
      <LogoutModal
        handleClose={handleCloseLogoutModal}
        show={loggedOutModal}
      />
      <EditUserProfile
        handleClose={handleCloseUserProfileModal}
        show={userProfileModal}
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
                      <Dropdown.Item onClick={handleEditProfile}>
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to={`mygames/${loggedIn.username}`}
                      >
                        My Games
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to={`registeredgames/${loggedIn.username}`}
                      >
                        Registered Games
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
