import React, { useRef } from 'react';
import ScreenSwitcher from './components/ScreenSwitcher';
import { First, Second } from './screens';

import './App.css';

function App() {
  const switcher = useRef(null);

  const screen1 = <First switcher={switcher} />

  const screen2 = <Second switcher={switcher} />

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
