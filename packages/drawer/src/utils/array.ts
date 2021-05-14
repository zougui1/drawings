export const last = <T>(arr: T[]): T | undefined => {
  return arr[arr.length - 1];
}

export const trimToNaN = (numbers: number[]): number[] => {
  const nanIndex = numbers.findIndex(num => isNaN(num));

  if (nanIndex === -1) {
    return numbers;
  }

  return numbers.slice(0, nanIndex);
}
