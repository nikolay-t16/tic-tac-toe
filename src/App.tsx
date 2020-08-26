import React from 'react';
import './App.scss';
import Game from "./components/game/game";
function App() {
  return (
    <div className="app">
      <div className="app__wraper">
        <div className="app__game">
            <Game/>
        </div>
        <div className="app__start"></div>
      </div>
    </div>
  );
}

export default App;
