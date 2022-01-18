import React, { useState, useEffect } from "react";
import Game from "./routes/game/Game";
import Header from "./commonComponents/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Error from "./routes/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import AddGame from "./routes/game/AddGame";
import Login from "./routes/userAccount/Login";
import Register from "./routes/userAccount/Register";
import "./App.css";
import About from "./routes/About";
import { LoginContext } from "./commonComponents/Context";
import UserGames from "./routes/game/MyGames";
import RegisteredGames from "./routes/game/RegisteredGames";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [loggedIn, setLoggedIn] = useState({
    login: false,
    username: "",
    isLoading: false,
    email: "",
  });
  console.log(loggedIn, "usercontext");

  useEffect(() => {
    if (sessionStorage.getItem("login")) {
      setLoggedIn({
        ...loggedIn,
        login: sessionStorage.getItem("login"),
        username: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email"),
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
