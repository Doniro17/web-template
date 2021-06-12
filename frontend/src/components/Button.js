import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button() {
  // Bulma class here
  return (
    <div className="button">
      <FontAwesomeIcon css={{ color: 'hotpink', marginRight: '10px' }} icon="crow" />
      :&nbsp; React is Awesome!
    </div>
  );
}

export default Button;
