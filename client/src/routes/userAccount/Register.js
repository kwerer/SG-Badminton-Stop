import React, { useState, useContext, useRef } from "react";
import { LoginContext } from "../../commonComponents/Context.js";
import AxiosInstance from "../../commonComponents/AxiosInstance.js";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fstore } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

function Register() {
  // Set object to be true and username
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  // form component
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  // store users into fstore
  // users collection from firestore
  const usersCollectionRef = collection(fstore, "userAccounts");
  async function createUser() {
    await setDoc(doc(fstore, "userAccounts", auth.currentUser.uid), {
      name: userName,
      email: email,
      phoneNumber: Number(phoneNumber),
      telegramHandle: telegramHandle,
    });
  }

  // get the url from where the user was from
  const navigate = useNavigate();
  // get auth function from firebase
  const auth = getAuth();

  // create user into firebase
  async function handleSubmit(e) {
    e.preventDefault();

    // check that passwords match
    if (password1 != password2) {
      return alert("Passwords do not match!");
    }

    createUserWithEmailAndPassword(auth, email, password1)
      .then((userCredential) => {
        // bring user to main page
        navigate("/");

        // Signed in
        const user = userCredential.user;
        // set sessionStorage to persist logged in status between refreshes
        localStorage.setItem("login", true);
        localStorage.setItem("username", userName);
        localStorage.setItem("email", email);

        // add user into firebase
        createUser();
        // set user context
        setLoggedIn({
          ...loggedIn,
          login: true,
          username: userName,
          email: email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let formatError = errorCode
          .substring(5, errorCode.length)
          .split("-")
          .join(" ");

        setErrorCode(formatError);

        // alert user about the error
        alert(formatError);
      });
  }
  console.log(userName, "userName");
  console.log(email, "email");
  console.log(phoneNumber, "phoneNumber");
  console.log(password1, "password1");

  return (
    <div className={styles.RegisterLoginMain}>
      <div className={styles.RegisterLoginForm}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email (Required)</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Form.Control.Feedback type="invalid">
              Email is not valid
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Telegram Handle (If applicable, include "@")
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="@example"
              onChange={(e) => {
                setTelegramHandle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Re-enter Password"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
          </Form.Group>
          <div className={styles.RegisterLoginButton}>
            <Button type="submit">Register!</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
