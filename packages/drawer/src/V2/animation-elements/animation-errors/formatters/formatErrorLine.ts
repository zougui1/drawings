import chalk from 'chalk';

export const formatErrorLine = (line: string, comment?: string): string => {
  const errorLine = comment ? `${line} // ${comment}` : line;
  return chalk.red(errorLine);
}
