import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// packages for login and register
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

// import routes
import games from "./routes/games.js";
import login from "./routes/login.js";
import register from "./routes/register.js";
// import userAccount Schema
import userAccount from "./models/userAccount.js";

dotenv.config();

// create session configuration
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
// initialise the passport package
app.use(passport.initialize());
// use passport to deal with the sessions
app.use(passport.session());

// might need to shift this down if there are errors
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

// done at the userAccount.js model file
// userAccount.plugin(passportLocalMongoose);

passport.use(userAccount.createStrategy());
passport.serializeUser(
  userAccount.serializeUser()
);
passport.deserializeUser(
  userAccount.deserializeUser()
);
// middlewares
// called for everything to allow external api to reach our server
app.use(cors());
// needed for access to req.body to get json data (makes data in to json object)
app.use(express.json());

// all different routes linked to different webpages

app.use("/games", games);
app.use("/login", login);
app.use("/register", register);

app.listen(3001, () => {
  console.log("server started on port 3001");
});
