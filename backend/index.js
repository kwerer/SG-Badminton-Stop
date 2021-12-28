import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import routes
import games from "./routes/games.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() =>
    console.log("DB Connection Successfull")
  )
  .catch((err) => {
    console.error(err);
  });
// middlewares
// called for everything to allow external api to reach our server
app.use(cors());
// needed for access to req.body to get json data (makes data in to json object)
app.use(express.json());

// all different routes linked to different webpages
app.use("/games", games);

app.listen(3001, () => {
  console.log("server started on port 3001");
});
