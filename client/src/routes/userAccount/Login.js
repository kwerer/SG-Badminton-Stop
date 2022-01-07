import React, { useState, useContext } from "react";
import { LoginContext } from "../../commonComponents/Context.js";
import AxiosInstance from "../../commonComponents/AxiosInstance.js";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  // Set object to be true and username
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // get the url from where the user was from
  const navigate = useNavigate();
  // function to authenticate existing user
  async function loginUser() {
    const addedUser = {
      username: userName,
      email: email,
      password: password1,
    };
    const promise = AxiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/login`,
      addedUser
    );

    const dataPromise = await promise.then((res) => {
      sessionStorage.setItem("login", true);
      sessionStorage.setItem("username", res.username);
      return res.data.username;
    });

    if (dataPromise) {
      navigate("/games");
      setLoggedIn({ login: true, username: dataPromise });
    } else {
      alert("Wrong login credentials");
      window.location.reload();
    }
  }
  // form component
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [validated, setValidated] = useState(false);

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
      loginUser();
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
              Username cannot be empty
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

          <div className={styles.RegisterLoginButton}>
            <Button type="submit">Login!</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
