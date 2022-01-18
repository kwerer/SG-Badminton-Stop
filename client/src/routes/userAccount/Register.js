import React, { useState, useContext } from "react";
import { LoginContext } from "../../commonComponents/Context.js";
import AxiosInstance from "../../commonComponents/AxiosInstance.js";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  // Set object to be true and username
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // function to register and authenticate user
  async function addUser() {
    const addedUser = {
      username: userName,
      email: email,
      password: password1,
      hp: phoneNumber,
      telegramHandle: telegramHandle,
    };

    const promise = AxiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/register`,
      addedUser
    );

    // set sessionStorage to persist logged in status between refreshes
    const dataPromise = await promise.then((res) => {
      sessionStorage.setItem("login", true);
      sessionStorage.setItem("username", res.data.username);
      sessionStorage.setItem("email", res.data.email);
      return res.data;
    });

    // allow user to get into look for games page when they register
    if (dataPromise) {
      navigate("/games");
      setLoggedIn({
        ...loggedIn,
        login: true,
        username: dataPromise.username,
        email: dataPromise.email,
      });
    } else {
      // if there is an error, nothing is res from the server
      alert("Username/Email is taken");
      window.location.reload();
    }
  }

  // form component
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [validated, setValidated] = useState(false);

  // get the url from where the user was from
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    // need to check backend for
    // 1. username is taken
    // 2. email is taken
    event.preventDefault();
    event.stopPropagation();
    // check if user is using common password
    const commonPassword = [
      "123456",
      "password",
      "12345",
      "123456789",
      "password1",
      "abc123",
      "12345678",
      "qwerty",
    ];
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // need to check user password is the same
    } else if (password1 !== password2) {
      alert("Passwords do not match");
    } else if (
      commonPassword.includes(password1) ||
      password1.length < 5
    ) {
      alert("Please use a stronger password");
    } else {
      try {
        addUser();
      } catch (e) {
        console.log(e);
      }

      // navigate to /games/new when user is registered
      // navigate("/");
    }

    setValidated(true);
  };

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
              type="number"
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Telegram Handle (If applicable)</Form.Label>
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
