import dotenv from "dotenv-defaults";
import mongoose from "mongoose";

export default function Mongo() {
  dotenv.config();

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", () => { console.log("Mongo db error: " + error) });
  db.once("open", () => { console.log("Mongo db connected!") });
};