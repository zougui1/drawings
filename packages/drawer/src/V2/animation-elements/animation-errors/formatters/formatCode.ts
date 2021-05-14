import chalk from 'chalk';

import { getNumberLength } from '../../../utils';

const formatLineNumber = (lineNumber: number, lineCount: number, start: number): string => {
  const indent = ' '.repeat(getNumberLength(lineCount + start) - getNumberLength(lineNumber));
  return chalk.grey(`${indent}${lineNumber} |`);
}

const formatLine = (line: string): string => {
  // change the color of comment lines
  return line.trimLeft().startsWith('//')
    ? chalk.grey(line)
    : line;
}

export const formatCode = (lines: string[], start: number): string[] => {
  const lineCount = lines.length;
  return lines.map((line, i) => `${formatLineNumber(start + i, lineCount, start)} ${formatLine(line)}`);
}
