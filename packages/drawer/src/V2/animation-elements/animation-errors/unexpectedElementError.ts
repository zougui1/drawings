import chalk from 'chalk';

import { formatCode } from './formatters';
import { createError } from '../../error';
import { Path } from '../../drawing-elements';
import { withLocation } from '../../utils';

const unexpectedElementError = {
  message: (data: IAnimationKeyframeShapeError) => withLocation(`"${data.label}" is drawing an unexpected element. Tried drawing "${data.name}"`, data.location),
  code: 'E_ANIMATION_KEYFRAME_UNEXPECTED_ELEMENT',
};

export interface IAnimationKeyframeShapeError {
  label: string;
  name: string;
  location?: string;
}

export class AnimationKeyframeUnexpectedElementError extends createError(unexpectedElementError) { };

export const getUnexpectedElementDetails = (path: Path): string | undefined => {
  const pathStackFrame = path.getStackFrame();

  if (!pathStackFrame) {
    return;
  }

  const { commands } = path.pathData;
  const lastCommandStackFrame = commands[commands.length - 1]?.getStackFrame();

  const lastPathLineNumber = lastCommandStackFrame
    ? lastCommandStackFrame.lineNumber
    : pathStackFrame.lineNumber;

  const { getCodeBetweenLines } = require('../../filesystem');
  const pathLineNumber = pathStackFrame.lineNumber - 1;
  const { fileName } = pathStackFrame;
  const lines: string[] = getCodeBetweenLines(fileName, pathLineNumber, lastPathLineNumber);

  const errorLines = lines.map(line => chalk.red(line));
  const code = formatCode(errorLines, pathLineNumber);

  return `Either remove the path, give it a valid name or add it to the data.\n\nReceived:\n${code.join('\n')}`;
}
