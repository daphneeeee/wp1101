import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ScoreSchema = new Schema({
  name: String,
  subject: String,
  score: Number,
});

const Score = mongoose.model("Score", ScoreSchema);

export default Score;
