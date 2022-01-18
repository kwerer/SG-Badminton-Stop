import mongoose from "mongoose";

const organiserGame = new mongoose.Schema({
  numOfPlayers: {
    type: String,
  },
  time: { type: String },
  levelOfPlay: { type: String },
  formatOfPlay: { type: String },
  uploadDate: Date,
  startTimeInMs: { type: String },
  fees: { type: String },
  venue: { type: String },
  date: { type: String },
  orgName: { type: String },
  players: { type: Array },
});

const orgGame = mongoose.model("organiserGame", organiserGame);

export default orgGame;
