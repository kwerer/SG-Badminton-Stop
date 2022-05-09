import React, { useEffect, useState, useContext } from "react";
// import context object
import { LoginContext } from "../../commonComponents/Context";
import { Outlet, useParams, Link } from "react-router-dom";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";
import AxiosInstance from "../../commonComponents/AxiosInstance";
import LoginModal from "../../commonComponents/LoginModal";
import UserDetailsModal from "../../commonComponents/UserDetailsModal";
import { TailSpin } from "react-loader-spinner";
import { fstore } from "../../firebase-config.js";
import { Button } from "react-bootstrap";
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
    // get reference to today's date to query for games that are not over
    let timestamp = new Date();
    // ref to firestore - 2 queries to get only the user's data + games not over
    const gamesCollectionRef = query(
      collection(fstore, "userGames"),
      where("orgName", "==", loggedIn.username)
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

  // get player details function
  async function handlePlayerDetails(e) {
    let playername = e.target.value;
    console.log(playername, "playername");

    // ref to firestore
    const userDocRef = query(
      collection(fstore, "userAccounts"),
      where("name", "==", playername)
    );
    // livesnapshot
    onSnapshot(userDocRef, (QuerySnapshot) => {
      // reset gamesData before pushing new data in from the query
      setUserDetails([]);
      QuerySnapshot.forEach((doc) => {
        setUserDetails(doc.data());
        setIndivPlayerModal(true);
      });
    });
  }
  console.log(userDetails, "userdetails");

  // function to delete game from MyGames
  async function handleDeleteGame(e) {
    const gameId = e.target.value;

    const docRef = doc(fstore, "userGames", gameId);
    await deleteDoc(docRef);
  }

  // function to delete player from mygame
  async function handleRemovePlayer(e) {
    const values = e.target.value;
    let values1 = values.split(",");
    const gameId = values1[0];
    const playerName = values1[1];
    console.log(values, "hsdhfshd");

    const docRef = doc(fstore, "userGames", gameId);
    console.log(gameId, "gameid");
    await updateDoc(docRef, { players: arrayRemove(playerName) });
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
          <UserDetailsModal
            show={indivPlayerModal}
            handleClose={() => {
              setIndivPlayerModal(false);
            }}
            username={userDetails.name}
            telegramHandle={userDetails.telegramHandle}
            email={userDetails.email}
            phoneNumber={userDetails.phoneNumber}
          />
          <div className={styles.MainDiv}>
            <div className={styles.GamesCard}>
              <Outlet />
              {gamesData.length !== 0 ? (
                gamesData.map((val, key) => {
                  const timing = `${val.startTime
                    .toDate()
                    .toLocaleTimeString()}-${val.endTime
                    .toDate()
                    .toLocaleTimeString()}`;
                  console.log(val.imageUrl, "imageurl");
                  return (
                    <div className={styles.GameCardIndivDiv} key={key}>
                      <GameCard
                        title={val.venue}
                        date={val.startTime.toDate().toDateString()}
                        players={val.players}
                        time={timing}
                        level={val.levelOfPlay}
                        format={val.formatOfPlay}
                        fees={val.fees}
                        id={val.id}
                        name={val.orgName}
                        key={key}
                        imageUrl={val.imageUrl}
                        MyGame={true}
                        handlePlayerDetails={handlePlayerDetails}
                        handleDeleteGame={handleDeleteGame}
                        handleRemovePlayer={handleRemovePlayer}
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  <div className={styles.TailCenterSpinDiv}>
                    Start adding games
                  </div>
                  <div>
                    <Button
                      as={Link}
                      to="/games/new"
                      variant="primary"
                      className={styles.AddGamesButton}
                    >
                      Add Games!
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyGames;
