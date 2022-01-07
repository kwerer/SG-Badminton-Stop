import express from "express";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import userAccount from "../models/userAccount.js";
const router = express.Router();

router.get("/", async function (req, res) {
  console.log("login page");
});

router.post("/", function (req, res, next) {
  console.log("login post");
  passport.authenticate("local", function (err, user, info) {
    console.log("ok");
    if (err) {
      console.log(err);
      res.send({ userAuth: false });
    }
    if (!user) {
      {
        res.send(user);
      }
    } else {
      req.login(user, (err) => {
        if (err) {
          throw err;
        } else {
          res.send(user);
          console.log(req.user);
        }
      });
    }
  })(req, res, next);
});

export default router;
