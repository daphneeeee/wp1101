// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv-defaults";
// import User from "./src/models/ScoreCard.js";

// // const app = express();
// // const port = process.env.PORT || 5000;
// // app.use(cors());
// // app.listen(port, () => {
// //   console.log(`Server is up on port ${port}`);
// // });

// // dotenv.config();

// // const saveUser = async (id, name) => {
// //   const existing = await User.findOne({ name });
// //   if (existing) throw new Error(`data ${name} exists!`);
// //   try {
// //     const newUser = new User({ id, name });
// //     console.log("Create user", newUser);
// //     return newUser.save();
// //   } catch (err) {
// //     throw new Error(`User creation error: ${err}`);
// //   }
// // };

// // const deleteBD = async () => {
// //   try {
// //     await User.deleteMany({});
// //     console.log("Database deleted");
// //   } catch (err) {
// //     throw new Error("Database deletion failed");
// //   }
// // };

// // const db = mongoose.connection;
// // db.on("error", (err) => console.log(err));
// // db.once("open", async () => {
// //   await deleteBD();
// //   await saveUser(57, "Ric");
// //   await saveUser(108, "Sandy");
// //   await saveUser(77, "Peter");
// // });
