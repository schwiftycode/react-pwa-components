import React, { useRef } from 'react';
import ScreenSwitcher from './components/ScreenSwitcher';
import Animations from './components/Scripts/Animations';
import Easings from './components/Scripts/Easings';
import Notifications from './components/Notification/Notifications';

import './App.css';

function App() {
  const pageStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  const pageHeaderStyle = {
    color: 'white',
    marginTop: 24,
  }
  const buttonStyle = {
    padding: 12,
    border: 'none',
    background: 'white',
    color: 'black',
    borderRadius: 500,
    marginTop: 12,
    cursor: 'pointer',
  }
  const switcher = useRef(null);
  const screen1 = <div style={{
    ...pageStyle,
    background: 'green',
  }}>
    <h1 style={pageHeaderStyle}>Screen 1</h1>
    <input type='button' style={buttonStyle} value="Go to Screen 2" onClick={_ => {
      switcher.current.navigate('Screen2', Animations.SlideFromRight, 200, Easings.easeInOutQuart);
    }} />
    <input type='button' style={buttonStyle} value="Show Push Notification" onClick={_ => {
      Notifications.show('Hello', 'Some message to the user', { darkMode: true })
    }} />
  </div>
  const screen2 = <div style={{
    ...pageStyle,
    background: 'blue',
  }}>
    <h1 style={pageHeaderStyle}>Screen 2</h1>
    <input type='button' style={buttonStyle} value="Go to Screen 1" onClick={_ => {
      switcher.current.navigate('Screen1', Animations.SlideFromLeft, 200, Easings.easeInOutQuart);
    }} />
  </div>
  return (
    <div className="App" id="App">
      <ScreenSwitcher ref={switcher} screens={{
        "Screen1": screen1,
        "Screen2": screen2,
      }} initialScreen="Screen1" />
    </div>
  );
}

export default App;
