import express from "express";
import OrganiserGame from "../models/OrganiserGame.js";
const router = express.Router();

// Get all Organiser Games
router.get("/", async function (req, res) {
  // find({}) here will get you everything
  OrganiserGame.find({}, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      // you will send this to react when you get from axios
      res.json(result);
    }
  });
});
// Create Organiser Games
router.post("/", async function (req, res) {
  const newOrganiserGame = new OrganiserGame({
    numOfPlayers: req.body.numOfPlayers,
    time: req.body.time,
    levelOfPlay: req.body.levelOfPlay,
    formatOfPlay: req.body.formatOfPlay,
    fees: req.body.fees,
    venue: req.body.venue,
    date: req.body.date,
  });

  try {
    const savedGame =
      await newOrganiserGame.save();
    res.status(201).json(savedGame);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
