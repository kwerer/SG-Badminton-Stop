import express from "express";
import organsiergame from "../models/organiserGame.js";
const router = express.Router();

// get games that user is in
router.get("/:username", function (req, res) {
  console.log(req, "request route");
  organsiergame.find(
    { players: req.params.username },
    function (err, results) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(results);
      }
    }
  );
});

export default router;
