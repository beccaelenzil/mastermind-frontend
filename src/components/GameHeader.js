import WelcomePlaying from "./WelcomePlaying.js";
import UserHeading from "./UserHeading.js";
import GameOutcome from "./GameOutcome.js";
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
      <GameOutcome
        win={win}
        Themes={Themes}
        theme={theme}
        code={code}
        gameOver={gameOver}
      ></GameOutcome>
    </header>
  );
};

export default GameHeader;
