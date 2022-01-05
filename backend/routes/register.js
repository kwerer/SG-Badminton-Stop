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
    },
    req.body.password,
    function (err, user) {
      if (err) {
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.send("/games/newwqerqwer");
        });
      }
    }
  );
});

export default router;
