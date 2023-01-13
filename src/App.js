import "./App.css";
import CodeButtons from "./components/CodeButtons.js";
import ThemeSelect from "./components/ThemeSelect.js";
import Instructions from "./components/Instructions.js";
import GameBoard from "./components/GameBoard.js";
import Themes from "./Themes.js";
import Constants from "./Constants.js";
import { useState, useEffect } from "react";
import axios from "axios";
import GameHeader from "./components/GameHeader";

function App() {
  const URL = Constants.url;

  const makeGameBoard = (codeLength, numTurns) => {
    let board = [];
    for (let i = 0; i < numTurns; i++) {
      let row = [];
      for (let j = 0; j < codeLength; j++) {
        row.push("⚪");
      }
      row.push("_");
      row.push("_");
      board.push(row);
    }
    return board;
  };

  // game parameters
  const [numKeys, setNumKeys] = useState(8);
  const [numTurns, setNumTurns] = useState(10);
  const [codeLength, setCodeLength] = useState(4);
  const [theme, setTheme] = useState("hearts");
  const [level, setLevel] = useState("standard");
  const [levelInfo, setLevelInfo] = useState({});
  // game play
  const [playNum, setPlayNum] = useState(0);
  const [seqNum, setSeqNum] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameBoard, setGameBoard] = useState(
    makeGameBoard(codeLength, numTurns)
  );
  const [gameId, setGameId] = useState(null);
  const [win, setWin] = useState(false);
  const [code, setCode] = useState("XXXX");
  const [gameNum, setGameNum] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  //user
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [performance, setPerformance] = useState({});

  useEffect(() => {
    axios
      .get(URL + "levels/")
      .then((response) => setLevelInfo(response.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  useEffect(() => {
    const localEmail = localStorage.getItem("email");
    console.log(localEmail);
    if (localEmail) {
      setEmail(localEmail);
    }
    axios
      .post(URL + "users/login", { email: email })
      .then((response) => {
        setUserId(response.data.uid);
      })
      .catch((err) => console.log(err));
  }, [email]);

  useEffect(() => {
    axios
      .get(`${URL}users/${userId}`)
      .then((response) => {
        setPerformance(response.data["performance summary"]);
      })
      .catch((err) =>
        console.log("Couldn't set performance summary for user_id: ", userId)
      );
  }, [userId, gameNum]);

  const getCodeScore = () => {
    axios
      .post(URL + "plays/", {
        code: guess,
        level: level,
        game_id: gameId,
        user_id: userId,
      })
      .then((response) => {
        addScoreToBoard(response.data.correct_nums, response.data.correct_pos);
        setPlayNum(playNum + 1);
        setSeqNum(0);
        setGuess("");
        setWin(response.data.win);
        if (response.data.win || playNum == numTurns - 1) {
          setGameOver(true);
          setCode(response.data.answer);
          setPlayNum(numTurns + 1);
        }
        if (!gameId) {
          setGameId(response.data.game_id);
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  const addScoreToBoard = (count_num, count_pos) => {
    const rowLength = gameBoard[0].length;
    const newGameBoard = [];
    for (let i = 0; i < numTurns; i++) {
      let newRow = [];
      for (let j = 0; j < rowLength; j++) {
        if (i == playNum && j == codeLength) {
          newRow.push(count_num);
        } else if (i == playNum && j == codeLength + 1) {
          newRow.push(count_pos);
        } else {
          newRow.push(gameBoard[i][j]);
        }
      }
      newGameBoard.push(newRow);
    }
    setGameBoard(newGameBoard);
  };

  const updateSymbols = (emoji, seq, i) => {
    const rowLength = gameBoard[0].length;
    if (
      guess.length < codeLength ||
      (guess.length == codeLength && i == "delete")
    ) {
      const newGameBoard = [];
      for (let i = 0; i < numTurns; i++) {
        let newRow = [];
        for (let j = 0; j < rowLength; j++) {
          if (i == playNum && j == seq) {
            newRow.push(emoji);
          } else {
            newRow.push(gameBoard[i][j]);
          }
        }
        newGameBoard.push(newRow);
      }
      setGameBoard(newGameBoard);
      setSeqNum(seqNum + 1);
      if (i != "delete") {
        setGuess(guess + String(i));
      }
    }
  };

  const restart = () => {
    setPlayNum(0);
    setSeqNum(0);
    setGuess("");
    setGameBoard(makeGameBoard(codeLength, numTurns));
    setWin(false);
    setGameId(0);
    setCode("XXXX");
    setGameNum(gameNum + 1);
    setGameOver(false);
  };

  const updateLevel = (newLevel) => {
    setLevel(newLevel);
    setNumKeys(levelInfo[newLevel]["max"] + 1);
    setNumTurns(levelInfo[newLevel]["max_guesses"]);
    setCodeLength(levelInfo[newLevel]["num"]);
    setGameBoard(
      makeGameBoard(
        levelInfo[newLevel]["num"],
        levelInfo[newLevel]["max_guesses"]
      )
    );
  };

  const deleteSymbol = () => {
    if (seqNum > 0) {
      updateSymbols("⚪", seqNum - 1, "delete");
      setSeqNum(seqNum - 1);
      const newGuess = guess.slice(0, guess.length - 1);
      setGuess(newGuess);
    }
  };

  return (
    <div className="App">
      <GameHeader
        Themes={Themes}
        theme={theme}
        setTheme={setTheme}
        level={level}
        levelInfo={levelInfo}
        updateLevel={updateLevel}
        playNum={playNum}
        numTurns={numTurns}
        restart={restart}
        email={email}
        setEmail={setEmail}
        seqNum={seqNum}
        guess={guess}
        code={code}
        performance={performance}
        win={win}
        gameOver={gameOver}
      />

      <Instructions />
      <GameBoard gameBoard={gameBoard} playNum={playNum} />

      <div className="App-buttons">
        {!gameOver ? (
          <CodeButtons
            theme={Themes[theme]}
            numKeys={numKeys}
            seq={seqNum}
            updateGameBoardCallback={updateSymbols}
            enterCallback={getCodeScore}
            deleteCallback={deleteSymbol}
            gameOver={gameOver}
          />
        ) : (
          ""
        )}
      </div>

      <footer>Becca Elenzil - January 2023</footer>
    </div>
  );
}

export default App;
