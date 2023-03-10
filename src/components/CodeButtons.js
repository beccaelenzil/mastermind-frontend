import "./Buttons.css";

const CodeButtons = ({
  theme,
  numKeys,
  seq,
  updateGameBoardCallback,
  enterCallback,
  deleteCallback,
}) => {
  const emojis = [];
  for (let i = 0; i < numKeys; i++) {
    emojis.push(
      <button
        key={i}
        className="emoji-button"
        onClick={() => updateGameBoardCallback(theme[i], seq, i)}
      >
        {theme[i]}
      </button>
    );
  }
  const enterDeleteButtons = [];
  enterDeleteButtons.push(
    <button className="enter-button" onClick={enterCallback} key={1000}>
      ENTER
    </button>
  );

  enterDeleteButtons.push(
    <button className="enter-button" onClick={deleteCallback} key={2000}>
      DELETE
    </button>
  );

  return (
    <div>
      <div>{emojis}</div>
      <div>{enterDeleteButtons}</div>
    </div>
  );
};

export default CodeButtons;
