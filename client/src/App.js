import React, { useState, useEffect } from "react";
import Game from "./routes/game/Game.js";
import Header from "./commonComponents/Header.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Error from "./routes/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import AddGame from "./routes/game/AddGame.js";
import Login from "./routes/userAccount/Login.js";
import Register from "./routes/userAccount/Register.js";
import "./App.css";
import About from "./routes/About.js";
import { LoginContext } from "./commonComponents/Context.js";
import UserGames from "./routes/game/MyGames.js";
import RegisteredGames from "./routes/game/RegisteredGames.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState({
    login: auth.currentUser !== null ? true : false,
    username: localStorage.getItem("username"),
    isLoading: false,
    email: auth.currentUser !== null ? auth.currentUser.email : "",
  });
  console.log(loggedIn, "usercontext");
  console.log(localStorage, "localStorage");

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setLoggedIn({
        ...loggedIn,
        login: localStorage.getItem("login"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Header />
      <Routes>
        {<Route exact path="/" element={<Navigate to="/games" />} />}
        <Route path="games/new" element={<AddGame />} />
        <Route path="games" element={<Game />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="mygames/:username/*" element={<UserGames />} />
        <Route
          path="registeredgames/:username/*"
          element={<RegisteredGames />}
        />
        <Route path="about*" element={<About />} />
        {/* <Route path="/" element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/" element={<App />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
