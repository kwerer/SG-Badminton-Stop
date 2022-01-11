import React, { useEffect, useState, useContext } from "react";
// import context object
import { LoginContext } from "../../commonComponents/Context";
import { Outlet, useNavigate, Link } from "react-router-dom";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";
import AxiosInstance from "../../commonComponents/AxiosInstance";
import LoginModal from "../../commonComponents/LoginModal";
import { Button } from "react-bootstrap";

export default function Home() {
  // Context object to check if user is logged in
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  let navigate = useNavigate();

  // state to determine if the login modal is on or off
  const [modalOpen, setModalOpen] = useState(false);

  // state to determine if the register modal is on or off
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  function handleOpenRegisterModal() {
    setRegisterModalOpen(true);
  }
  function handleCloseRegisterModal() {
    setRegisterModalOpen(false);
  }

  // all games stored as objects in a list
  const [gamesData, setGamesData] = useState([]);

  // get game cards
  async function getData() {
    const response = await AxiosInstance.get("/games").then((res) => {
      setGamesData(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  // function to update data in mongodb game data document (add user)
  async function registerUserUpdate(ID) {
    const registerData = {
      username: loggedIn.username,
      gameID: ID,
    };
    const response = await AxiosInstance.post("/games", registerData);
  }

  // function to update data in mongodb game data document (remove user)
  async function removeUserUpdate(ID) {
    const removeData = { username: loggedIn.username, gameID: ID };
    const response = await AxiosInstance.post("/games", removeData);
  }

  // register loggedin user
  function handleRegister(e) {
    const gameID = e.target.value;
    console.log(gameID, "game id");
    if (loggedIn.login) {
      console.log("logged in and register");
      registerUserUpdate(gameID);
      setRegisterModalOpen(false);
      window.location.reload();
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
          <Button
            as={Link}
            to="new"
            variant="primary"
            className={styles.AddGamesButton}
          >
            Add Games!
          </Button>
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
                    registeredButtonText="Registered!"
                    buttonVariant="secondary"
                    registeredVariant="success"
                    buttonFunction={handleRegister}
                    organiserButtonText="Edit Your Game"
                    organiserButtonVariant="warning"
                    organiserButtonFunction={handleEditGame}
                    registerModalOpen={registerModalOpen}
                    handleOpenRegisterModal={handleOpenRegisterModal}
                    handleCloseRegisterModal={handleCloseRegisterModal}
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
