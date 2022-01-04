import React, {
  useEffect,
  useState,
} from "react";
import AxiosInstance from "../../commonComponents/AxiosInstance.js";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";

function Register() {
  async function getData() {
    const response = await AxiosInstance.get(
      "login"
    );
  }
  // function to post game
  function addUser() {
    const addedUser = {
      username: userName,
      email: email,
      password: password1,
    };
    AxiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/register`,
      addedUser
    );
  }
  // form component
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [validated, setValidated] =
    useState(false);

  const handleSubmit = (event) => {
    // need to check backend for
    // 1. username is taken
    // 2. email is taken

    // need to check user password is the same
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.RegisterLoginMain}>
      <div className={styles.RegisterLoginForm}>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
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
              Username is taken, please enter
              another username
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
              Email already has an account that is
              signed up.
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
            <Form.Label>
              Re-enter Password
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Re-enter Password"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />

            <Form.Control.Feedback type="invalid">
              Please ensure that the password is
              the same.
            </Form.Control.Feedback>
          </Form.Group>
          <div
            className={styles.RegisterLoginButton}
          >
            <Button type="submit">
              Register!
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
