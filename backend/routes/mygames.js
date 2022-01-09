import express from "express";
import organiserGame from "../models/organiserGame.js";
const router = express.Router();

// Get req for games from the user
router.get("/:username", function (req, res) {
  console.log("my games get req");

  organiserGame.find(
    { orgName: req.params.username },
    function (err, results) {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
});

// Post req to get user's username

// Edit games for user

export default router;
