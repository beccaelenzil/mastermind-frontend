import "./Instructions.css";
import { useState } from "react";
import faces from "../assets/faces.jpeg";
import animals from "../assets/animals.jpeg";
import hearts from "../assets/hearts.jpeg";

const Instructions = () => {
  const [display, setDisplay] = useState(false);

  return (
    <div>
      {!display ? (
        <button className="toggle-button" onClick={() => setDisplay(true)}>
          Show Game Rules
        </button>
      ) : (
        <button className="toggle-button" onClick={() => setDisplay(false)}>
          Hide Game Rules
        </button>
      )}
      {display ? (
        <section id="rules" className="game-body">
          <h1 id="rules-title">Game Rules</h1>
          <p id="rules-text">
            At the start of the game, the computer will randomly select a
            pattern of symbols. The length of the pattern and the number of
            distinct symbols depends on the level you select (easy, standard, or
            hard). You will have 10 attempts to guess the pattern. At the end of
            each guess, the computer will display two numbers. The first number
            is the number of symbols guessed correctly (not necessarily in the
            correct position). The second number is the number of symbols that
            are guessed correctly and in the correct position. Below are a few
            example games.
          </p>
          <div className="example-games">
            <img
              className="example"
              alt="animals easy level - won in 4 turns"
              src={animals}
            />
            <img
              className="example"
              alt="hearts standard level - won in 9 turns"
              src={hearts}
            />
            <img
              className="example"
              alt="faces hard level - loss"
              src={faces}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default Instructions;
