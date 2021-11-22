import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });

const startGame = async () => {
  try {
    const {
      data: { msg },
    } = await instance.post("/start");
    return msg;
  } catch (e) {
    return e.response;
  }
};

const guess = async (number) => {
  try {
    const {
      data: { msg },
    } = await instance.get("/guess", { params: { number } });
    return msg;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const serverGuess = async (userNum, serverNum) => {
  try {
    const {
      data: { number },
    } = await instance.get("/guess/server", {
      params: { userNum, serverNum },
    });
    return number;
  } catch (e) {
    return e.response;
  }
};

const restart = async () => {
  try {
    const {
      data: { msg },
    } = await instance.post("/restart");
    return msg;
  } catch (e) {
    return e.response;
  }
};

export { startGame, guess, serverGuess, restart };
