import * as React from 'react';
import Dropdown from './components/Dropdown';
import {calculate, Operation} from './utils/calculate';
import Input from './components/Input';

const App: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = React.useState('');
  const [num1, setNum1] = React.useState('');
  const [num2, setNum2] = React.useState('');
  const [result, setResult] = React.useState<number | null>(null);

  const handleCalculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b) || !selectedFunction) {
      setResult(null);
      return;
    }
    const result = calculate(selectedFunction as Operation, a, b);
    setResult(result);
  };

  return (
    <div>
      <h1> Calculator App </h1>
      <Dropdown value={selectedFunction} onChange={setSelectedFunction} />
      <Input value={num1} onChange={setNum1} placeholder="Enter first number" />
      <Input
        value={num2}
        onChange={setNum2}
        placeholder="Enter second number"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default App;
