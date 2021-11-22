import dotenv from "dotenv-defaults";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created."));

const db = mongoose.connection;
db.on("error", (err) => console.log(err));

export default db;
