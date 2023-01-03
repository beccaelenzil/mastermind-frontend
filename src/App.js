
import './App.css';
import Buttons from './components/Buttons.js'
import Themes from './Constants.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Buttons theme={Themes.hearts}/>
      </header>
    </div>
  );
}

export default App;
