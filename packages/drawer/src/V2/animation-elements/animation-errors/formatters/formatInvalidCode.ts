import { formatCode } from './formatCode';
import { mapInvalidLines, getCorrectCodeLines } from '../utils';
import { Command, InvalidCommand } from '../../../commands';
import { IStackFrame } from '../../../types';

export const formatInvalidCode = (stackframe: { path: IStackFrame; lastCommand: IStackFrame; }, commands: Command[], invalidCommands: InvalidCommand[], iteratee: ((data: { invalidCommand: InvalidCommand, invalidLine: string }) => string)): string => {
  const pathLineNumber = stackframe.path.lineNumber - 1;
  const lines = getCorrectCodeLines(stackframe.path, stackframe.lastCommand);
  // we map on the lines to have ALL the lines in the result
  // including comments
  const formattedLines = mapInvalidLines(lines, pathLineNumber, commands, invalidCommands, iteratee);

  return formatCode(formattedLines, pathLineNumber).join('\n');
}
