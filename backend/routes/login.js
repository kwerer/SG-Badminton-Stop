import express from "express";
const router = express.Router();

router.get("/", async function (req, res) {
  console.log("login page");
});

export default router;
