import express from "express";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import userAccount from "../models/userAccount.js";
const router = express.Router();

router.post("/", async function (req, res) {
  console.log("register post");
  // register method comes from passport-local-mongoose package

  userAccount.register(
    {
      username: req.body.username,
      email: req.body.email,
      hp: req.body.hp,
      telegramHandle: req.body.telegramHandle,
    },
    req.body.password,
    function (err, user) {
      if (err) {
        // function here checks for created unique username
        console.log(err, "error during register");
        console.log("user not created");
        res.send({ userCreated: false });
      } else {
        // auth after register

        passport.authenticate("local")(req, res, function () {
          console.log("user created");
          res.json(user);
        });
      }
    }
  );
});

export default router;
