import React, { useRef } from 'react';
import ScreenSwitcher from './components/ScreenSwitcher';
import { First, Second } from './screens';

import './App.css';

function App() {
  const switcher = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  return (
    <div className="App" id="App">
      <ScreenSwitcher ref={switcher} screens={{
        "Screen1": <First ref={firstRef} switcher={switcher} />,
        "Screen2": <Second ref={secondRef} switcher={switcher} />,
      }} initialScreen="Screen1" />
    </div>
  );
}

export default App;
