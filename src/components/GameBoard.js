import "./GameBoard.css";

const GameBoard = ({ gameBoard }) => {
  const numTurns = gameBoard.length;
  const codeLength = gameBoard[0].length;

  let board = [];
  for (let i = 0; i < numTurns; i++) {
    let row = [];
    for (let j = 0; j < codeLength; j++) {
      row.push(
        <div key={i * numTurns + j} className="circle">
          <span className="emoji">{gameBoard[i][j]}</span>
        </div>
      );
    }
    board.push(
      <div key={1000 + i} className="row">
        {row}
      </div>
    );
  }
  return <div>{board}</div>;
};

export default GameBoard;
