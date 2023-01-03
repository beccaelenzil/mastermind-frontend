import './ThemeSelect.css';
import './Buttons.css';

const LevelSelect = ({levels, selectedLevel, setLevelCallback}) => {
    let num = 0
    const levelButtons = []
    for (const level of levels) {
        const className = level == selectedLevel ? "emoji-button selected" : 
        "emoji-button"
        levelButtons.push(<button 
            key={num} 
            className={className}
            onClick={()=>setLevelCallback(level)}
            >{level}</button>)
        num += 1
    }

    return <div className="theme-select"><span>Select Level: </span><nav>{levelButtons}</nav></div>

}

export default LevelSelect;