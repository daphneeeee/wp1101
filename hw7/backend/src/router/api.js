import router from "./index.js";
import Score from "../models/ScoreCard.js";
import { saveScore, queryScore, deleteDB } from "../persistence/db.js";

router.post("/api/create-card", async (req, res) => {
  const { name, subject, score } = req.body;
  const { message, card } = await saveScore(name, subject, score);
  res.json({ message, card });
});

router.get("/api/query-cards", async (req, res) => {
  const { type, queryString } = req.query;
  const { messages, message } = await queryScore(type, queryString);
  res.json({ messages, message });
});

router.delete("/api/clear-db", async (_, res) => {
  const { deletedCount } = await deleteDB();
  if (deletedCount !== 0) {
    res.json({ message: "Database cleared" });
  }
});

export default router;
