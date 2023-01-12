import "./App.css";
import CodeButtons from "./components/CodeButtons.js";
import ThemeSelect from "./components/ThemeSelect.js";
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

  const [guess, setGuess] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
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

  useEffect(() => {
    axios
      .get(URL + "levels/")
      .then((response) => setLevelInfo(response.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  //TODO: refactor using useRef so it doesn't run on initial render
  useEffect(() => {
    axios
      .get(URL + "games/" + gameId)
      .then((response) => {
        if (response.status == 200) {
          setCode(response.data.code);
        }
      })
      .catch((err) => console.log(err.response.data));
  }, [gameId]);

  useEffect(() => {
    axios
      .post(URL + "users/login", { email: email })
      .then((response) => {
        setUserId(response.data.uid);
      })
      .catch((err) => console.log(err));
  }, [email]);

  const getCodeScore = () => {
    axios
      .post(URL + "plays/", {
        code: guess,
        level: level,
        game_id: gameId,
        user_id: userId,
      })
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

  const enterCode = () => {
    if (guess.length == codeLength && playNum < numTurns) {
      getCodeScore();
      setPlayNum(playNum + 1);
      setSeqNum(0);
      setGuess("");
    }
  };

  return (
    <div className="App">
      <header className="App-buttons" id="App-heading">
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
          ThemeSelect={ThemeSelect}
          win={win}
          code={code}
        />
      </header>
      <div className="game-body">
        <GameBoard gameBoard={gameBoard} playNum={playNum} />
      </div>
      <div className="App-buttons">
        <CodeButtons
          theme={Themes[theme]}
          numKeys={numKeys}
          seq={seqNum}
          updateGameBoardCallback={updateSymbols}
          enterCallback={enterCode}
          deleteCallback={deleteSymbol}
        />
      </div>
      <footer>Becca Elenzil - January 2023</footer>
    </div>
  );
}

export default App;
