import fs from 'fs-extra';

export const getCodeBetweenLines = (file: string, startLine: number, endLine: number): string[] => {
  const code = fs.readFileSync(file, 'utf8');
  const codeLines = code.split('\n');
  return codeLines.slice(startLine - 1, endLine);
}
