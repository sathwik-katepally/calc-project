import axios from 'axios';

export type Operation = 'add' | 'sub' | 'mul' | 'div' | 'pow';

export function calculate(operation: Operation, a: number, b: number) {
  switch (operation) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      return a / b;
    case 'pow':
      return Math.pow(a, b);
    default:
      throw new Error('Invalid operation');
  }
}

export const saveCalculation = async (
  operation: string,
  input1: string,
  input2: string,
  result: string,
): Promise<void> => {
  try {
    await axios.post('http://localhost:3001/api/calculations', {
      operation,
      input1,
      input2,
      result,
    });
    console.log('Calculation saved successfully');
  } catch (error) {
    console.error('Error saving calculation:', error);
  }
};
