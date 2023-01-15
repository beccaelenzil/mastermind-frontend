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
        console.log(response.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [display]);

  const makeLeaderList = () => {
    const wins = [<h1>Username - Wins</h1>];
    for (const user of users) {
      if (user.username != "") {
        wins.push(
          <li className="leaderBoardItem" key={user.uid}>
            <span className="name">{user.username} </span> -
            <span className="win"> {user.wins}</span>
          </li>
        );
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
          <div>
            <ol id="leader-board">{makeLeaderList()}</ol>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default LeaderBoard;
