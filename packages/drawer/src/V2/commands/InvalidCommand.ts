import { Command } from './Command';
import { CommandType, LineType, CurveType } from './commandTypes';

export interface InvalidCommand {
  received: Command;
  expected: CommandType | LineType | CurveType;
}
