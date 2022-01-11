import React, { useEffect, useState, useContext } from "react";
// import context object
import { LoginContext } from "../../commonComponents/Context";
import { Outlet, useParams } from "react-router-dom";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";
import AxiosInstance from "../../commonComponents/AxiosInstance";
import LoginModal from "../../commonComponents/LoginModal";

function MyGames() {
  // Context object to get the username of the logged in person who registered game
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  // all games stored as objects in a list
  const [gamesData, setGamesData] = useState([]);

  // store all players registered for game here
  const [indivPlayer, setIndivPlayer] = useState({});

  let param = useParams();

  async function getData() {
    const response = await AxiosInstance.get(
      `mygames/${param.username}`
    ).then((res) => {
      setGamesData(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  // edit mygames from user
  function handleEdit() {}

  console.log(gamesData, "gamesData");
  // get player details function
  function handlePlayerDetails() {}
  return (
    <>
      <LoginModal show={!loggedIn.login} />
      <div className={styles.MainDiv}>
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
                    key={key}
                    buttonText="Edit Game"
                    buttonVariant="warning"
                    buttonFunction={handleEdit}
                    MyGame={true}
                    handlePlayerDetails={handlePlayerDetails}
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
  );
}

export default MyGames;
