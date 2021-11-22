import Router from "../router/index.js";
import Score from "../models/ScoreCard.js";

const saveScore = async (name, subject, score) => {
  const existing = await Score.findOne({ name, subject });
  if (existing) {
    try {
      await Score.updateOne({ name, subject }, { name, subject, score });
      return {
        message: `Updating (${name}, ${subject}, ${score})`,
        card: existing,
      };
    } catch (e) {
      throw new Error(`Score updating error: ${e}`);
    }
  } else {
    try {
      const newScore = await new Score({ name, subject, score });
      await newScore.save();
      return {
        message: `Adding (${name}, ${subject}, ${score})`,
        card: newScore,
      };
    } catch (e) {
      throw new Error(`Score creation error: ${e}`);
    }
  }
};

const queryScore = async (type, queryString) => {
  if (type === "name") {
    const res = await Score.find({ name: queryString });

    if (res.length !== 0) {
      return {
        messages: res.map((r) => `Query (${r.name}, ${r.subject}, ${r.score})`),
      };
    } else {
      return { message: `Name (${queryString}) not found` };
    }
  } else if (type === "subject") {
    const res = await Score.find({ subject: queryString });
    if (res.length !== 0) {
      return {
        messages: res.map(
          (r) =>
            `Query (Name: ${r.name}, Subject: ${r.subject}, Score: ${r.score})`
        ),
      };
    }
    return { message: `Subject (${queryString}) not found` };
  }
};

const deleteDB = async () => {
  try {
    const res = await Score.deleteMany({});
    return res;
  } catch (e) {
    throw new Error("Database deletion failed" + e);
  }
};

export { saveScore, queryScore, deleteDB };
