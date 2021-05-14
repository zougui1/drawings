import { IStackFrame } from '../../../types';

export const getCorrectCodeLines = (pathStackFrame: IStackFrame, commandStackFrame: IStackFrame): string[] => {
  // we use require in the function instead of imports to avoid
  // errors when this package is used in the client, this function is not
  // called in the client
  // TODO do something better to avoid the use of require and always use imports
  const { getCodeBetweenLines } = require('../../../filesystem');
  return getCodeBetweenLines(pathStackFrame.fileName, pathStackFrame.lineNumber - 1, commandStackFrame.lineNumber);
}
