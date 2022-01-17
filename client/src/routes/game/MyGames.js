import React, { useEffect, useState, useContext } from "react";
// import context object
import { LoginContext } from "../../commonComponents/Context";
import { Outlet, useParams } from "react-router-dom";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";
import AxiosInstance from "../../commonComponents/AxiosInstance";
import LoginModal from "../../commonComponents/LoginModal";
import UserDetailsModal from "../../commonComponents/UserDetailsModal";
import { TailSpin } from "react-loader-spinner";

function MyGames() {
  // Context object to get the username of the logged in person who registered game
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  // all games stored as objects in a list
  const [gamesData, setGamesData] = useState([]);

  // store all players registered for game here
  const [userDetails, setUserDetails] = useState({});
  const [indivPlayerModal, setIndivPlayerModal] = useState(false);

  let param = useParams();
  // first render to get all user organised games
  async function getData() {
    const response = await AxiosInstance.get(
      `mygames/${param.username}`
    ).then((res) => {
      setGamesData(res.data);
    });
  }

  // get request for user games upon clicking details
  async function getUserDetails(e) {
    const params = new URLSearchParams([["username", e.target.value]]);
    setLoggedIn({ ...loggedIn, isLoading: true });
    const response = await AxiosInstance.get(`mygames/${param.username}`, {
      params,
    }).then((res) => {
      console.log(res.data[0], "data0");
      setUserDetails(res.data[0]);
    });
    setLoggedIn({ ...loggedIn, isLoading: false });
  }
  useEffect(() => {
    setLoggedIn({ ...loggedIn, isLoading: true });
    getData();
    setLoggedIn({ ...loggedIn, isLoading: false });
  }, []);

  // edit mygames from user
  function handleEdit() {}

  // get player details function
  function handlePlayerDetails(e) {
    getUserDetails(e);
    setIndivPlayerModal(true);
  }
  // axios request to update db
  async function deleteGame(id) {
    const response = await AxiosInstance.delete("/mygames", {
      data: { gameID: id },
    }).then((res) => {
      // console.log(res, "response");
    });
  }
  // function to delete game from MyGames
  function handleDeleteGame(e) {
    setLoggedIn({ ...loggedIn, isLoading: true });
    deleteGame(e.target.value);
    setLoggedIn({ ...loggedIn, isLoading: false });
    window.location.reload();
  }
  console.log(userDetails, "userdetails");
  return (
    <>
      {loggedIn.isLoading ? (
        <div className="loading-center-spinner">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <LoginModal show={!loggedIn.login} />
          <UserDetailsModal
            show={indivPlayerModal}
            handleClose={() => {
              setIndivPlayerModal(false);
            }}
            username={userDetails.username}
            telegramHandle={userDetails.telegramHandle}
            email={userDetails.email}
            phoneNumber={userDetails.hp}
          />
          <div className={styles.MainDiv}>
            <div className={styles.GamesCard}>
              <Outlet />
              {gamesData.length !== 0 ? (
                gamesData.map((val, key) => {
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
                        MyGame={true}
                        handlePlayerDetails={handlePlayerDetails}
                        handleDeleteGame={handleDeleteGame}
                      />
                    </div>
                  );
                })
              ) : (
                <div>start adding games</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyGames;
