import React, {useRef} from 'react';
import ScreenSwitcher, { Animations, Easings } from './components/ScreenSwitcher';

import './App.css';

function App() {
  const switcher = useRef(null);
  const screen1 = <div style={{background: 'green', height: '100%'}}>
    <h1 style={{color: 'white'}}>Screen 1</h1>
    <input type='button' style={{border: 'none', background: 'white', color: 'black'}} value="Go to Screen 2" onClick={_ => {
      switcher.current.navigate('Screen2', Animations.SlideFromRight, 200, Easings.easeInOutQuart);
    }} />
  </div>
  const screen2 = <div style={{background: 'blue', height: '100%'}}>
    <h1 style={{color: 'white'}}>Screen 2</h1>
    <input type='button' style={{border: 'none', background: 'white', color: 'black'}} value="Go to Screen 1" onClick={_ => {
      switcher.current.navigate('Screen1', Animations.SlideFromLeft, 200, Easings.easeInOutQuart);
    }} />
  </div>
  return (
    <div className="App">
      <ScreenSwitcher ref={switcher} screens={{
        "Screen1": screen1,
        "Screen2": screen2,
      }} initialScreen="Screen1" />
    </div>
  );
}

export default App;
