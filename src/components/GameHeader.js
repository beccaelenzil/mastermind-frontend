import WelcomePlaying from "./WelcomePlaying.js";
import UserHeading from "./UserHeading.js";
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
  code,
  performance,
  win,
  gameOver,
}) => {
  return (
    <header className="App-buttons" id="App-heading">
      <WelcomePlaying
        Themes={Themes}
        theme={theme}
        setTheme={setTheme}
        level={level}
        levelInfo={levelInfo}
        updateLevel={updateLevel}
        playNum={playNum}
        numTurns={numTurns}
        restart={restart}
        seqNum={seqNum}
      />
      <UserHeading
        playNum={playNum}
        email={email}
        setEmail={setEmail}
        seqNum={seqNum}
        performance={performance}
      />

      {win ? <h1>YOU WON!</h1> : ""}
      {!win && gameOver ? (
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
