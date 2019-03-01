import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../components/Button';

function Main() {
  return (
    <div>
      <Button onClick={() => alert('Hello!')}>
        Say Hi!
        <FontAwesomeIcon icon="star" />
      </Button>
    </div>
  );
}

export default Main;
