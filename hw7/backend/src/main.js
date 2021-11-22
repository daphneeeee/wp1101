import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/api.js";
import db from "./mongo.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
