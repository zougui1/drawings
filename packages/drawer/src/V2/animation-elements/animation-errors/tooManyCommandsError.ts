import { formatCode, formatErrorLine } from './formatters';
import { getStackFrames, getCorrectCodeLines } from './utils';
import { createError } from '../../error';
import { Command } from '../../commands';
import { Path } from '../../drawing-elements';
import { withLocation } from '../../utils';

const tooManyCommandsError = {
  message: (data: IAnimationKeyframeTooManyCommandsError) => `${data.label}, has ${data.count} too many commands: ${data.commands}`,
  code: 'E_ANIMATION_KEYFRAME_TOO_MANY_COMMANDS',
};

export interface IAnimationKeyframeTooManyCommandsError {
  label: string;
  count: number;
  commands: string;
}

export class AnimationKeyframeTooManyCommandsError extends createError(tooManyCommandsError) { };

export const getTooManyCommandsDetails = (path: Path, commands: Command[], tooManyCommands: Command[]): GetTooManyCommandsDetailsResult => {
  const stackframe = getStackFrames(path, commands);
  const firstTooManyCommandStackFrame = tooManyCommands[0].getStackFrame();
  const lastTooManyCommandStackFrame = tooManyCommands[tooManyCommands.length - 1].getStackFrame();

  if (!stackframe || !firstTooManyCommandStackFrame || !lastTooManyCommandStackFrame) {
    return {
      tooManyCommandList: tooManyCommands.map(command => command.commandType),
    };
  }

  const { getCodeBetweenLines } = require('../../filesystem');
  const pathLineNumber = stackframe.path.lineNumber - 1;
  const { fileName } = stackframe.path;
  const lines = getCorrectCodeLines(stackframe.path, stackframe.lastCommand);
  const tooManyLines: string[] = getCodeBetweenLines(fileName, firstTooManyCommandStackFrame.lineNumber, lastTooManyCommandStackFrame.lineNumber);

  const fullLines = lines.concat(tooManyLines.map(line => formatErrorLine(line, 'is too much')));
  const code = formatCode(fullLines, pathLineNumber).join('\n');

  return {
    details: `Received:\n${code}`,
    tooManyCommandList: tooManyCommands.map((com) => withLocation(com.commandType, com.getFileLocation())),
  };
}

export interface GetTooManyCommandsDetailsResult {
  tooManyCommandList: string[];
  details?: string;
}
