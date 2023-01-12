import LevelSelect from "./LevelSelect.js";
import LoginForm from "./LoginForm.js";
import Display from "../utils/DisplayFunctions.js";
import "./GameHeader.css";

const GameHeader = ({
  Themes,
  theme,
  setTheme,
  level,
  levelInfo,
  updateLevel,
  playNum,
  numTurns,
  restart,
  email,
  setEmail,
  seqNum,
  ThemeSelect,
  win,
  code,
}) => {
  return (
    <header className="App-buttons" id="App-heading">
      {seqNum == 0 && playNum == 0 ? (
        <div>
          <h1>Welcome to MASTERMIND</h1>
          <h2 className="subtitle">
            Choose a theme, a level, and start guessing!
          </h2>
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
      {email != "" && playNum == 0 && seqNum == 0 ? (
        <div>
          <h1>Logged in as {email}</h1>
          <button onClick={() => setEmail("")}>Logout</button>
        </div>
      ) : (
        ""
      )}
      {email == "" && playNum == 0 && seqNum == 0 ? (
        <LoginForm setEmailCallback={setEmail} />
      ) : (
        ""
      )}
      {win ? <h1>YOU WON!</h1> : ""}
      {playNum == numTurns && win == false ? (
        <h1>
          You ran out of turns! The code was:{" "}
          {Display.displayCode(Themes, theme, code)}
        </h1>
      ) : (
        ""
      )}
    </header>
  );
};

export default GameHeader;
