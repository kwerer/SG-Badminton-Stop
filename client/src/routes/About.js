import React from "react";
import styles from "./styles.module.css";

function About() {
  return (
    <div className={styles.MainDiv}>
      <div className={styles.MainPopUp}>
        <h3>About Us</h3>
        <div>
          We started out at our telegram channel, SG Badminton Stop Channel
          and we have expanded to reach out to even more players! <br />
          <br />
          Add your game on our site and connect with like-minded badminton
          enthusiast around Singapore!
          <br />
          <br />
          <br />
          <h5>Instructions:</h5>
          <h6>Organiser:</h6>
          <ol>
            <li>Click on "Add Games" to add your games</li>
            <li>Answer some basic questions for players to find you</li>
            <li>Wait for players to sign up for your game! </li>
          </ol>
          <h6>Player:</h6>
          <ol>
            <li>Register for games!</li>
          </ol>
          <div>
            For any enquries please email:{" "}
            <a href="mailto:badstophelp@gmail.com">
              badstophelp@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
