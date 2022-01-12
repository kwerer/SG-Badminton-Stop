import express from "express";
import organiserGame from "../models/organiserGame.js";
import userAccount from "../models/userAccount.js";
const router = express.Router();

// Get req for games from the user

function getGamesData(req, res, next) {
  console.log("my games get req");

  organiserGame.find(
    { orgName: req.params.username },
    function (err, results) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(results);
      }
    }
  );
  // next();
}

function getUserDetails(req, res, next) {
  console.log("userDetails");
  const username = req.query.username;
  userAccount.find({ username: username }, function (err, results) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
  // next();
}
router.get("/:username", function (req, res) {
  if (req.query.username) {
    // if there is a query, get username
    getUserDetails(req, res);
  } else {
    // else on render initially get the user games
    getGamesData(req, res);
  }
});

// Post req to get user's username

// Edit games for user

export default router;
