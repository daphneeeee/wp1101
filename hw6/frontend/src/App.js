import { useState } from "react";
import "./App.css";
import { startGame, guess, restart } from "./axios";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWin, setHasWin] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleStart = async () => {
    startGame();
    setHasStarted(true);
  };

  const handleGuess = async () => {
    const res = await guess(number);
    if (res.status === 406) {
      setStatus(res.data.msg);
    } else if (res === "Equal") {
      setHasWin(true);
    } else if (res) {
      setStatus(res);
      setNumber("");
    }
  };

  const handleRestart = () => {
    setHasStarted(true);
    setHasWin(false);
    setNumber("");
    setStatus("");
    restart();
  };

  const startMenu = (
    <div>
      <button onClick={handleStart}>start game</button>
    </div>
  );

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input onChange={(e) => setNumber(e.target.value)}></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <p>{status}</p>
    </>
  );

  const winningMode = (
    <>
      <p>You won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
  );

  return (
    <div className="App">
      {hasStarted ? (hasWin ? winningMode : gameMode) : startMenu}
    </div>
  );
}

export default App;
