import "./GameHeader.css";
import Display from "../utils/DisplayFunctions.js";

const GameOutcome = ({ win, Themes, theme, code, gameOver }) => {
  return (
    <div>
      {win ? <h1>YOU WON!</h1> : ""}
      {!win && gameOver ? (
        <h1>
          You ran out of turns! The code was:{" "}
          {Display.displayCode(Themes, theme, code)}
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameOutcome;
