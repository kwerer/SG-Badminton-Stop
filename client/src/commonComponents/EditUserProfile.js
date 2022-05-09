import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "./Context";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { fstore } from "../firebase-config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";
import * as Icon from "react-bootstrap-icons";
import styles from "./styles.module.css";

function EditUserProfile(props) {
  // user context for user details
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { show, handleClose } = props;

  // states of edit credentials
  const [editUsername, setEditUsername] = useState(false);
  const [editUsernameText, setEditUsernameText] = useState(
    loggedIn.username
  );
  const [editPassword, setEditPassword] = useState(false);
  const [editPasswordText, setEditPasswordText] = useState("??????");

  // function to change username
  async function handleChangeUsername() {
    setEditUsername(true);
  }
  // function to save username - function not in use
  async function handleSaveUsername() {
    const userDetailsDocRef = doc(fstore, "userAccounts", user.uid);
    const userGamesDocRef = collection(fstore, "userGames");
    const checkUsernameInArray = query(
      userAccountsRef,
      where("players", "array-contains", `${editUsernameText}`)
    );
    const getCheckArrayUsername = await getDocs(checkUsernameInArray);
    getCheckArrayUsername.forEach((doc) => {
      console.log(doc.data(), "data");
    });

    // check if username is taken
    const userAccountsRef = collection(fstore, "userAccounts");
    const checkUsername = query(
      userAccountsRef,
      where("name", "==", `${editUsernameText}`)
    );
    const getCheck = await getDocs(checkUsername);
    // array that contains this username is empty
    if (getCheck.empty) {
      // update name in userAccounts
      await updateDoc(userDetailsDocRef, {
        name: editUsernameText,
      });

      // update local storage
      localStorage.setItem("username", editUsernameText);
      // update user context
      setLoggedIn({
        ...loggedIn,
        username: editUsernameText,
      });

      alert("Username Updated!");
      setEditUsername(false);
    } else {
      alert("Username is taken, please choose another username");
    }
  }

  // function to change password
  function handleChangePassword() {
    setEditPassword(true);
  }

  // function to save password
  function handleSavePassword() {
    updatePassword(user, editPasswordText)
      .then(() => {
        alert("Password Updated!");
      })
      .catch((e) => {
        alert(e);
      });
    setEditPassword(false);
  }

  // firebase
  const user = getAuth().currentUser;

  useEffect(() => {
    setEditPassword(false);
    setEditPasswordText("");
    setEditUsername(false);
    setEditUsernameText("");
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>My Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.EditUserProfileBody}>
        <div className={styles.EditUserProfileDiv}>
          <span>
            <span>Username: </span>
            {editUsername ? (
              <InputGroup className="mb-3">
                <FormControl
                  onChange={(e) => {
                    setEditUsernameText(e.target.value);
                  }}
                  placeholder="New Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            ) : (
              <span>{loggedIn.username}</span>
            )}
          </span>
          <span>
            {editUsername ? (
              <Button
                disabled
                variant="success"
                onClick={handleSaveUsername}
              >
                <Icon.Check /> Save
              </Button>
            ) : (
              <Button
                disabled
                variant="warning"
                onClick={handleChangeUsername}
              >
                <Icon.PencilFill /> Edit
              </Button>
            )}
          </span>
        </div>
        <div className={styles.EditUserProfileDiv}>
          <span>Email: {loggedIn.email}</span>
        </div>
        <div className={styles.EditUserProfileDiv}>
          <span>
            Password:{" "}
            {editPassword ? (
              <InputGroup className="mb-3">
                <FormControl
                  onChange={(e) => {
                    setEditPasswordText(e.target.value);
                  }}
                  placeholder="New Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            ) : (
              <span>??????</span>
            )}
          </span>
          <span>
            {editPassword ? (
              <Button variant="success" onClick={handleSavePassword}>
                <Icon.Check /> Save
              </Button>
            ) : (
              <Button variant="warning" onClick={handleChangePassword}>
                <Icon.PencilFill /> Change Password
              </Button>
            )}
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserProfile;
