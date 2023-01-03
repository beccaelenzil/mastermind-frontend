import './Buttons.css';

const Buttons = ({theme}) => {
    const emojis = []
    for (const num in theme) {
        emojis.push(<button key={num} className="emoji-button">{theme[num]}</button>)
    }

    return <div>{emojis}</div>

}

export default Buttons