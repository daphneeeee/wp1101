import { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Grid } from "@material-ui/core";
import "./App.css";
import { startGame, guess, serverGuess, restart } from "./axios";

function App() {
  const [connect, setConnect] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWin, setHasWin] = useState(false);

  const [status, setStatus] = useState("");
  const [number, setNumber] = useState("");
  const [userNum, setUserNum] = useState("");
  const [serverNum, setServerNum] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!connect) {
      setStatus("500 Internal Server Error");
    } else {
      setConnect(true);
      setStatus("");
    }
  }, [connect]);

  useEffect(() => {
    if (
      (!parseInt(userNum, 10) || userNum < 1 || userNum > 100) &&
      userNum !== ""
    ) {
      setError(true);
      setErrorMsg("Not a legal number");
    } else {
      setError(false);
      setErrorMsg("");
    }
  }, [userNum]);

  const handleStart = async () => {
    startGame();
    setHasStarted(true);
    setError(false);
    setErrorMsg("");
  };

  const handleGuess = async () => {
    const res = await guess(number);
    if (res === undefined) {
      setConnect(false);
    } else if (res.status === 406) {
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

  const handleBGuess = async (number) => {
    await handleGuess(number);
    if (status === "Not a legal number.") return;
    const res = await serverGuess(userNum, serverNum);
    setServerNum(res);
    if (res === Number(userNum)) {
      setUserNum(0);
      setHasWin(true);
    }
  };

  const handleBRestart = () => {
    setHasStarted(false);
    setHasWin(false);
    setNumber("");
    setUserNum("");
    setServerNum("");
    setStatus("");
  };

  const startMenu = (
    <>
      <Typography variant="h1">Let's Guess Number!</Typography>
      <Box sx={{ marginLeft: 640, marginTop: 70, width: "30%" }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="h3">Single </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleStart}>
              Start
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="h3">Battle </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Your Number"
              variant="outlined"
              onChange={(e) => setUserNum(e.target.value)}
              error={error}
              helperText={errorMsg}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              disabled={error || userNum === ""}
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  const gameMode = (
    <>
      <Typography variant="h4">Guess a number between 1 to 100</Typography>
      <Box sx={{ marginLeft: 810, marginTop: 30 }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={4} alignItems="center">
          <Grid item>
            <TextField
              size="medium"
              variant="outlined"
              margin="normal"
              onChange={(e) => setNumber(e.target.value)}
              helperText={status}
            ></TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={handleGuess}
              disabled={!number}
            >
              Guess!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  const battleMode = (
    <>
      <Box
        sx={{
          width: "auto",
          marginLeft: 500,
        }}
      >
        <Grid container spacing={10}>
          <Grid item>
            <Box>
              <Typography variant="h4">
                Guess a number between 1 to 100
              </Typography>
              <Grid
                sx={{ flexGrow: 1 }}
                container
                spacing={4}
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Grid item>
                  <TextField
                    size="medium"
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setNumber(e.target.value)}
                    helperText={status}
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleBGuess}
                    disabled={!number}
                  >
                    Guess!
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="h4">Server guess...</Typography>
            <Typography variant="h4" color="primary">
              {serverNum}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  const winningMode = (
    <>
      <Grid container direction="column" spacing={8}>
        <Typography variant="h4">You won! the number was {number}.</Typography>
        <Grid item>
          <Button
            sx={{ marginTop: 20 }}
            variant="outlined"
            onClick={serverNum !== "" ? handleBRestart : handleRestart}
          >
            Restart
          </Button>
        </Grid>
      </Grid>
    </>
  );

  const losingMode = (
    <>
      <Grid container direction="column" spacing={8}>
        <Typography variant="h4">Oops! Computer won:(</Typography>
        <Grid item>
          <Button
            sx={{ marginTop: 20 }}
            variant="outlined"
            onClick={handleBRestart}
          >
            Restart
          </Button>
        </Grid>
      </Grid>
    </>
  );

  return (
    <div className="App">
      {hasStarted
        ? hasWin
          ? userNum === 0
            ? losingMode
            : winningMode
          : userNum === ""
          ? gameMode
          : battleMode
        : startMenu}
    </div>
  );
}

export default App;
