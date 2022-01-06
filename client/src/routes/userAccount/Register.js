import React, { useState } from "react";
import AxiosInstance from "../../commonComponents/AxiosInstance.js";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  // function to post game
  async function addUser() {
    const addedUser = {
      username: userName,
      email: email,
      password: password1,
    };

    const promise = AxiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/register`,
      addedUser
    );

    const dataPromise = await promise.then((res) => res.data.userCreated);
    if (dataPromise) {
      navigate("/games");
    } else {
      alert("Username/Email is taken");
      navigate("/register");
    }
  }

  // form component
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
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
    // need to check user password is the same
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
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
          <Form.Group controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />

            <Form.Control.Feedback type="invalid">
              Username is taken, please enter another username
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
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
              Email already has an account that is signed up.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Password"
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Re-enter Password"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />

            <Form.Control.Feedback type="invalid">
              Please ensure that the password is the same.
            </Form.Control.Feedback>
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
