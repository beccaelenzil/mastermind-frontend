import { useState } from "react";
import "./Instructions.css";
import "./Performance.css";

const Performance = ({ performance }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div>
      {!display ? (
        <button className="toggle-button" onClick={() => setDisplay(true)}>
          Show Performance
        </button>
      ) : (
        <button className="toggle-button" onClick={() => setDisplay(false)}>
          Hide Performance
        </button>
      )}
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
