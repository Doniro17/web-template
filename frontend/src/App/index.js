import React from 'react';

import Main from '../scenes/Main';
import Header from './Header';
import Scene from './Scene';

function App() {
  return (
    <div style={{ paddingTop: '100px' }}>
      <Header>
        Welcome to
        <span>Your</span>
        final project template!
      </Header>
      <Scene>
        <Main />
      </Scene>
    </div>
  );
}

export default App;
