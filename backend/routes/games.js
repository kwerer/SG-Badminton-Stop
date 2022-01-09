import express from "express";
import organiserGame from "../models/organiserGame.js";

const router = express.Router();

// Get all Organiser Games
router.get("/", async function (req, res) {
  console.log("gamessdf");
  // find({}) here will get you everything
  organiserGame.find({}, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      // you will send this to react when you get from axios
      res.json(result);
    }
  });
});
// Receive registers from users
router.post("/", async function (req, res) {
  console.log("games post request");
  console.log(req.body.gameID, "req.body");
  console.log(req.body.username, "req.body");
  // const idd = ObjectId(req.body.gameID);
  const user = req.body.username;

  organiserGame.updateOne(
    { _id: { $oid: req.body.gameID } },
    { $push: { players: user } }
  );
});
// Create Organiser Games
router.post("/new", async function (req, res) {
  // post games to organiser collections
  const newOrganiserGame = new organiserGame({
    numOfPlayers: req.body.numOfPlayers,
    time: req.body.time,
    levelOfPlay: req.body.levelOfPlay,
    formatOfPlay: req.body.formatOfPlay,
    fees: req.body.fees,
    venue: req.body.venue,
    date: req.body.date,
    orgName: req.body.orgName,
    players: req.body.players,
  });

  try {
    const savedGame = await newOrganiserGame.save();
    res.status(201).json(savedGame);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
