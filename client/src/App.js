import Home from "./routes/home/home";
import Header from "./commonComponents/header";
import { Routes, Route } from "react-router-dom";
import Error from "./routes/error";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/" element={<App />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
