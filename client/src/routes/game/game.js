import React, { useEffect, useState, useContext } from "react";
// import context object
import { LoginContext } from "../../commonComponents/Context";
import { Outlet, useNavigate } from "react-router-dom";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";
import AxiosInstance from "../../commonComponents/AxiosInstance";
import AddButton from "../../commonComponents/AddButton";
import LoginModal from "../../commonComponents/LoginModal";

export default function Home() {
  // Context object to check if user is logged in
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  let navigate = useNavigate();

  // state to determine if the modal is on or off
  const [modalOpen, setModalOpen] = useState(false);

  // all games stored as objects in a list
  const [gamesData, setGamesData] = useState([]);
  async function getData() {
    const response = await AxiosInstance.get("/games").then((res) => {
      setGamesData(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  // function to update data in mongodb game data document
  async function registerUserUpdate(ID) {
    const registerData = {
      username: loggedIn.username,
      gameID: ID,
    };
    const response = await AxiosInstance.post("/games", registerData);
  }
  // register loggedin user
  function handleRegister(e) {
    const gameID = e.target.value;
    if (loggedIn.login) {
      console.log("logged in");
      registerUserUpdate(gameID);
      // register use by creating a post request to add user's username in array
    } else {
      // modal to ask user to login
      setModalOpen(true);
    }
  }

  // edit game
  function handleEditGame() {
    navigate(`/mygames/${loggedIn.username}`);
  }
  return (
    <>
      <LoginModal
        show={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
      />
      <div className={styles.MainDiv}>
        <div className={styles.AddGameDiv}>
          <h1>All Games</h1>
          <AddButton link="new" variant="primary" content="Add Game!" />
        </div>
        <div className={styles.GamesCard}>
          <Outlet />
          {gamesData.length !== 0 ? (
            gamesData.reverse().map((val, key) => {
              return (
                <div className={styles.GameCardIndivDiv} key={key}>
                  <GameCard
                    title={val.venue}
                    date={val.date}
                    players={val.players}
                    time={val.time}
                    level={val.levelOfPlay}
                    format={val.formatOfPlay}
                    fees={val.fees}
                    id={val._id}
                    name={val.orgName}
                    key={key}
                    buttonText="Sign Up!"
                    buttonVariant="secondary"
                    buttonFunction={handleRegister}
                    organiserButtonText="Edit Your Game"
                    organiserButtonVariant="warning"
                    organiserButtonFunction={handleEditGame}
                  />
                </div>
              );
            })
          ) : (
            <div>No Games Currently!</div>
          )}
        </div>
      </div>
    </>
  );
}
