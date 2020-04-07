import React, { useState, useRef } from 'react';
import ScreenSwitcher from './components/ScreenSwitcher';
import { First, Second, Overlay } from './screens';

import './App.css';
import { useEffect } from 'react';

function App() {
  const switcher = useRef(null);
  const switcherAlt = useRef(null);
  const [toggle, setToggle] = useState(false)

  useEffect(_ => {
    if (!toggle) {
      setTimeout(_ => {
        setToggle(true)
      }, 5000)
    }
  }, [])

  return (
    <div className="App" id="App">
      {toggle ?
        <ScreenSwitcher ref={switcherAlt} screens={{
          "Second": <Second switcher={switcherAlt} />,
        }} initialScreen="Second" />
        :
        <ScreenSwitcher ref={switcher} screens={{
          "First": <First switcher={switcher} />,
          "Second": <Second switcher={switcher} />,
          "Overlay": <Overlay switcher={switcher} />,
        }} initialScreen="First" />
      }
    </div>
  );
}

export default App;
