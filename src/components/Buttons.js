import './Buttons.css';

const Buttons = ({theme, numKeys, seq, updateGameBoardCallback, enterCallback, deleteCallback}) => {
    const emojis = []
    for (let i = 0; i < numKeys; i++) {
        emojis.push(<button 
            key={i} 
            className="emoji-button"
            onClick={()=>updateGameBoardCallback(theme[i], seq, i)}>
                {theme[i]}</button>)
    }
    emojis.push(<button 
        className="enter-button"
        onClick={enterCallback}
        key={1000}>ENTER</button>)

    emojis.push(<button 
        className="enter-button"
        onClick={deleteCallback}
        key={2000}>DELETE</button>)

    return(<div>{emojis}</div>)

}

export default Buttons