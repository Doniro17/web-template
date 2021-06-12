import React from 'react';

export default function Input({ children, type, className, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      data-testid="test-button"
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={className}
    >
      {children}
    </button>
  );
}
