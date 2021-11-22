import express from "express";
import { genNumber, getServerGuessNum, getNumber } from "../core/getNumber.js";

const router = express.Router();

router.post("/start", (_, res) => {
  genNumber();
  res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
  const number = getNumber();
  const guessed = parseInt(req.query.number, 10);
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(406).send({ msg: "Not a legal number." });
  } else if (guessed > number) {
    res.json({ msg: "Smaller" });
  } else if (guessed < number) {
    res.json({ msg: "Bigger" });
  } else {
    res.json({ msg: "Equal" });
  }
});

router.get("/guess/server", (req, res) => {
  const { userNum, serverNum } = req.query;
  if (serverNum < userNum) {
    const number = getServerGuessNum(serverNum, 100);
    console.log("bigger", serverNum, userNum, number);
    return res.json({ number });
  } else {
    const number = getServerGuessNum(1, serverNum);
    console.log("smaller", serverNum, userNum, number);
    return res.json({ number });
  }
});

router.post("/restart", (_, res) => {
  genNumber();
  res.json({ msg: "The game has restarted." });
});

export default router;
