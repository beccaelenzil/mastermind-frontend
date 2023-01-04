import "./App.css";
import Buttons from "./components/Buttons.js";
import ThemeSelect from "./components/ThemeSelect.js";
import LevelSelect from "./components/LevelSelect.js";
import GameBoard from "./components/GameBoard.js";
import Themes from "./Constants.js";
import { useState, useEffect } from "react";
import { isCompositeComponent } from "react-dom/test-utils";

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
    console.log("scorePlay");
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
  };

  const updateLevel = (newLevel) => {
    setLevel(newLevel);
    if (newLevel == "easy") {
      setNumKeys(4);
      setCodeLength(4);
      setGameBoard(makeGameBoard(4, numTurns));
    } else if (newLevel == "standard") {
      setNumKeys(8);
      setCodeLength(4);
      setGameBoard(makeGameBoard(4, numTurns));
    } else if (newLevel == "hard") {
      setNumKeys(10);
      setCodeLength(6);
      setGameBoard(makeGameBoard(6, numTurns));
    }
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
    if (guess.length == codeLength) {
      setPlayNum(playNum + 1);
      setSeqNum(0);
      setGuess("");
      scorePlay("1", "2");
    }
  };

  return (
    <div className="App">
      <header className="App-buttons">
        {seqNum == 0 && playNum == 0 ? (
          <div>
            <ThemeSelect
              selectedTheme={theme}
              themes={Themes}
              setThemeCallback={setTheme}
            />
            <LevelSelect
              selectedLevel={level}
              levels={["easy", "standard", "hard"]}
              setLevelCallback={updateLevel}
            />
          </div>
        ) : (
          <div>
            <h1>Currently Playing Mastermind</h1>
            <h2>
              Level: <span className="smaller">{level}</span>, Theme:{" "}
              <span className="smaller">{Themes[theme][0]}s</span>, Play Number:{" "}
              <span className="smaller">{playNum + 1}</span>
            </h2>
            <button className="new-game-button" onClick={restart}>
              Start New Game
            </button>
          </div>
        )}
      </header>
      <div className="game-body">
        <GameBoard gameBoard={gameBoard} />
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
