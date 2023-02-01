export function calculateAverage(numbers: number[]): number {
  const result = numbers.reduce((prev, current) => prev + current, 0) / numbers.length;

  if (isNaN(result)) {
    return 0;
  }

  return result;
}