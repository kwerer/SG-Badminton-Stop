import React, { useState, useEffect } from "react";
import Game from "./routes/game/Game";
import Header from "./commonComponents/Header";
import { Routes, Route } from "react-router-dom";
import Error from "./routes/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import AddGame from "./routes/game/AddGame";
import Login from "./routes/userAccount/Login";
import Register from "./routes/userAccount/Register";
import "./App.css";

import { LoginContext } from "./commonComponents/Context";

function App() {
  const [loggedIn, setLoggedIn] = useState({ login: false, username: "" });
  useEffect(() => {
    if (
      sessionStorage.getItem("login") &&
      sessionStorage.getItem("username")
    ) {
      setLoggedIn({
        login: sessionStorage.getItem("login"),
        username: sessionStorage.getItem("username"),
      });
    }
  }, []);
  console.log(loggedIn, "loggedin");
  console.log(sessionStorage);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Header />
      <Routes>
        <Route path="games/new" element={<AddGame />} />
        <Route path="games" element={<Game />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="/" element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/" element={<App />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
