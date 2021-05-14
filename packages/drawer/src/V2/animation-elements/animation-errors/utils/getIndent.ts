import { IStackFrame } from '../../../types';

export const getIndent = (commandStackFrame: IStackFrame): string => {
  // -2 because the column number is after the '.' AND
  // because the column number starts at 1 and not 0
  return ' '.repeat(commandStackFrame.columnNumber - 2);
}
