import './Buttons.css';

const Buttons = ({theme, numKeys, updateGameBoardCallback, enterCallback}) => {
    const emojis = []
    for (let i = 0; i < numKeys; i++) {
        emojis.push(<button 
            key={i} 
            className="emoji-button"
            onClick={()=>updateGameBoardCallback(theme[i])}>
                {theme[i]}</button>)
    }
    emojis.push(<button 
        className="enter-button"
        onClick={enterCallback}
        key={1000}>ENTER</button>)

    return(<div>{emojis}</div>)

}

export default Buttons