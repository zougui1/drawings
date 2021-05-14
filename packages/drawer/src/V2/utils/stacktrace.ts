import stackTrace from 'stack-trace';

import { IStackFrame } from '../types';
import { PROJECT_DIR } from '../constants';

export const getDrawingStackFrame = (): IStackFrame | undefined => {
  const [stackFrame] = stackTrace.parse(new Error()).filter(frame => {
    return !frame.getFileName().startsWith(PROJECT_DIR);
  });

  if (stackFrame) {
    return {
      lineNumber: stackFrame.getLineNumber(),
      columnNumber: stackFrame.getColumnNumber(),
      fileName: stackFrame.getFileName(),
      functionName: stackFrame.getFunctionName(),
    };
  }
}
