import { formatCode, formatErrorCommand } from './formatters';
import { getStackFrames, getCorrectCodeLines, getIndent } from './utils';
import { Command } from '../../commands';
import { Path } from '../../drawing-elements';
import { createError } from '../../error';

const missingCommandsError = {
  message: (data: IAnimationKeyframeMissingCommandsError) => `${data.label}, is missing ${data.count} commands: ${data.commands}`,
  code: 'E_ANIMATION_KEYFRAME_MISSING_COMMANDS',
};

export class AnimationKeyframeMissingCommandsError extends createError(missingCommandsError) { };

export const getMissingCommandsDetails = (path: Path, commands: Command[], missingCommands: Command[]): GetMissingCommandsDetailsResult => {
  const stackframe = getStackFrames(path, commands);
  const missingCommandsType = missingCommands.map(command => command.commandType);

  if (!stackframe) {
    return {
      missingCommandList: missingCommandsType,
    };
  }

  const pathLineNumber = stackframe.path.lineNumber - 1;
  const { fileName } = stackframe.path;
  const lines = getCorrectCodeLines(stackframe.path, stackframe.lastCommand);

  const missingCommandStartLineNumber = pathLineNumber + lines.length;

  const missingCommandIndent = getIndent(stackframe.lastCommand);
  const fullLines = lines.concat(missingCommands.map(command => formatErrorCommand(command, missingCommandIndent, 'is missing')));
  const code = formatCode(fullLines, pathLineNumber).join('\n');

  return {
    details: `Expected:\n${code}`,
    missingCommandList: missingCommandsType.map((command, i) => `${command} at ${fileName}:${missingCommandStartLineNumber + i}:${stackframe.lastCommand.columnNumber}`),
  };
}

export interface IAnimationKeyframeMissingCommandsError {
  label: string;
  count: number;
  commands: string;
}

export interface GetMissingCommandsDetailsResult {
  missingCommandList: string[];
  details?: string;
}
