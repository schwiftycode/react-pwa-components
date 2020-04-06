import React, { useRef } from 'react';
import ScreenSwitcher from './components/ScreenSwitcher';
import { First, Second, Overlay } from './screens';

import './App.css';

function App() {
  const switcher = useRef(null);

  return (
    <div className="App" id="App">
      <ScreenSwitcher ref={switcher} screens={{
        "First": <First switcher={switcher} />,
        "Second": <Second switcher={switcher} />,
        "Overlay": <Overlay switcher={switcher} />,
      }} initialScreen="First" />
    </div>
  );
}

export default App;
