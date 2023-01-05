import "./App.css";
import Buttons from "./components/Buttons.js";
import ThemeSelect from "./components/ThemeSelect.js";
import LevelSelect from "./components/LevelSelect.js";
import GameBoard from "./components/GameBoard.js";
import Themes from "./Constants.js";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
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

  const [guess, setGuess] = useState("");
  const [theme, setTheme] = useState("hearts");
  const [level, setLevel] = useState("standard");
  const [playNum, setPlayNum] = useState(0);
  const [seqNum, setSeqNum] = useState(0);
  const [numKeys, setNumKeys] = useState(8);
  const [numTurns, setNumTurns] = useState(10);
  const [codeLength, setCodeLength] = useState(4);
  const [gameBoard, setGameBoard] = useState(
    makeGameBoard(codeLength, numTurns)
  );
  const [gameId, setGameId] = useState(0);
  const [levelInfo, setLevelInfo] = useState({});
  const [win, setWin] = useState(false);
  const [code, setCode] = useState("XXXX");

  const URL = "http://127.0.0.1:5000/";

  useEffect(() => {
    axios
      .get(URL + "levels/")
      .then((response) => setLevelInfo(response.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  useEffect(() => {
    axios
      .get(URL + "games/" + gameId)
      .then((response) => {
        setCode(response.data.code);
        console.log(response.data.code);
      })
      .catch((err) => console.log(err.response.data));
  }, [gameId]);

  const scorePlayAPI = () => {
    console.log(gameId);
    axios
      .post(URL + "plays/", { code: guess, level: level, game_id: gameId })
      .then((response) => {
        scorePlay(response.data.correct_nums, response.data.correct_pos);
        if (gameId == 0) {
          setGameId(response.data.game_id);
        }
        if (response.data.win == true) {
          setWin(true);
          setPlayNum(numTurns + 1);
        } else if (response.data.win == false && playNum == numTurns) {
          setPlayNum(numTurns + 1);
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  const scorePlay = (count_num, count_pos) => {
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

  const updateGameBoard = (emoji, seq, i) => {
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
  };

  const updateLevel = (newLevel) => {
    setLevel(newLevel);
    setNumKeys(levelInfo[newLevel]["max"] + 1);
    setCodeLength(levelInfo[newLevel]["num"]);
    setGameBoard(
      makeGameBoard(
        levelInfo[newLevel]["num"],
        levelInfo[newLevel]["max_guesses"]
      )
    );
  };

  const deleteVal = () => {
    if (seqNum > 0) {
      updateGameBoard("⚪", seqNum - 1, "delete");
      setSeqNum(seqNum - 1);
      const newGuess = guess.slice(0, guess.length - 1);
      setGuess(newGuess);
    }
  };

  const enter = () => {
    if (guess.length == codeLength && playNum < numTurns) {
      scorePlayAPI();
      setPlayNum(playNum + 1);
      setSeqNum(0);
      setGuess("");
    }
  };

  const displayCode = () => {
    let emojiCode = "";
    for (let char of code) {
      emojiCode += Themes[theme][char];
    }
    return emojiCode;
  };

  return (
    <div className="App">
      <header className="App-buttons" id="App-heading">
        {seqNum == 0 && playNum == 0 ? (
          <div>
            <h1>Welcome to MASTERMIND</h1>
            <ThemeSelect
              selectedTheme={theme}
              themes={Themes}
              setThemeCallback={setTheme}
            />
            <LevelSelect
              selectedLevel={level}
              levels={Object.keys(levelInfo)}
              setLevelCallback={updateLevel}
            />
          </div>
        ) : (
          <div>
            <h1>Currently Playing MASTERMIND</h1>
            <h2>
              <p>
                Level: <span className="smaller">{level}</span>
              </p>
              {playNum < numTurns ? (
                <p>
                  Play Number: <span className="smaller">{playNum + 1}</span>
                </p>
              ) : (
                ""
              )}
            </h2>
            <button className="new-game-button" onClick={restart}>
              Start New Game
            </button>
          </div>
        )}
        {win ? <h1>YOU WON!</h1> : ""}
        {playNum == numTurns && win == false ? (
          <h1>You ran out of turns! The code was: {displayCode()}</h1>
        ) : (
          ""
        )}
      </header>
      <div className="game-body">
        <GameBoard gameBoard={gameBoard} playNum={playNum} />
      </div>
      <div className="App-buttons">
        <Buttons
          theme={Themes[theme]}
          numKeys={numKeys}
          seq={seqNum}
          updateGameBoardCallback={updateGameBoard}
          enterCallback={enter}
          deleteCallback={deleteVal}
        />
      </div>
      <footer>
        Becca Elenzil - Reach Backend Apprenticeship - Take Home Project -
        January 2023
      </footer>
    </div>
  );
}

export default App;
