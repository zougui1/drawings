const reSpecialNthNumbers = /[1-3]$/;
const reExceptionSpecialNthNumbers = /1[1-3]$/;

export const safeNumber = (number: any): number | undefined => {
  return isNaN(Number(number)) ? undefined : number
}

export const getNth = (number: number): string => {
  const numStr = number.toString();

  if ([1, 2, 3].includes(number) || (reSpecialNthNumbers.test(numStr) && reExceptionSpecialNthNumbers.test(numStr))) {
    switch (numStr[numStr.length - 1]) {
      case '1':
        return `${number}st`;
      case '2':
        return `${number}nd`;
      case '3':
        return `${number}rd`;
    }
  }

  return `${number}th`;
}

export const getNumberLength = (num: number): number => {
  return num.toString().length;
}
