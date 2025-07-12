import React from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({value, onChange, placeholder}) => {
  return (
    <input
      type="number"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};
export default Input;
