import "./ThemeSelect.css";
import "./Buttons.css";

const LevelSelect = ({ levels, selectedLevel, setLevelCallback }) => {
  let num = 0;
  const levelButtons = [];
  for (const level of levels) {
    const className =
      level == selectedLevel ? "emoji-button selected nav" : "emoji-button nav";
    levelButtons.push(
      <button
        key={num}
        className={className}
        onClick={() => setLevelCallback(level)}
      >
        {level}
      </button>
    );
    num += 1;
  }

  return (
    <div className="theme-select">
      <h1 id="label">Select Level: </h1>
      <nav>{levelButtons}</nav>
    </div>
  );
};

export default LevelSelect;
