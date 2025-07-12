import React from 'react';

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const Dropdown: React.FC<DropdownProps> = ({value, onChange, className}) => {
  return (
    <div>
      <select
        className={className}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select a function
        </option>
        <option value="add">Addition</option>
        <option value="sub">Subtraction</option>
        <option value="mul">Multiplication</option>
        <option value="div">Division</option>
        <option value="pow">Power</option>
      </select>
    </div>
  );
};
export default Dropdown;
