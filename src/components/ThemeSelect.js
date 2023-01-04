import "./ThemeSelect.css";
import "./Buttons.css";

const ThemeSelect = ({ selectedTheme, themes, setThemeCallback }) => {
  const emojis = [];
  let num = 0;

  for (const theme in themes) {
    const className =
      theme == selectedTheme ? "emoji-button selected" : "emoji-button";
    emojis.push(
      <button
        key={num}
        className={className}
        onClick={() => setThemeCallback(theme)}
      >
        {themes[theme][0]}
      </button>
    );
    num += 1;
  }

  return (
    <div className="theme-select">
      <h1 id="label">Select Theme: </h1>
      <nav>{emojis}</nav>
    </div>
  );
};

export default ThemeSelect;
