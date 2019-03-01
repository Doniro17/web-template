import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { initFontAwesomeLibrary } from './utils';

initFontAwesomeLibrary();

render(
  <div>
    <App />
  </div>,
  document.getElementById('app'),
);
