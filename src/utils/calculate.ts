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
