import * as React from 'react';
import Dropdown from './components/Dropdown';
import {calculate, Operation} from './utils/calculate';
import Input from './components/Input';
import {saveCalculation} from './utils/calculate';

const App: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = React.useState('');
  const [num1, setNum1] = React.useState('');
  const [num2, setNum2] = React.useState('');
  const [result, setResult] = React.useState<number | null>(null);

  const handleCalculate = async () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b) || !selectedFunction) {
      setResult(null);
      return;
    }
    try {
      const result = calculate(selectedFunction as Operation, a, b);
      setResult(result);
      await saveCalculation(
        selectedFunction,
        a.toString(),
        b.toString(),
        result.toString(),
      );
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };

  return (
    <div>
      <h1 className="app-title"> Calculator App </h1>
      <div className="main-content">
        <Dropdown
          className="dropdown-box"
          value={selectedFunction}
          onChange={setSelectedFunction}
        />
        <div className="input-container">
          <Input
            className="input"
            value={num1}
            onChange={setNum1}
            placeholder="Enter first number"
          />
          <Input
            className="input"
            value={num2}
            onChange={setNum2}
            placeholder="Enter second number"
          />
        </div>
        <button onClick={handleCalculate}>Calculate</button>
        {result !== null && <p>Result: {result}</p>}
      </div>
    </div>
  );
};

export default App;
