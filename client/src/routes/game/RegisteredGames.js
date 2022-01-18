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

function RegisteredGames() {
  // Context object to get the username of the logged in person who registered game
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  // all games stored as objects in a list
  const [gamesData, setGamesData] = useState([]);

  // store all players registered for game here
  const [userDetails, setUserDetails] = useState({});

  let param = useParams();
  // first render to get all user organised games
  async function getData() {
    const response = await AxiosInstance.get(
      `registeredgames/${param.username}`
    ).then((res) => {
      setGamesData(res.data);
    });
  }
  useEffect(() => {
    setLoggedIn({ ...loggedIn, isLoading: true });
    getData();
    setLoggedIn({ ...loggedIn, isLoading: false });
  }, []);

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
          <LoginModal show={!loggedIn.login} />

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
                        registeredVariant="success"
                        registeredButtonText="Registered!"
                        handleRemoveUser={handleRemoveUser}
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

export default RegisteredGames;
