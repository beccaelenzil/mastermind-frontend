const displayCode = (Themes, theme, code) => {
  let emojiCode = "";
  for (let char of code) {
    emojiCode += Themes[theme][char];
  }
  return emojiCode;
};

const Display = {
  displayCode,
};

export default Display;
