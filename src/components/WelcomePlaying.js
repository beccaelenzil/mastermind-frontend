import LevelSelect from "./LevelSelect.js";
import ThemeSelect from "./ThemeSelect.js";
import "./GameHeader.css";

const WelcomePlaying = ({
  Themes,
  theme,
  setTheme,
  level,
  levelInfo,
  updateLevel,
  playNum,
  numTurns,
  restart,
  seqNum,
}) => {
  return (
    <div>
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
                Guesses Remaining:{" "}
                <span className="smaller">{numTurns - playNum}</span>
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
    </div>
  );
};

export default WelcomePlaying;
