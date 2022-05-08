import React, { useState, useContext } from "react";
import { LoginContext } from "../../commonComponents/Context.js";
import AxiosInstance from "../../commonComponents/AxiosInstance.js";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { fstore } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  // Set object to be true and username
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // get the url from where the user was from
  const navigate = useNavigate();

  // get auth from firebase
  const auth = getAuth();
  // function to authenticate existing user
  async function loginUser() {
    console.log("user login");
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userUid = user.uid;
        console.log(user, "user in login");

        // set username from firebase
        const q = query(
          collection(fstore, "userAccounts"),
          where("email", "==", email)
        );
        const userData = await getDocs(q);

        // set localStorage to persist logged in status between refreshes
        localStorage.setItem("login", true);
        localStorage.setItem("email", email);
        localStorage.setItem("username", userData.docs[0].data().name);

        // set login context to render details
        setLoggedIn({
          ...loggedIn,
          login: true,
          username: userData.docs[0].data().name,
          email: email,
        });

        // bring user to main page
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error, "errorcode from login");
        let formatError = errorCode
          .substring(5, errorCode.length)
          .split("-")
          .join(" ");

        setErrorCode(formatError);

        // alert user about the error
        alert(formatError);
      });
  }
  console.log(localStorage, "localStorage");
  console.log(loggedIn, "loggedIn from login");

  // form component
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    loginUser();

    setValidated(true);
  };

  console.log(auth.currentUser, "authokkk");
  return (
    <div className={styles.RegisterLoginMain}>
      <div className={styles.RegisterLoginForm}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Form.Control.Feedback type="invalid">
              Username cannot be empty
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div className={styles.RegisterLoginButton}>
            <Button type="submit">Login!</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
