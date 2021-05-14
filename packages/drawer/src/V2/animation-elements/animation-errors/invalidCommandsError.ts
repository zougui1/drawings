import _ from 'lodash';
import chalk from 'chalk';

import { formatInvalidCode } from './formatters';
import { getStackFrames, getIndent } from './utils';
import { Command, getPlaceholderByCommandType, InvalidCommand } from '../../commands';
import { Path } from '../../drawing-elements';
import { createError } from '../../error';
import { withLocation } from '../../utils';
import { IStackFrame } from '../../types';

const invalidCommandsError = {
  message: (data: IAnimationKeyframeInvalidCommandsError) => `${data.label}, Invalid commands: ${data.commands}`,
  code: 'E_ANIMATION_KEYFRAME_INVALID_COMMAND',
};

export interface IAnimationKeyframeInvalidCommandsError {
  label: string;
  commands: string;
}

export class AnimationKeyframeInvalidCommandsError extends createError(invalidCommandsError) { };

const getReceivedCode = (stackframe: { path: IStackFrame; lastCommand: IStackFrame; }, commands: Command[], invalidCommands: InvalidCommand[]): string => {
  return formatInvalidCode(stackframe, commands, invalidCommands, ({ invalidCommand, invalidLine }) => {
    return chalk.red(`${invalidLine} // expected ${invalidCommand.expected}`);
  });
}

const getExpectedCode = (stackframe: { path: IStackFrame; lastCommand: IStackFrame; }, commands: Command[], invalidCommands: InvalidCommand[]): string => {
  const missingCommandIndent = getIndent(stackframe.lastCommand);

  return formatInvalidCode(stackframe, commands, invalidCommands, ({ invalidCommand }) => {
    const placeholder = getPlaceholderByCommandType(invalidCommand.expected);
    const expectedMessagePart = chalk.greenBright(`${missingCommandIndent}.${placeholder}`);
    const receivedMessagePart = chalk.red(`// Received ${invalidCommand.received.commandType}`);

    return `${expectedMessagePart} ${receivedMessagePart}`;
  });
}

export const getInvalidCommandsDetails = (path: Path, commands: Command[], invalidCommands: InvalidCommand[]): GetInvalidCommandsDetailsResult => {
  const invalidCommandList = invalidCommands.map(command => {
    const commandLocation = command.received.getFileLocation();
    const message = `Received ${command.received.commandType} instead of ${command.expected}`;

    return withLocation(message, commandLocation);
  });

  const stackframe = getStackFrames(path, commands);

  if (!stackframe) {
    return {
      invalidCommandList,
    };
  }

  const receivedCode = getReceivedCode(stackframe, commands, invalidCommands);
  const expectedCode = getExpectedCode(stackframe, commands, invalidCommands);

  return {
    details: `\nReceived:\n${receivedCode}\n\nExpected:\n${expectedCode}`,
    invalidCommandList,
  };
}

export interface GetInvalidCommandsDetailsResult {
  invalidCommandList: string[];
  details?: string;
}
