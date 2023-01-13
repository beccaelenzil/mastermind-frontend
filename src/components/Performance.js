import { useState } from "react";
import "./Instructions.css";
import "./Performance.css";

const Performance = ({ performance, gameOver, playNum, seqNum }) => {
  const [display, setDisplay] = useState(false);

  const performanceButton = () => {
    if (!display) {
      return (
        <button className="toggle-button" onClick={() => setDisplay(true)}>
          Show Performance
        </button>
      );
    } else {
      return (
        <button className="toggle-button" onClick={() => setDisplay(false)}>
          Hide Performance
        </button>
      );
    }
  };

  return (
    <div id="performance">
      {gameOver || (seqNum == 0 && playNum == 0) ? performanceButton() : ""}
      {display ? (
        <div className="stats">
          <h1 className="stat">Games won: {performance["Games won"]}</h1>
          <h1 className="stat">Total Games: {performance["Total games"]}</h1>
          <h1 className="stat">Win Percentage: {performance["Win %"]}%</h1>
          <h1 className="stat">Win Streak: {performance["Win Streak"]}</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Performance;
