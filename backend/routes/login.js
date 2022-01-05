import express from "express";
import passport from "passport";
import userAccount from "../models/userAccount.js";
const router = express.Router();

router.get("/", async function (req, res) {
  console.log("login page");
});

router.post("/", async function (req, res) {
  const user = new userAccount({
    username: req.body.username,
    password: req.body.password,
  });
  passport.authenticate("local"),
    function (req, res) {
      console.log("this is ok");
    };
});

export default router;
