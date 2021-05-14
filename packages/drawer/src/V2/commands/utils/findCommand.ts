import _ from 'lodash';

import { Command } from '../Command';
import { InvalidCommand } from '../InvalidCommand';
import { IStackFrame } from '../../types';

export const findCommandByLineNumber = (commands: Command[], lineNumber: number): Command | undefined => {
  return commands.find(command => {
    const commandStackFrame = command.getStackFrame();

    if (!commandStackFrame) {
      return false;
    }

    return commandStackFrame.lineNumber === lineNumber;
  });
}

export const findInvalidCommandByStackFrame = (commands: InvalidCommand[], stackFrame: IStackFrame): InvalidCommand | undefined => {
  return commands.find(command => {
    const currentStackFrame = command.received.getStackFrame();

    if (!currentStackFrame) {
      return false;
    }

    return _.isEqual(stackFrame, currentStackFrame);
  })
}
