import React from 'react'; // eslint-disable-line no-unused-vars

import { initFontAwesomeLibrary } from './src/utils';

import '@testing-library/jest-dom/extend-expect';

initFontAwesomeLibrary();

// re-export everything
export * from '@testing-library/react';
