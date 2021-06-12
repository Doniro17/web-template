import React from 'react';

export default function Input({
  type,
  placeholder,
  className,
  onChange,
  value,
  name,
  id,
  label,
  labelStyle,
}) {
  return (
    <label className={labelStyle} htmlFor={id}>
      {label}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
      />
      {type === 'checkbox' && <span className="checkmark" />}
    </label>
  );
}
