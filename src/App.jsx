import React, { useRef } from 'react';
import ScreenSwitcher from './components/ScreenSwitcher';
import { First, Second } from './screens';

import './App.css';
import Toast from './components/Toast';

function App() {
  const switcher = useRef(null);

  return (
    <div className="App" id="App">
      <ScreenSwitcher ref={switcher} screens={{
        "First": <First switcher={switcher} />,
        "Second": <Second switcher={switcher} />,
      }} initialScreen="First" />
    </div>
  );
}

export default App;
