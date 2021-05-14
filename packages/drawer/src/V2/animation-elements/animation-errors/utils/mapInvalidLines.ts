
import { Command, findCommandByLineNumber, findInvalidCommandByStackFrame, InvalidCommand } from '../../../commands';

export const mapInvalidLines = (lines: string[], startLineNumber: number, commands: Command[], invalidCommands: InvalidCommand[], iteratee: ((data: { invalidCommand: InvalidCommand, invalidLine: string }) => string)): string[] => {
  return lines.map((line, i) => {
    const lineNumber = startLineNumber + i;

    const command = findCommandByLineNumber(commands, lineNumber);
    const commandStackFrame = command?.getStackFrame();

    if (!command || !commandStackFrame) {
      return line;
    }

    const lineIndex = commandStackFrame.lineNumber - startLineNumber;
    const invalidCommand = findInvalidCommandByStackFrame(invalidCommands, commandStackFrame);
    const invalidLine = lines[lineIndex];

    if (!invalidCommand) {
      return invalidLine;
    }

    return iteratee({ invalidCommand, invalidLine });
  });
}
