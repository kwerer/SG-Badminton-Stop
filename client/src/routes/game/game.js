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
    console.log(ID, "registeruserupdate");
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
    console.log(e.target.value, "game id");
    console.log(loggedIn, "logeedin");
    if (loggedIn.login) {
      console.log("logged in and register");
      registerUserUpdate(e.target.value);
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
  // axios request to remove user
  async function removeUser(data) {
    const filterList = data.split(",");
    const userId = filterList[0];
    const gameId = filterList[1];
    console.log(filterList, "filterList");
    const response = await AxiosInstance.delete("/games", {
      // data here is the value of button passed as an array
      data: { gameId: gameId, userId: userId },
    });
  }
  // allow individual user to remove themselves
  function handleRemoveUser(e) {
    removeUser(e.target.value);
    window.location.reload();
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
            gamesData.map((val, key) => {
              return (
                <>
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
                      buttonFunction={handleRegister}
                      buttonVariant="secondary"
                      buttonText="Sign Up!"
                      registeredButtonText="Registered!"
                      registeredVariant="success"
                      organiserButtonFunction={handleEditGame}
                      organiserButtonVariant="warning"
                      organiserButtonText="Edit Your Game"
                      handleRemoveUser={handleRemoveUser}
                    />
                  </div>
                </>
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
