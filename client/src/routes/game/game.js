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
} from "firebase/firestore";

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
  function getData() {
    // get reference to today's date to query for games that are not over
    let timestamp = new Date();
    // ref to firestore
    const gamesCollectionRef = query(
      collection(fstore, "userGames"),
      where("startTime", ">", timestamp)
    );

    // livesnapshot
    onSnapshot(gamesCollectionRef, (QuerySnapshot) => {
      // reset gamesData before pushing new data in from the query
      setGamesData([]);
      QuerySnapshot.forEach((doc) => {
        let docData = doc.data();
        console.log(docData, "docData");
        docData.id = doc.id;
        setGamesData((gamesData) => [...gamesData, docData]);
      });
    });
  }
  console.log(gamesData, "gamesData");
  useEffect(() => {
    setLoggedIn({ ...loggedIn, isLoading: true });
    getData();
    setLoggedIn({ ...loggedIn, isLoading: false });
  }, []);

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
  async function handleRegister(e) {
    // append players to register each player into array
    const gameRef = doc(fstore, "userGames", e.target.value);
    await updateDoc(gameRef, { players: arrayUnion(loggedIn.username) });
  }

  // edit game
  function handleEditGame() {
    navigate(`/mygames/${loggedIn.username}`);
  }
  // remove user from game
  async function handleRemoveUser(e) {
    // remove player from player array
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
                  const timing = `${val.startTime
                    .toDate()
                    .toLocaleTimeString()}-${val.endTime
                    .toDate()
                    .toLocaleTimeString()}`;

                  return (
                    <>
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
                <>
                  {gamesData == null ? (
                    <div>No Games Currently!</div>
                  ) : (
                    <div
                      className={`loading-center-spinner ${styles.TailCenterSpinDiv}`}
                    >
                      <TailSpin color="#00BFFF" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
