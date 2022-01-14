import express from "express";
import { ObjectId } from "mongodb";
import organiserGame from "../models/organiserGame.js";

const router = express.Router();

// Get all Organiser Games
router.get("/", async function (req, res) {
  console.log("All Games");
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
  console.log(req.body, "thisreqbody");
  const idd = ObjectId(req.body.gameID);
  const user = req.body.username;

  organiserGame.updateOne(
    { _id: idd },
    { $push: { players: user } },
    function (err, result) {
      console.log("callback");
      if (err) {
        console.log(err, "err");
      } else {
        console.log(result, "result");
      }
    }
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

router.delete("/", function (req, res) {
  console.log("ok");
  console.log(req.body, "body");

  const userId = req.body.userId;
  const gameId = req.body.gameId;
  const idd = ObjectId(gameId);
  console.log(idd, "idd");
  console.log(userId, "userId");

  organiserGame.updateOne(
    { _id: idd },
    { $pull: { players: userId } },
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    }
  );
});

export default router;
