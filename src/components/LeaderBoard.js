import "./Instructions.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "../Constants.js";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const URL = Constants.url;
  const [display, setDisplay] = useState(false);
  const [users, setUsers] = useState([]);

  //https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
  const sortByKey = (array, key) => {
    return array.sort(function (a, b) {
      var x = b[key];
      var y = a[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  useEffect(() => {
    axios
      .get(URL + "users/")
      .then((response) => {
        setUsers(sortByKey(response.data, "wins"));
      })
      .catch((err) => console.log(err.response.data));
  }, [display]);

  const makeLeaderList = () => {
    const wins = [
      <li id="leaderBoardHeading" className="leaderBoardItem" key={0}>
        <span className="gridItem">Rank</span>
        <span className="gridItem">Username</span>
        <span className="gridItem">Wins</span>
      </li>,
    ];
    let i = 1;
    for (const user of users) {
      if (user.username != "") {
        wins.push(
          <li className="leaderBoardItem" key={user.uid}>
            <span className="gridItem">{i}</span>
            <span className="gridItem">{user.username}</span>
            <span className="gridItem"> {user.wins}</span>
          </li>
        );
        i += 1;
      }
    }
    return wins;
  };

  return (
    <div>
      {!display ? (
        <button className="toggle-button" onClick={() => setDisplay(true)}>
          Show Leader Board
        </button>
      ) : (
        <button className="toggle-button" onClick={() => setDisplay(false)}>
          Hide Leader Board
        </button>
      )}
      {display ? (
        <section className="game-body">
          <ul id="leader-board">{makeLeaderList()}</ul>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default LeaderBoard;
