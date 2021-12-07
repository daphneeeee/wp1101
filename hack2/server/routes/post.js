import express from "express";
import Post from "../models/post";
import moment from "moment";

const router = express.Router();

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get("/allPosts", async (_, res) => {
  try {
    const post = await Post.find({}).sort({ timestamp: -1 });
    if (post.length === 0) {
      res.status(403).send({ message: "error", data: null });
      return;
    }
    res.status(200).send({ message: "success", data: post });
  } catch (error) {
    res.status(403).send({ message: "error", data: null });
  }
});

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get("/postDetail", async (req, res) => {
  const { pid } = req.query;
  try {
    const post = await Post.findOne({ postId: pid });
    if (post === null) {
      res.status(403).send({ message: "error", post: null });
      return;
    }
    res.status(200).send({ message: "success", post: post });
  } catch (error) {
    res.status(403).send({ message: "error", post: null });
  }
});

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post("/newPost", async (req, res) => {
  const { postId, title, content, timestamp } = req.body;
  try {
    const newPost = await new Post({ postId, title, content, timestamp });
    await newPost.save();
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(403).send({ message: "error", post: null });
  }
});

// TODO 5-(1): create the 4th API (/api/post)
router.delete("/post", async (req, res) => {
  const { pid } = req.query;
  try {
    await Post.deleteOne({ postId: pid });
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(403).send({ message: "error", post: null });
  }
});

export default router;
