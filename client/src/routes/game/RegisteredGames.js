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
import { fstore } from "../../firebase-config.js";

import {
  collection,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
  arrayUnion,
  arrayRemove,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
    // get reference to today's date to query for games that are not over
    let timestamp = new Date();
    // ref to firestore - 2 queries to get only the user's data + games not over
    const gamesCollectionRef = query(
      collection(fstore, "userGames"),
      where("players", "array-contains", loggedIn.username)
    );

    const gamesCollectionRef2 = query(
      gamesCollectionRef,
      where("startTime", ">=", timestamp)
    );

    // livesnapshot
    onSnapshot(gamesCollectionRef2, (QuerySnapshot) => {
      // reset gamesData before pushing new data in from the query
      setGamesData([]);
      QuerySnapshot.forEach((doc) => {
        let docData = doc.data();
        docData.id = doc.id;
        setGamesData((gamesData) => [...gamesData, docData]);
      });
    });
  }
  useEffect(() => {
    setLoggedIn({ ...loggedIn, isLoading: true });
    getData();
    setLoggedIn({ ...loggedIn, isLoading: false });
  }, []);

  // allow individual user to remove themselves
  async function handleRemoveUser(e) {
    // remove player from player array
    console.log(e.target.value, "target value from registered games");
    const gameRef = doc(fstore, "userGames", e.target.value);
    await updateDoc(gameRef, { players: arrayRemove(loggedIn.username) });
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
                  console.log(val, "val");
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
                        id={val.id}
                        imageUrl={val.imageUrl}
                        name={val.orgName}
                        NumPlayers={val.numOfPlayers}
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
