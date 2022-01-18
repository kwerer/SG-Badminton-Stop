import React, { useEffect, useState, useContext } from "react";
// import context object
import { LoginContext } from "../../commonComponents/Context";
import { Outlet, useNavigate, Link } from "react-router-dom";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";
import AxiosInstance from "../../commonComponents/AxiosInstance";
import LoginModal from "../../commonComponents/LoginModal";
import { Button } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";

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
      const data = res.data.reverse();

      setGamesData(data);
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
    setLoggedIn({ ...loggedIn, isLoading: true });
    const response = await AxiosInstance.post("/games", registerData);
    setLoggedIn({ ...loggedIn, isLoading: false });
  }

  // function to update data in mongodb game data document (remove user)
  async function removeUserUpdate(ID) {
    const removeData = { username: loggedIn.username, gameID: ID };
    setLoggedIn({ ...loggedIn, isLoading: true });
    const response = await AxiosInstance.post("/games", removeData);

    setLoggedIn({ ...loggedIn, isLoading: false });
  }

  // confirmation email for registering user
  async function registerUserConfirmationEmail() {
    const userData = {
      to: loggedIn.email,
      subject: "Registered!",
      text: loggedIn.username,
    };
    const response = AxiosInstance.post("/mail/registerUser", userData);
  }

  // register loggedin user for game
  function handleRegister(e) {
    if (loggedIn.login) {
      console.log("logged in and register");
      registerUserUpdate(e.target.value);
      setRegisterModalOpen(false);
      // function to send email to confirm registered user
      registerUserConfirmationEmail();
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
    // isLoading value for loader spinner
    setLoggedIn({ ...loggedIn, isLoading: true });
    const response = await AxiosInstance.delete("/games", {
      // data here is the value of button passed as an array
      data: { gameId: gameId, userId: userId },
    });
    setLoggedIn({ ...loggedIn, isLoading: false });
  }
  // allow individual user to remove themselves
  function handleRemoveUser(e) {
    removeUser(e.target.value);
    window.location.reload();
  }
  return (
    <>
      {loggedIn.isLoading ? (
        <div className="loading-center-spinner">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
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
                          key={key}
                          NumPlayers={val.numOfPlayers}
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
      )}
    </>
  );
}
