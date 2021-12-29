import Game from "./routes/game/game";
import Header from "./commonComponents/header";
import { Routes, Route } from "react-router-dom";
import Error from "./routes/error";
import "bootstrap/dist/css/bootstrap.min.css";
import AddGame from "./routes/game/AddGame";

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

        {/* <Route path="/" element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/" element={<App />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
