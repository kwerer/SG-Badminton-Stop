import Game from "./routes/game/Game";
import Header from "./commonComponents/header";
import { Routes, Route } from "react-router-dom";
import Error from "./routes/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import AddGame from "./routes/game/AddGame";
import Login from "./routes/userAccount/Login";
import Register from "./routes/userAccount/Register";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="games" element={<Game />} />
        <Route
          path="games/new"
          element={<AddGame />}
        />
        <Route
          path="register"
          element={<Register />}
        />
        <Route path="Login" element={<Login />} />
        {/* <Route path="/" element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/" element={<App />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
