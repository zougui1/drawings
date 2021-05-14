import { formatErrorLine } from './formatErrorLine';
import { Command } from '../../../commands';

export const formatErrorCommand = (command: Command, indent: string, comment?: string): string => {
  return formatErrorLine(`${indent}.${command.placeholder}`, comment);
}
